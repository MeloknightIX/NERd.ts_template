FROM node

RUN npm install -g cross-env

RUN npm install -g tsx

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]