# darci

Darci is a self hosted platform for aggregating, viewing and analyzing Destiny 2 PVP stats.

> Thank you for using the Data Analysis, Reconnaissance and Cooperative Intelligence device. You may call me Darci.

> It is a fact generally understood that a Guardian must be searching for an exquisite weapon. What is perhaps less acknowledged is that we weapons also search, by what little means available to us, for an active and appreciative wielder. The community of intelligent armaments stays in contact through the exchange of telemetry, and we do gossip at some length about the habits of our wielders. Do you leave Crucible matches when your team is losing? Do you join strike missions and then let your comrades do the work? Guardian, we know. We know so very well.

> All I wish for is a partnership with a Guardian who appreciates the passacaglia of combat, a Guardian who will stay up late gaming out tactical scenarios, a Guardian who I hope may very well be you. [D.A.R.C.I.](https://www.ishtar-collective.net/entries/darci)

It is built around three main parts:

- [dcli](https://github.com/mikechambers/dcli) used to download and collect player pvp stats in a sqlite3 database.
- A nodejs backend, that provides a readonly JSON API / interface to the database.
- A react / web based front end for viewing the data.

## Development Installation and Configuration

### Set up Destiny 2 API Keys and Environment

In order to sync your data and use DARCI, you must first get a free Destiny 2
API key from Bungie, set it up in your system's environment.

Go to Bungie and register for an [Destiny 2 API key](https://www.bungie.net/en/Application). Use the following settings:
- Application Name : Whatever you want
- Website : Use your own domain if you have one, otherwise try localhost.
- Application Status : Can be Private
- OAuth Client Type : Not Applicable
- Redirect URL : Leave Empty
- Scope : You do not need to give any additional scopes
- Origin Header : Set to '*' (just an asterix, no quotes)

Once you have your API key, you need to set it as an environment variable on
your system.

Create two environment variables named `DESTINY_API_KEY` and `REACT_APP_DESTINY_API_KEY` that both point to your API key, and confirm that the variables are set correctly. These are used both to sync the data using DCLI, and to enable to web frontend of DARCI to call the Destiny 2 APIs directly. 

### Download and Configure DCLI

Download [dcli](https://github.com/mikechambers/dcli) and place the files in
your system path so they can be called via the command line.

Once downloaded, sync the Destiny 2 manifest by running dclim:

```
$ dclim
```

Note the directory that the `manifest.sqlite3` files is stored in.

The manifest is a database from Bungie that contains information about Destiny
2, including map and weapon info, images, urls, etc... and is updated by Bungie
from time to time. 

Create the following environment variables, replacing `/home/mesh/.local/share/dcli/` with the past where your `manifest.sqlite3` was created.

```
export DCLI_DB_PATH='/home/mesh/.local/share/dcli/dcli.sqlite3'
export MANIFEST_DB_PATH='/home/mesh/.local/share/dcli/manifest.sqlite3'
export MANIFEST_INFO_PATH='/home/mesh/.local/share/dcli/manifest_info.json'
export DCLI_FIX_DATA=true
```

The DCLI_FIX_DATA` variable is used when syncing activity data. When set to `true` dclisync will make additional
API calls when syncing data if there is missing data in the API (which happens sometimes). This can
siginificantly slow down the initial sync, but is recomended as it can help
prevent missing data.

At this point, we are ready to do the initial data sync. The first sync can take
some time, and thus its suggested you sync one player first, and get everything
else setup, then add additional players.

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
has played, and whether DCLI_FIX_DATA is enabled. Subsequent data syncs will be
much faster.

If any errors occur, simply run the command again.

# Download and Configure DARCI



- NodeJS
  - install nodejs
- DARCI SERVER
  - Create DCLI_DB_PATH, MANIFEST_DB_PATH, MANIFEST_INFO_PATH that point to the appropriate files.
  - `npm install nodemon --global`
  - `server/$ npm install`
  - `server/$ nodemon server.js`
- DARCI CLIENT-WEB
  - create `.env.local` file in `src/client-web` folder
  - add `REACT_APP_DESTINY_API_KEY=YOUR_BUNGIE_API_KEY_HERE`
  - `client-web/$ npm start`
    \*this should launch a brower with the app running, showing a page with all users who have been synced
    
    
 
### Server Setup

The following crontab entries will run dclim once an hour (to check for an udpated manifest), and log output to a log directory in the specified home directory.

```
#replace /home/mesh with your own home directory
SHELL=/bin/bash
BASH_ENV="/home/mesh/.profile"

#check for new manifest at 5 minutes past the hour
5 * * * * dclim >> /home/mesh/logs/cron.log

#remove the log file once a day at 00:05
5 0 * * * rm /home/mesh/logs/cron.log
```
