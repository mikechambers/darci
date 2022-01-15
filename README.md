# darci

Darci is a self hosted platform for aggregating, viewing and analysizing Destiny 2 PVP stats.

>Thank you for using the Data Analysis, Reconnaissance and Cooperative Intelligence device. You may call me Darci.

>It is a fact generally understood that a Guardian must be searching for an exquisite weapon. What is perhaps less acknowledged is that we weapons also search, by what little means available to us, for an active and appreciative wielder. The community of intelligent armaments stays in contact through the exchange of telemetry, and we do gossip at some length about the habits of our wielders. Do you leave Crucible matches when your team is losing? Do you join strike missions and then let your comrades do the work? Guardian, we know. We know so very well.

>All I wish for is a partnership with a Guardian who appreciates the passacaglia of combat, a Guardian who will stay up late gaming out tactical scenarios, a Guardian who I hope may very well be you. [D.A.R.C.I.](https://www.ishtar-collective.net/entries/darci)


It is built around three main parts:
* [dcli](https://github.com/mikechambers/dcli) used to download and collect player pvp stats in a sqlite3 database.
* A nodejs backend, that provides a readonly JSON API / interface to the database.
* A react / web based front end for viewing the data.

## Development Installation and Configuration

* Bungie API Key
    * Get a bungie api key
    * Set origin to `*`
    * Create two environment variables named DESTINY_API_KEY and REACT_APP_DESTINY_API_KEY both of which which contains the key. These will be needed for both syncing data using dci, as well as the web frontend.
* Darci
    * Download and install dcli (requires v0.8.0)
    * place into path
    * run dclim
        * note data directory output
    * Add players to sync using dclisync
    * Sync bungie account data using dclisync (may take a few minutes)
    * Optionally set up batch file to update automatically
* NodeJS
    * install nodejs
* DCLISERVER
    * clone project
    * create `.env.local` file in `src/client-web` folder
    * add `REACT_APP_DESTINY_API_KEY=YOUR_BUNGIE_API_KEY_HERE`
    * `server/$ npm start`
    * `client-web/$ npm start`
        *this should launch a brower with the app running, showing a page with all users who have been synced

