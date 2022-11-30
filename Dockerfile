# Pull dcli from latest github release from mikechambers/dcli
FROM node:16-alpine AS builder

ARG DCLI_VERSION=0.9.0
ARG PLATFORM=x86_64-unknown-linux-musl

ADD https://github.com/mikechambers/dcli/releases/download/v${DCLI_VERSION}/dcli_${PLATFORM}_v${DCLI_VERSION}.zip /tmp/dcli.zip

RUN apk add --no-cache unzip && \
    unzip /tmp/dcli.zip -d /usr/local/bin && \
    rm /tmp/dcli.zip

# make sure dcli binaries are executable
RUN chmod +x /usr/local/bin/dcli*

# install darci
COPY . .
WORKDIR /server
RUN npm install
WORKDIR /client-web
RUN npm install

# start darci
ENTRYPOINT ["/docker-entrypoint.sh"]
