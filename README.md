# PiAlarm
## An alarm system on a Pi
This will run a morning alarm system on a Raspberry Pi.

The system includes an LED strip which will simulate a sunrise for an hour before the alarm is set to go off.

## Setup
* Scheduled tasks
    * Add to the superuser's cron jobs (`sudo crontab -e`)
        * `@reboot /absolute/path/to/project/startServer.sh`
        * `*/5 * * * * /absolute/path/to/project/updateScheduledAlarms.sh`
    * Add to the user's cron jobs (`crontab -e`)
        * `@reboot pulseaudio --start | at now + 1 minute`
        * `@reboot /home/pi/PiAlarm/connectBluetooth.sh | at now + 2 minutes`
* Configure nginx to use PHP
    * Edit `/etc/nginx/sites-enabled/default`
        * Add `index.php` to the line that resembles `index index.html index.htm;`
        * Uncomment the following lines
* Configure MySQL
   * Create database `Alarm`
      * Create table `Alarm` with fields
         * `ID` INT AUTO_INCREMENT (PK)
         * `Days` VARCHAR(7)
         * `Hour` INT
         * `Minute` INT
         * `Active` BOOLEAN
* Configure alarm tone
   * Place a `.wav` file in the root directory of the project entitled `alarm.wav`
```
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php5-fpm.sock;
}
```
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
