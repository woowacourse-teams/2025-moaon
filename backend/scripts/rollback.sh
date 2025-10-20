#!/bin/bash

# 1. 명령어 실행 실패 시 즉시 스크립트를 중단합니다.
set -e

# 2. .env 파일을 로드합니다.
if [ -f .env ]; then
    source .env
else
    echo ".env 파일을 찾을 수 없습니다."
    exit 1
fi

# --- 변수 설정 ---
# GHA 워크플로우에서 ROLLBACK_TAG를 환경변수로 전달받습니다.
# 전달되지 않을 경우 'none'을 기본값으로 사용
TARGET_TAG=${ROLLBACK_TAG:-none}
IMAGE_NAME="${DOCKERHUB_USERNAME}/moaon-backend"
COMPOSE_FILE_PATH="compose.prod.yaml"

# 3. 롤백 실행
if [ "${TARGET_TAG}" == "none" ]; then
    echo "❌ 롤백할 태그가 'none'으로 지정되었습니다. 컨테이너를 중지합니다."
    sudo docker compose -f ${COMPOSE_FILE_PATH} down
    exit 1
fi

echo "롤백을 시작합니다. 대상 이미지: ${IMAGE_NAME}:${TARGET_TAG}"

# 4. .env 파일의 IMAGE_TAG 값을 롤백할 버전으로 직접 수정합니다.
# 'IMAGE_TAG='로 시작하는 라인을 찾아 교체합니다.
sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=${TARGET_TAG}/g" .env

# 5. 롤백할 이미지 pull (로컬에 없을 수도 있음)
echo "롤백 이미지 pull: ${IMAGE_NAME}:${TARGET_TAG}"
sudo docker pull "${IMAGE_NAME}:${TARGET_TAG}"

# 6. 롤백 버전으로 컨테이너 실행
export IMAGE_TAG=${TARGET_TAG}
sudo docker compose -f ${COMPOSE_FILE_PATH} up -d

# 7. 롤백 헬스 체크 (Polling)
echo "롤백 헬스 체크를 시작합니다..."
for i in {1..10}; do
  HEALTH_STATUS=$(curl -s http://localhost:80/actuator/health | jq -r .status)

  if [ "${HEALTH_STATUS}" == "UP" ]; then
    echo "✅ 롤백 헬스 체크 성공! 롤백을 완료합니다."
    exit 0 # 성공적으로 종료
  fi
  echo "롤백 헬스 체크 응답: ${HEALTH_STATUS} (${i}/10). 10초 후 재시도합니다."
  sleep 10
done

# 8. 헬스 체크 실패 시
echo "❌ 롤백 헬스 체크 실패! 롤백된 애플리케이션이 정상적으로 시작되지 않았습니다."
echo "수동 확인이 필요합니다."
exit 1
