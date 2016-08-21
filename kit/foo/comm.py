#!/usr/bin/env python
# _*_ coding: utf-8_*_
#
# Copyright 2016 planc2c.com
# thomas@time2box.com
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import tornado.web
import logging
import time
import sys
import os
import uuid
import smtplib


#获取脚本文件的当前路径
def cur_file_dir():
     #获取脚本路径
     path = sys.path[0]
     #判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
     if os.path.isdir(path):
         return path
     elif os.path.isfile(path):
         return os.path.dirname(path)


# 时间格式转换
def timestamp_date(value):
    #_format = '%Y-%m-%d %H:%M:%S'
    _format = '%Y/%m/%d/%H'
    # value is timestamp(int), eg: 1332888820
    _value = time.localtime(value)
    ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=0)
    _dt = time.strftime(_format, _value)
    return _dt


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('index.html')


class ApiKitHandle(tornado.web.RequestHandler):
    def post(self):
        logging.info(self.request)

        name = self.get_argument("name", "")
        email = self.get_argument("email", "")
        message = self.get_argument("message", "")
        name = name.encode("utf-8")
        email = email.encode("utf-8")
        message = message.encode("utf-8")
        logging.info("got name %r", name)
        logging.info("got email %r", email)
        logging.info("got message %r", message)

        _id = str(uuid.uuid1()).replace('-', '')
        _date = timestamp_date(time.time())
        path = cur_file_dir()
        logging.info("got path %r", path)
        filename = path + '/static/mail/' + _date + '/' + _id
        logging.info("got filename %r", filename)
        if not os.path.exists(path + "/static/mail/" + _date):
            os.makedirs(path + "/static/mail/" + _date)

        content = 'from: ' + name + '\n' \
                + 'email: ' + email + '\n' \
                + 'message: ' + message
        logging.info("got content %r", content)
        f = file(filename,'w')
        f.write(content)
        f.close()

        os.system('mail -s "kits notify" thomas.zh@qq.com < ' + filename)

        self.write("SUCCESS")
        self.finish()


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
