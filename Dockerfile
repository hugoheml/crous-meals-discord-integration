FROM node:24-alpine

# Install mysqldump
RUN apk add --no-cache \
    mysql-client \
    mariadb-connector-c \
    tzdata

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]