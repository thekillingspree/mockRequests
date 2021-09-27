FROM node:lts-alpine
EXPOSE 80 3000
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install --production
CMD ["npm", "start"]