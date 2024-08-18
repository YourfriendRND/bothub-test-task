FROM node:20

WORKDIR ./

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm run prisma:env

RUN npm run prisma:generate
