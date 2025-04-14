FROM nexus.petrobras.com.br:5000/nginx:alpine

COPY ngnix/default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

COPY bash/startup.sh /usr/bin/startup.sh
RUN chmod +x /usr/bin/startup.sh

EXPOSE 8080

ENTRYPOINT ["startup.sh", "/usr/share/nginx/html"]