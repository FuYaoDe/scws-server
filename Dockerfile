FROM node:5

MAINTAINER fuyaode
WORKDIR /root

RUN apt-get update && \
    apt-get install -y wget bzip2 build-essential vim && \
    apt-get clean && \
    apt-get autoclean && \
    wget http://www.xunsearch.com/scws/down/scws-1.2.3.tar.bz2 && \
    tar xvjf scws-1.2.3.tar.bz2 && \
    cd scws-1.2.3 && \
    ./configure --prefix=/usr/local/scws ; make ; make install

COPY ./XDB/* /root/xdb/
