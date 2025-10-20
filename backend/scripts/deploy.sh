#!/bin/bash

# --- 스크립트 기본 설정 ---
set -e
if [ -f .env ]; then
    source .env
else
    echo ".env 파일을 찾을 수 없습니다. CI/CD 환경 변수 설정을 확인하세요."
    exit 1
fi

# --- 변수 설정 ---
NEW_IMAGE_TAG=${IMAGE_TAG:-latest}
IMAGE_NAME="${DOCKERHUB_USERNAME}/moaon-backend"
CONTAINER_NAME="moaon-app"
COMPOSE_FILE_PATH="compose.prod.yaml"
PREVIOUS_IMAGE_TAG=${PREVIOUS_IMAGE_TAG:-none}


# --- 롤백 함수 정의 ---
function rollback() {
  echo "❌ 배포 실패. 롤백을 시작합니다..."
  # GHA에서 받은 PREVIOUS_IMAGE_TAG를 사용합니다.
  if [ "${PREVIOUS_IMAGE_TAG}" != "none" ] && [ "${PREVIOUS_IMAGE_TAG}" != "${NEW_IMAGE_TAG}" ]; then
    echo "이전 이미지(${IMAGE_NAME}:${PREVIOUS_IMAGE_TAG})로 되돌립니다."
    # .env 파일의 IMAGE_TAG 값을 롤백할 버전으로 직접 수정합니다.
    sed -i "s/IMAGE_TAG=${NEW_IMAGE_TAG}/IMAGE_TAG=${PREVIOUS_IMAGE_TAG}/g" .env

    export IMAGE_TAG=${PREVIOUS_IMAGE_TAG} # compose가 읽도록 export
    sudo docker compose -f ${COMPOSE_FILE_PATH} up -d
    echo "롤백 완료."
  else
    echo "롤백할 이전 버전이 없거나(none), 이전 버전과 현재 버전이 동일합니다. 현재 컨테이너를 중지합니다."
    sudo docker compose -f ${COMPOSE_FILE_PATH} down
  fi
}

# --- 배포 프로세스 시작 ---
# 1. 롤백 대비: GHA에서 전달받은 PREVIOUS_IMAGE_TAG 사용
echo "현재 이미지 태그 (GHA에서 전달): ${PREVIOUS_IMAGE_TAG}"
echo "배포할 새 이미지 태그: ${NEW_IMAGE_TAG}"

# 2. 최신 이미지 pull
echo "새 이미지를 pull합니다: ${IMAGE_NAME}:${NEW_IMAGE_TAG}"
sudo docker pull "${IMAGE_NAME}:${NEW_IMAGE_TAG}"

# 3. 새 버전 컨테이너 실행
echo "새로운 컨테이너(${IMAGE_NAME}:${NEW_IMAGE_TAG})를 실행합니다."
export IMAGE_TAG=${NEW_IMAGE_TAG}
sudo docker compose -f ${COMPOSE_FILE_PATH} up -d

# 4. 헬스 체크 (Polling)
echo "헬스 체크를 시작합니다..."
for i in {1..10}; do
  HEALTH_STATUS=$(curl -s http://localhost:80/actuator/health | jq -r .status)

  if [ "${HEALTH_STATUS}" == "UP" ]; then
    echo "✅ 헬스 체크 성공! 배포를 완료합니다."
    # 불필요해진 이전 버전 이미지 삭제 (PREVIOUS_IMAGE_TAG 사용)
    if [ "${PREVIOUS_IMAGE_TAG}" != "none" ] && [ "${PREVIOUS_IMAGE_TAG}" != "${NEW_IMAGE_TAG}" ]; then
        echo "이전 이미지(${PREVIOUS_IMAGE_TAG})를 삭제합니다."
        # sudo docker image rm ${IMAGE_NAME}:${PREVIOUS_IMAGE_TAG} # 주석 처리: 다른 서버 롤백 시 필요할 수 있으므로 즉시 삭제 비권장
    fi
    sudo docker image prune -af
    exit 0 # 성공적으로 종료
  fi
  echo "헬스 체크 응답: ${HEALTH_STATUS} (${i}/10). 10초 후 재시도합니다."
  sleep 10
done

echo "지정된 시간 내에 헬스 체크가 성공하지 못했습니다."
rollback # 정의해둔 롤백 함수 호출

exit 1
