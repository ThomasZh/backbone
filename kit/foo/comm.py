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
        logging.info("got name %r", name)
        logging.info("got email %r", email)
        logging.info("got message %r", message)

        cmd = 'echo  "' + 'from: ' + name \
                + 'email: ' + email \
                + 'message: ' + message \
                + '" | mail -s "kits notify" thomas.zh@qq.com'
        os.system(cmd)

        self.write("SUCCESS")
        self.finish()


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
