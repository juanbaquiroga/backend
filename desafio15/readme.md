# comandos a utilizar

## ej 1 (un servidor modo cluster y uno en modo fork)

- usar el archivo nginx1.config

1. `pm2 start server.js -- -p 8080 -m cluster`
2. `pm2 start server-api.js`

## ej 2 (servidor modo cluster y otro en modo fork con balanceador de carga)

- usar el archivo nginx2.config

1. `pm2 start server.js -- -p 8080 -m cluster`
2. `pm2 start server-api.js -- -p 8082`
3. `pm2 start server-api.js -- -p 8083`
4. `pm2 start server-api.js -- -p 8084`
5. `pm2 start server-api.js -- -p 8085`
