FROM nginx:alpine

EXPOSE 443

RUN apk add --no-cache openssl

RUN mkdir -p /etc/nginx/ssl && \
	openssl req -x509 -nodes \
		-days 365 \
		-out /etc/nginx/ssl/public_certificate.crt \
		-keyout /etc/nginx/ssl/private.key \
		-subj "/C=FI/ST=Uusimaa/L=Helsinki/O=42/CN=localhost"

COPY conf/nginx.conf /etc/nginx/nginx.conf

RUN chmod 644 /etc/nginx/nginx.conf

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]