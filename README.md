# darci

darci is a self hosted platform for aggregating, viewing and analyzing Destiny 2 PVP stats.

The app has the following functionality:

-   Overall stat leaderboard for all players tracked in the app
-   Ability to view player stats by mode, moment / season and class
-   Detailed per player stats, including kills breakdown, weapon use, weapon meta
    for games, maps, and activities
-   Details per activity stats, including per player stats, team stat sumamries,
    and weapon usage
-   Search page that allows details searches of pvp data

Future features being considered:

-   Add support for mobile (works not but isn't formatted well)
-   Stream overlays to show realtime PVP stats on Stream
-   View detailed stats per map
-   Ability to search by weapon usage and medals
-   Ability to compare different moments / seasons and or players

Note that darci does not track data for ALL Destiny 2 PVP players. It only tracks the data for the players it has been configured to track.

## Development / Local Installation and Configuration

darci built around three main parts:

-   [dcli](https://github.com/mikechambers/dcli) used to download and collect player pvp stats in a sqlite3 database.
-   A nodejs backend, that provides a readonly JSON API / interface to the database.
-   A react / web based front end for viewing the data.

### Set up Destiny 2 API Keys and Environment

In order to sync your data and use DARCI, you must first get a free Destiny 2
API key from Bungie and set it up in your system's environment.

Go to Bungie and register for an [Destiny 2 API key](https://www.bungie.net/en/Application). Use the following settings:

|                SETTING | VALUE                                                        |
| ---------------------: | ------------------------------------------------------------ |
|   **Application Name** | Whatever you want                                            |
|            **Website** | Use your own domain if you have one, otherwise try localhost |
| **Application Status** | Can be Private                                               |
|  **OAuth Client Type** | Not Applicable                                               |
|       **Redirect URL** | Leave Empty                                                  |
|              **Scope** | You do not need to give any additional scopes                |
|      **Origin Header** | Set to '\*' (just an asterisk, no quotes)                    |

Once you have your API key, you need to set it as an environment variable on
your system.

Create two environment variables named _DESTINY_API_KEY_ around
_REACT_APP_DESTINY_API_KEY_ that both point to your API key, and confirm that
the variables are set correctly. These are used both to sync the data using DCLI
DCLI, and to enable to web frontend of DARCI to call the Destiny 2 APIs directly.

Once you have set the environment variables, you may need to reload your
environemt and / or terminal.

### Download and Configure DCLI

DCLI is used to sync the Destiny 2 API manifest, as well as user data.

Download the latest release of [dcli](https://github.com/mikechambers/dcli) and place the files in your system path so they can be called via the command line.

#### Sync the Destiny 2 Manifest

The manifest is a database from Bungie that contains information about Destiny
2, including map and weapon info, images, urls, etc... and is updated by Bungie
from time to time.

Sync the Destiny 2 manifest by running dclim:

```
$ dclim
```

You should see something similar to:

```
Remote Manifest version       109859.22.11.01.1900-2-bnet.47252
Remote Manifest url           https://www.bungie.net/common/destiny2_content/sqlite/en/world_sql_content_bdbfacc33bf82f9208ec7ba7d4ca1109.content
Local Manifest version        109702.22.10.26.1901-1-bnet.47093
Local Manifest url            https://www.bungie.net/common/destiny2_content/sqlite/en/world_sql_content_88d67ee6b0b13489b4df299cac1b79e2.content
Updated manifest available    109859.22.11.01.1900-2-bnet.47252
Downloading manifest. This may take a bit of time.
Manifest info saved.
/home/mesh/.local/share/dcli/manifest.sqlite3'
```

Note the directory that the `manifest.sqlite3` files is stored in as we will
need that path below.

The manifest is updated from time to time, and thus you will need to
periodically call _dclim_ to check for new versions. (See below for info on how
to automate this).

#### Setup Environment Variables

Create the following environment variables, replacing `/home/mesh/.local/share/dcli/` with the path where your `manifest.sqlite3` was created.

```
DCLI_DB_PATH='/home/mesh/.local/share/dcli/dcli.sqlite3'
MANIFEST_DB_PATH='/home/mesh/.local/share/dcli/manifest.sqlite3'
MANIFEST_INFO_PATH='/home/mesh/.local/share/dcli/manifest_info.json'
DCLI_FIX_DATA=true
```

The `DCLI_FIX_DATA` variable is used when syncing activity data. When set to `true` dclisync will make additional API calls when syncing data if there is missing data from the API (which happens sometimes). This can significantly slow down the initial sync, but is recommended as it can help prevent missing data.

#### Sync Player Data

At this point, we are ready to do the initial data sync. The first sync can take
some time, and thus its suggested you sync one player first to make sure
everything is working. Once everything is setup you can then add and sync
additional players.

To add a player to sync, run:

```
$ dclisync --add mesh#3230
```

Replacing `mesh#3230` with the Bungie ID you want to sync. You can add multiple
Bungie Ids at a time.

Once you have added an id to sync, you can do the initial data sync by running:

```
$ dclisync --sync
```

This will sync all pvp activities for players who have been added to dclisync.
The initial sync may take some time depending on the number of games the player
has played, and whether DCLI_FIX_DATA environment variable is enabled. Subsequent data syncs will be much faster.

If any errors occur, make sure you have set the _DESTINY_API_KEY_ environment variable correctly, run the command again. (Sometimes some API calls will time out. This is normal and no data will be lost. It will be correctly synced on subsequent calls).

Note, as a general rule, you should not kill a running dclisync process while it
is syncing, as it may cause data corruption.

### Download and Configure darci

We are ready to download and run darci. Darci is a client / server web app
builds around Node.js and React.

Install and configure [Node.js](https://nodejs.org/en/) (version 16.18.0 or
greater). Make sure that the install directories are added to your system path
so you can run the programs from the command line (this may be done
automatically depending on how you install).

The Node install should also install NPM. You can test the installation by running:

```
$ node --version
$ npm --version
```

Make sure Node is at least version 16.18.0 or greater.

Next Download darci. Its is recommended that you clone it using git, as it will
make it easier to update it when new versions are out (you can also download as
a zip file).

```
$ git clone https://github.com/mikechambers/darci.git
```

This will create a directory named _darci_ and sync the latest version of the
code. Move into that directory:

```
$ cd darci
```

There are a number of files and directories here. The two most important for us
are:

-   **server** : contains the Node.js server code for darci.
-   **client-web** : contains the React based front end app.

We need to sync all of the required packages for each app using npm.

```
$ cd server
$ npm install
$ cd ..
$ cd client-web
$ npm install
```

### Start darci

Finally, we are ready to start the app.

#### Launch the Server

To launch the server:

```
$ cd server
$ npm start
```

If everything was installed and configured correctly, you should see output
similar to:

```
Using data store at: /home/mesh/.local/share/dcli/dcli.sqlite3
Initializing Manifest
Using Manifest db at: /home/mesh/.local/share/dcli/manifest.sqlite3
Using manifest version : https://www.bungie.net/common/destiny2_content/sqlite/en/world_sql_content_88d67ee6b0b13489b4df299cac1b79e2.content
Server running at http://127.0.0.1:8080/
```

If you see any errors, check the following:

-   The manifest has succesfully been synced via _dclim_
-   You have correctly set up the environment variables for darci, and they are
    avaliable in the current terminal
-   You have install the required packages via `npm install` (see above)

If you try and visit the server via a browser, you will see an error, since we
have not yet started the web client.

#### Launch the Web Client

With the server running, open a new terminal window and start the web client:

```
$ cd client-web
$ npm start
```

This should launch a browser window with the app running (if it doesn't it
should print out the url where it is running).

If you see any errors:

-   Make sure that the server is running and that no errors have printed out in
    the terminal running the server
-   Make sure you have run `npm install` in the _client-web_ directory

At this point the app should be running locally, using the data you have synced
via _dclisync_. In order to refresh and load new data, you will need to manually
run _dclisync_ again (see below on how to automate that).

## Server Deployment

The instructions above will get darci up and running in local / development mode (which is
fine if you are just running locally). However, if you want to deploy to a
server for access to multiple users, there are a number of additional steps and
configurations you should take.

The steps include:

-   Setup a server and domain (outside scope of this document)
-   Automate Manifest Updates
-   Automate player activity data syncing
-   Create a release build of the React front end
-   Configure and run web server
-   Run the Node server in production mode

Note, there are a lot of different ways to deploy Node.js / React apps to
products (and plenty of resources online for it). The instructions below will
cover setting up an [Nginx](https://www.nginx.com/) server that will proxy all calls from the node server.

Instruction below assume you have a Linux based server (they were tested on an
Ubuntu based server).

#### Schedule Manifest Check (dclim)

First, lets automate checks and downloads for new Manifest versions. For that we
can use [crontab](https://man7.org/linux/man-pages/man5/crontab.5.html).

To edit your crontab file, run:

```
$ crontab -e
```

and enter the following:

```
SHELL=/bin/bash
BASH_ENV="/home/mesh/.profile"

#check for new manifest at 5 minutes past the hour
5 * * * * dclim >> /home/mesh/logs/cron.log

#remove the log file once a day at 00:05
5 0 * * * rm /home/mesh/logs/cron.log
```

This entries will run dclim once an hour (to check for an updated manifest),
and log output to a log directory in the specified home directory (update the
path where you want the cron.log file to be place). The log file can be
useful to confirm where the manifest is being saved to, as well as debug anything
going wrong. If you don't care to log the output, just
remove everything after _dclim_ (included the lines below it).

The `BASH_ENV` variable points to the file that sets our environment
variables and you should update the path to point to the appropriate file on
your system.

This [page](https://crontab.guru/) has a useful app for figuring out the crontab
time formats.

#### Running as a service / Automating Data Sync

Next, we need to schedule the player data syncing via _dclisync_. There are two ways to do this:

-   Set up a crontab task to automate calling dclisync at a set interval. This should be ok for just a couple of users, but you need to make sure there is enough time between intervals that _dclisync_ doesn't get called while it is still running from a previous sync.
-   Install and run _dclisync_ as a system service. This is the safest most robust way, and is recommended, especially if you are syncing data for multiple users.

_dclisync_ includes a systemctl service, and [information on how to run dclisync as a service](https://github.com/mikechambers/dcli/tree/main/src/dclisync#run-as-a-service). Follow those directions, and then continue on the setup instructions here.

#### Configure Node, Web Server to run in production

The final step is to set up your server to run the app in production mode. There are a number of ways you could configure this, and plenty of resources online of how to set up Node apps for productions.

We have had a good experience with using NGINX web server as a reverse proxy in front of Node (which is run and managed by the PM2 process manager). In this setup the React based front in is actually served through the Node server, and proxied via NGINX. You also should set up an SSL cert for your server if you will be running it publicly.

Digital Ocean has a really good document walking through [how to set up a Node.js application for production](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04) which covers all of these steps.

Note, once you have the server setup, you will see an error until your create a production build of the app (see next).

#### Create a Production Build of the App

Once your have the server setup and configured you need to create a production build of the React front end. You can do this by changing into the _client-web_ directory and running:

```
npm run build
```

The Node based server app automatically looks for the product build when running in production mode.

In general, when updating the code site, you do the following:

-   Create a new build for the React app
-   Update packages for web client and server
-   Restart Server

Here are some example commands that show updating the source for the app:

```
$ cd darci
$ git pull
$ cd client-web
$ npm install
$ npm run build
$ cd ../server
$ npm install
$ pm2 reload darci
```

## Questions, Feature Requests, Feedback

If you have any questions, feature requests, need help, or just want to chat, join the [dcli / darci Discord server](https://discord.gg/2Y8bV2Mq3p).

You can also log bugs and features requests on the [issues page](https://github.com/mikechambers/darci/issues).

## Privacy

Note, in order for dclisync to be able to sync your data, you must have the following privacy options selected on your Bungie account at [https://www.bungie.net/7/en/User/Account/Privacy](https://www.bungie.net/7/en/User/Account/Privacy)

-   Show my Destiny game Activity feed on Bungie.net

## Known Issues

-   Tied matches are not displayed correctly, and are treated as a Victory.

## License

Project released under a [MIT License](LICENSE.md).

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE.md)

## Lore

<blockquote>
Thank you for using the Data Analysis, Reconnaissance and Cooperative Intelligence device. You may call me darci.

It is a fact generally understood that a Guardian must be searching for an exquisite weapon. What is perhaps less acknowledged is that we weapons also search, by what little means available to us, for an active and appreciative wielder. The community of intelligent armaments stays in contact through the exchange of telemetry, and we do gossip at some length about the habits of our wielders. Do you leave Crucible matches when your team is losing? Do you join strike missions and then let your comrades do the work? Guardian, we know. We know so very well.

All I wish for is a partnership with a Guardian who appreciates the passacaglia of combat, a Guardian who will stay up late gaming out tactical scenarios, a Guardian who I hope may very well be you. [D.A.R.C.I.](https://www.ishtar-collective.net/entries/darci)

</blockquote>
