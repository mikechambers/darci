# dcliserv

dcliserver is a self hosted platform for collecting and viewing Destiny 2 PVP stats.

It is built around three main parts:
* [dcli](https://github.com/mikechambers/dcli) used to download and collect player pvp stats in a sqlite3 database.
* A nodejs backend, that provides a readonly JSON API / interface to the database.
* A react / web based front end for viewing the data.
