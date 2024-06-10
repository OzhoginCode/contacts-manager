FROM ubuntu:22.04

WORKDIR /usr/share/nginx/html

RUN apt-get update
RUN apt-get install nginx -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y

COPY package.json package-lock.json ./
RUN npm ci

COPY nginx.conf /etc/nginx/nginx.conf
COPY app/index.html .
COPY . .

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
