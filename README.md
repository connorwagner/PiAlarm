# PiAlarm
## An alarm system on a Pi
This will run a morning alarm system on a Raspberry Pi.

The system includes an LED strip which will simulate a sunrise for an hour before the alarm is set to go off.

## Setup
* Scheduled tasks
    * Add to the superuser's cron jobs (`sudo crontab -e`)
        * `@reboot /absolute/path/to/project/bash/startServer.sh`
        * `*/5 * * * * /absolute/path/to/project/bash/updateScheduledAlarms.sh`
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
* Configure MySQL
   * Create database `Alarm`
      * Create table `Alarm` with fields
         * `ID` INT AUTO_INCREMENT (PK)
         * `Days` VARCHAR(7)
         * `Hour` INT
         * `Minute` INT
         * `Active` BOOLEAN
* Configure alarm tone
    * Place `.wav` or `.mp3` files in the `alarmTones` subdirectory; one of these files will be chosen at random each time the alarm sounds
* Set up bluetooth speaker connection
    * Give user permission to use bluetooth (`sudo usermod -G bluetooth -a pi`)
    * Give root user permission to use bluetooth (`sudo usermod -G bluetooth -a root`)
    * Start audio server at boot (Add `pulseaudio --start` to the end of `.bashrc`)
    * Pair the device manually
```
bluetoothctl
power on
agent on
scan on
pair [MAC]
trust [MAC]
connect [MAC]
quit
```

## Dependencies
* System
    * mysql-server
    * nginx
        * php-fpm
    * pulseaudio
        * pulseaudio-module-bluetooth
* PHP
    * php7.0-curl
* Bash
    * jq
    * at
* Python 3
    * requests
