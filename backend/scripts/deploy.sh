#!/bin/bash

# 0. .env 파일 로드하여 환경변수 설정
# GitHub Actions에서 생성한 .env 파일(IMAGE_TAG 등)을 읽어옴
source .env

# 변수 설정
IMAGE_NAME="${DOCKERHUB_USERNAME}/moaon-backend"
CONTAINER_NAME="moaon-app"

# 1. 롤백 대비: 현재 실행 중인 컨테이너의 이미지 태그 저장
# 컨테이너가 실행 중이지 않을 수 있으므로 오류를 무시하고 진행
CURRENT_IMAGE_TAG=$(sudo docker inspect --format='{{.Config.Image}}' ${CONTAINER_NAME} | cut -d: -f2) || echo "none"
echo "현재 이미지 태그: ${CURRENT_IMAGE_TAG}"

# 2. 최신 이미지 pull
echo "최신 이미지를 pull합니다: ${IMAGE_NAME}:${IMAGE_TAG}"
sudo docker pull ${IMAGE_NAME}:${IMAGE_TAG}

# 3. 새 버전 컨테이너 실행
echo "새로운 컨테이너를 실행합니다."
# docker-compose.yml이 있는 경로로 이동해야 합니다.
# 이 스크립트는 backend 디렉터리 외부에서 실행된다고 가정
sudo docker compose -f ./backend/compose.yaml up -d

# 4. 헬스 체크 (Polling)
echo "헬스 체크를 시작합니다..."
for i in {1..10}; do
  # Spring Boot Actuator health check endpoint
  HEALTH_STATUS=$(curl -s http://localhost:80/actuator/health | jq -r .status)

  if [ "${HEALTH_STATUS}" == "UP" ]; then
    echo "헬스 체크 성공! 배포를 완료합니다."
    # 불필요해진 이전 버전 이미지 삭제 (선택 사항)
    if [ "${CURRENT_IMAGE_TAG}" != "none" ] && [ "${CURRENT_IMAGE_TAG}" != "${IMAGE_TAG}" ]; then
        echo "이전 이미지(${CURRENT_IMAGE_TAG})를 삭제합니다."
        sudo docker image rm ${IMAGE_NAME}:${CURRENT_IMAGE_TAG}
    fi
    sudo docker image prune -af
    exit 0
  fi
  echo "헬스 체크 응답: ${HEALTH_STATUS} (${i}/10). 10초 후 재시도합니다."
  sleep 10
done

echo "헬스 체크 실패. 배포에 실패했습니다."
# 롤백 로직은 4단계에서 추가 예정
exit 1
