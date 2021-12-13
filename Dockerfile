FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY $PWD /usr/share/nginx/html
