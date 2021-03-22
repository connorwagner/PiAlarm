# PiAlarm
## An alarm system on a Pi
This will run a morning alarm system on a Raspberry Pi.

The system includes an LED strip which will simulate a sunrise for a set amount of time before the alarm is set to go off.

## Setup
* Scheduled tasks
    * Add to the superuser's cron jobs (`sudo crontab -e`)
        * `@reboot /absolute/path/to/project/bash/startServer.sh`
        * `*/5 * * * * /absolute/path/to/project/bash/updateScheduledAlarms.sh`
* Configure MySQL
    * Create user `alarm`:`alarmpassword`
    * Create database `Alarm`
        * Create table `Alarm` with fields
            * `ID` INT AUTO_INCREMENT (PK)
            * `Days` VARCHAR(7)
            * `Hour` INT
            * `Minute` INT
            * `Active` BOOLEAN
        * Create table `User` with fields
            * `ID` INT AUTO_INCREMENT (PK)
            * `Username` VARCHAR(150)
            * `Password` VARCHAR(150)
            * `Token` VARCHAR(150)
* Environment
    * Set `ALARM_DURATION` environment variable in `.bashrc`
        * Alarm duration in minutes
* API
    * `npm install`
* UI
    * I recommend building the `angular-ui` project on a PC and copying the built files to the Pi
        * The project takes a very long time to build on pi hardware
    * Configure a web server to serve built documents
        * 404s should redirect to index.html
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
    * pulseaudio
        * pulseaudio-module-bluetooth
* Bash
    * jq
    * at
* Python 3
    * requests
