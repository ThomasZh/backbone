#!/bin/sh
#
# start/stop the Service
#
# do some init here
#
case "$1" in
'restart')

    # first Stopping the Service
    PID=`sed -n 1p pidfile`  #get pid from file
    if [ ! -z "$PID" ] ; then
#        ./crntb-adm.sh uninstall
        echo "Stopping api.7x24hs.com service, begin killing ${PID}"
        kill ${PID} >/dev/null 2>&1
        sleep 2
        echo "Stop: "`date` >> ./log/ctrl.log
    fi

    # second Starting the Service
    cmd=`ps -e|grep $PID`    #get process with the given pid
    if [ "$PID" != "" ] ; then
        echo "Starting api.7x24hs.com service..."
        nohup python index.py -log_file_prefix=./log/api.log &
        echo $! > pidfile    #record process id to file
        echo 'Startup api.7x24hs.com service success!'
#        ./crntb-adm.sh install
        echo "Start: "`date` >> ./log/ctrl.log
    fi
    ;;

'stop')
    # Stopping the Service
    PID=`sed -n 1p pidfile`  #get pid from pidfile
    if [ ! -z "$PID" ] ; then
#        ./crntb-adm.sh uninstall
        echo "Stopping api.7x24hs.com service, begin killing ${PID}"
        kill ${PID} >/dev/null 2>&1
        echo "Stop: "`date` >> ./log/ctrl.log
    fi
    ;;

*)
    echo "Unmarkable usage: $0 {restart | stop}"
    ;;
esac
