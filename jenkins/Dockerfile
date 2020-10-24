#Jenkins base image.

FROM node:erbium AS builder

ENV WORKING_DIR=/usr/app/src/

WORKDIR ${WORKING_DIR}

RUN echo 'deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main' >> /etc/apt/sources.list \
&& apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367 \
&& apt update \
&& apt install -y ansible sshpass


RUN apt install -y python-pip python3-pip

RUN npm install -g sonarqube-scanner

RUN pip3 install dominate requests argparse
