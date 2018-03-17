# PiAlarm
## An alarm system on a Pi
This will run a morning alarm system on a Raspberry Pi.

The system includes an LED strip which will simulate a sunrise for an hour before the alarm is set to go off.

## Setup
* Scheduled tasks
    * Add to the superuser's cron jobs (`sudo crontab -e`)
        * `@reboot /absolute/path/to/project/startServer.sh`
        * `*/5 * * * * /absolute/path/to/project/updateScheduledAlarms.sh`
* Configure nginx to use PHP
    * Edit `/etc/nginx/sites-enabled/default`
        * Add `index.php` to the line that resembles `index index.html index.htm;`
        * Uncomment the following lines
```
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php5-fpm.sock;
}
```

## Dependencies
* System
    * mysql-server
    * nginx
        * php-fpm
* PHP
    * php7.0-curl
* Bash
    * jq
    * at
* Python
    * requests
