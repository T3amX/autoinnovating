FROM node:16

WORKDIR /app

RUN mkdir -p /var/log/fssp

COPY package*.json ./

RUN npm ci --production

COPY src .

EXPOSE 5000

CMD ["npm", "start"]
