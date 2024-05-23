FROM node:alpine

WORKDIR /RAPID-HIRE-MASTER

COPY ./package.json /RAPID-HIRE-MASTER//

RUN npm install

COPY . /RAPID-HIRE-MASTER//

EXPOSE 5000

CMD [ "npm","run","start" ]

