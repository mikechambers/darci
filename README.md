# dcliserv

dcliserver is a self hosted platform for collecting and viewing Destiny 2 PVP stats.

It is built around three main parts:
* [dcli](https://github.com/mikechambers/dcli) used to download and collect player pvp stats in a sqlite3 database.
* A nodejs backend, that provides a readonly JSON API / interface to the database.
* A react / web based front end for viewing the data.

## Development Installation and Configuration

* DCLI
    * Download and install dcli
    * place into path
    * run dclim
        * note data directory output
    * sync bungie account data (maybe take a few minutes)
    * optionally set up batch file to update
* Bungie API Key
    * get a bungie api key
    * set origin to `*`
* NodeJS
    * install nodejs
* DCLISERVER
    * clone project
    * create `.env.local` file in `src/client-web` folder
    * add `REACT_APP_DESTINY_API_KEY=YOUR_BUNGIE_API_KEY_HERE`
    * `server/$ npm start`
    * `client-web/$ npm start`
        *this should launch a brower with the app running, showing a page with all users who have been synced

