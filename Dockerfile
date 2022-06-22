FROM node:16-alpine as builder
ARG location
ARG package

WORKDIR /home/node/app

COPY . .

CMD ["tail","-f","/dev/null"]
RUN yarn
RUN yarn workspace $package build
RUN yarn bundle $location -o $location/bundle

FROM node:16-alpine
ARG location

EXPOSE 8080
WORKDIR /home/node/app

COPY --from=builder /home/node/app/$location/bundle ./
#Wildcards are included to handle cases where this file doesnt exist
COPY --from=builder /home/node/app/$location/package.json /home/node/app/$location/*test-payload.js* ./

CMD ["yarn", "server"]
