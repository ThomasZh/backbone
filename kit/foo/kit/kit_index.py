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
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
from bson import json_util

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from comm import cur_file_dir
from comm import timestamp_date
from dao import kit_dao


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        self.render('index.html')


class ApiKitHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        before = self.get_argument("before", '0')
        logging.info("got before %r", before)
        if before == '':
            before = time.time()
        else:
            before = float(before)
        limit = 20
        logging.info("got before %r limit %r", before, limit)

        _array = kit_dao.kit_dao().query_pagination(before, limit)

        docs_list = list(_array)
        self.write(JSON.dumps(docs_list, default=json_util.default))
        self.finish()

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

        # save message into mongodb
        timestamp = time.time()
        _json = {'name':name, 'email':email, 'message':message,
                'create_time':timestamp}
        kit_dao.kit_dao().create(_json)

        # save message into file
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

        # send mail by smtp
        os.system('mail -s "kits notify" thomas.zh@qq.com < ' + filename)

        self.write("SUCCESS")
        self.finish()
