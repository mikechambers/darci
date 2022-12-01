#!/bin/sh

# sync destiny manifest
dclim --verbose -D /db/

# sync user
dclisync -D /db/ --add $USER
dclisync -D /db/ --sync

# start server in background
cd /server
npm start &

# start webserver in foreground
cd /client-web
npm start
