#!/bin/bash

# --- 스크립트 기본 설정 ---
# 1. 명령어 실행 실패 시 즉시 스크립트를 중단합니다. (매우 중요)
set -e

# 2. .env 파일을 로드하여 환경변수(DOCKERHUB_USERNAME, IMAGE_TAG 등)를 설정합니다.
# .env 파일이 없으면 오류를 내며 중단됩니다.
if [ -f .env ]; then
    source .env
else
    echo ".env 파일을 찾을 수 없습니다. CI/CD 환경 변수 설정을 확인하세요."
    exit 1
fi

# --- 변수 설정 ---
# GitHub Actions 워크플로우에서 IMAGE_TAG를 환경변수로 전달받는다고 가정
# 전달되지 않을 경우 'latest'를 기본값으로 사용
NEW_IMAGE_TAG=${IMAGE_TAG:-latest}
IMAGE_NAME="${DOCKERHUB_USERNAME}/moaon-backend"
CONTAINER_NAME="moaon-app"
COMPOSE_FILE_PATH="compose.prod.yaml"


# --- 롤백 함수 정의 ---
function rollback() {
  echo "❌ 배포 실패. 롤백을 시작합니다..."

  echo "--- ❌ 실패한 컨테이너(${CONTAINER_NAME}) 로그 출력 (최근 100줄) ---"
  sudo docker compose -f ${COMPOSE_FILE_PATH} logs --tail="100" ${CONTAINER_NAME}
  echo "--- 로그 출력 완료 ---"

  # 이전 이미지 태그가 존재하고, 현재 태그와 다른 경우에만 롤백 실행
  if [ "${CURRENT_IMAGE_TAG}" != "none" ] && [ "${CURRENT_IMAGE_TAG}" != "${NEW_IMAGE_TAG}" ]; then
    echo "이전 이미지(${IMAGE_NAME}:${CURRENT_IMAGE_TAG})로 되돌립니다."
    # .env 파일의 IMAGE_TAG 값을 롤백할 버전으로 직접 수정합니다.
    sed -i "s/IMAGE_TAG=${IMAGE_TAG}/IMAGE_TAG=${CURRENT_IMAGE_TAG}/g" .env

    sudo docker compose -f ${COMPOSE_FILE_PATH} up -d
    echo "✅ 롤백 완료."
  else
    echo "❌ 롤백할 이전 버전이 없거나, 이전 버전과 현재 버전이 동일합니다. 현재 컨테이너를 중지합니다."
    sudo docker compose -f ${COMPOSE_FILE_PATH} down
  fi
}

# --- 배포 프로세스 시작 ---

# 1. 롤백 대비: 현재 실행 중인 컨테이너의 이미지 태그 저장
# 컨테이너가 실행 중이지 않을 수 있으므로 오류를 무시하고 진행
CURRENT_IMAGE_TAG=$(sudo docker inspect --format='{{.Config.Image}}' ${CONTAINER_NAME} 2>/dev/null | cut -d: -f2) || CURRENT_IMAGE_TAG="none"
echo "현재 이미지 태그: ${CURRENT_IMAGE_TAG}"
echo "배포할 새 이미지 태그: ${NEW_IMAGE_TAG}"


# 2. 최신 이미지 pull
echo "새 이미지를 pull합니다: ${IMAGE_NAME}:${NEW_IMAGE_TAG}"
sudo docker pull "${IMAGE_NAME}:${NEW_IMAGE_TAG}"

# 3. 새 버전 컨테이너 실행
echo "새로운 컨테이너(${IMAGE_NAME}:${NEW_IMAGE_TAG})를 실행합니다."
# 배포할 이미지 태그를 명시적으로 export하여 compose 파일에 전달합니다.
export IMAGE_TAG=${NEW_IMAGE_TAG}
sudo docker compose -f ${COMPOSE_FILE_PATH} up -d

# 4. 헬스 체크 (Polling)
echo "헬스 체크를 시작합니다..."
for i in {1..10}; do
  # Spring Boot Actuator health check endpoint
  HEALTH_STATUS=$(curl -s http://localhost:80/actuator/health | jq -r .status)

  if [ "${HEALTH_STATUS}" == "UP" ]; then
    echo "✅ 헬스 체크 성공! 배포를 완료합니다."
    # 불필요해진 이전 버전 이미지 삭제 (선택 사항)
    if [ "${CURRENT_IMAGE_TAG}" != "none" ] && [ "${CURRENT_IMAGE_TAG}" != "${IMAGENEW_IMAGE_TAG_TAG}" ]; then
        echo "이전 이미지(${CURRENT_IMAGE_TAG})를 삭제합니다."
        sudo docker image rm ${IMAGE_NAME}:${CURRENT_IMAGE_TAG}
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
