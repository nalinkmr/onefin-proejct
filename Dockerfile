
FROM node:lts-alpine as base

RUN npm install -g @angular/cli@11.0.7

RUN mkdir /app

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN npm run build --prod


FROM nginx:alpine

# configure nginx site
#COPY dev-ops/nginx-default.conf "${NGINX_CONF_PATH}"

# copy artifact build from the 'build environment'
COPY --from=base /app/dist/onefin-project /usr/share/nginx/html

# expose port 80
EXPOSE 8080

RUN sed -i 's/^\(.*listen.*\)80;/\18080;/' /etc/nginx/conf.d/default.conf

# run nginx
CMD ["nginx", "-g", "daemon off;"]
