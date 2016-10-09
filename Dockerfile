FROM ubuntu:14.04

MAINTAINER fuyaode

RUN apt-get update && \
    apt-get install -y wget bzip2 build-essential vim && \
    apt-get clean && \
    apt-get autoclean && \
    wget http://www.xunsearch.com/scws/down/scws-1.2.3.tar.bz2 && \
    tar xvjf scws-1.2.3.tar.bz2 && \
    cd scws-1.2.3 && \
    ./configure --prefix=/usr/local/scws ; make ; make install

COPY ./dict.utf8.xdb /usr/local/scws/etc
COPY ./dict.xdb /usr/local/scws/etc
