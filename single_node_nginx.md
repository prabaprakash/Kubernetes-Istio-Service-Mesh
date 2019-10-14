```console
$ apt update

$ apt install nginx

$ unlink /etc/nginx/sites-enabled/default

$ cd /etc/nginx/sites-available

$ nano reverse-proxy.conf
server {
        listen 80;
        listen [::]:80;
        proxy_set_header HOST $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1 ;
        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;
        location / {
                    proxy_pass http://10.152.183.188:80;
  }
}

$ sudo ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf

$ sudo nginx -t

$ sudo service nginx restart