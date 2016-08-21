# 3rd lib depends
tornado
pymongo
xlwt
qrcode
Image


# mongodb init
$ cd mongodb/bin
$ sudo mkdir /data/db
$ sudo chown -R thomas /data/db
$ sudo ./mongod --auth &

#后台登录到数据库
$ ./mongo
> use aplan
> db.createUser({"user":"aplan","pwd":"aplan123456",roles:["readWrite","dbAdmin"]})
> db.auth("aplan","aplan123456")
> show collections
> db.activity.find()
