#!/bin/bash

JOBS=$(atq)
while read -r line; do
    if [ ! -z "$line" ]; then
        ID=`awk '{print $1}' <<< "$line"`
        atrm "$ID"
    fi
done <<< "$JOBS"

ALARMS=$(mysql -u alarm -palarmpassword -D Alarm -NB -e "SELECT Days, Hour, Minute FROM Alarm WHERE Active=1")
while read -r line; do
    hour=`awk '{print $2}' <<< "$line"`
    AMPM="AM"
    if [ $hour -ge 12 ]; then
        AMPM="PM"
        if [ $hour -g 12 ]; then
            hour=$hour-12
        fi
    fi
    minute=`awk '{print $3}' <<< "$line"`
    if [ $minute -le 9 ]; then
        minute="0$minute"
    fi
    days=`awk '{print $1}' <<< "$line"`
    for (( i=0; i<${#days}; i++ )); do
        day="${days:$i:1}";
        case "$day" in
            M) day="Monday"
                ;;
            T) day="Tuesday"
                ;;
            W) day="Wednesday"
                ;;
            R) day="Thursday"
                ;;
            F) day="Friday"
                ;;
            S) day="Saturday"
                ;;
            U) day="Sunday"
                ;;
        esac
        echo 'python3 /home/pi/PiAlarm/startAlarm.py' | at $hour:$minute $AMPM $day > /dev/null 2>&1
    done
done <<< "$ALARMS"
