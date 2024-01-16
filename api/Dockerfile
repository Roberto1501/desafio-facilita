FROM node:16

#Create app directory

WORKDIR /usr/src/app

#install app dependecies

COPY package*.json ./

#install dependecies
RUN npm install

#Copy files
COPY . .


#Build project

RUN npm run build

EXPOSE 8000

CMD [ "npm", "run","start:prod" ]

