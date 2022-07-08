# FROM nginx:latest
# FROM node:14 AS yarn
# FROM yarn AS builder

# COPY / ./
# RUN rm -rf package-lock.json
# RUN yarn &&  yarn run build
# RUN rm -rf node_modules/

# COPY ../dist/ /usr/share/nginx/html/
# COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:latest
COPY ../dist/ /usr/share/nginx/html/
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf