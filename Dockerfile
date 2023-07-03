FROM nginx:latest

ENV WORK_DIR="/tmp"
COPY ./ ${WORK_DIR}

RUN ls -al ${WORK_DIR} && cd ${WORK_DIR} && \
    cp ${WORK_DIR}/script/nginx.conf /etc/nginx/nginx.conf 

COPY dist/ /usr/share/nginx/html