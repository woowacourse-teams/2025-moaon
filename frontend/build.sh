# 스크립트 실행 중 하나라도 에러가 발생하면 전체 스크립트 실행이 중단되어 문제를 빠르게 감지하고 디버깅 가능
set -e

# output 폴더 비우기
rm -rf output
mkdir -p output

# .github 복사
cp -R ../.github ./output/

# rsync로 frontend 전체 복사
rsync -av --exclude=output --exclude=.git --exclude=node_modules --exclude=.vscode ./ ./output/frontend/
