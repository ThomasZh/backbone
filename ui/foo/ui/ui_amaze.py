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


class AmazeIndexHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/0.页面说明.html')

class AmazeIndex1Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/1.首页.html')

class AmazeIndex2Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/2.内容页.html')

class AmazeIndex3Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/3.内容列表页.html')

class AmazeIndex4Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/4.视频列表页.html')

class AmazeIndex5Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/5.视频内容页.html')

class AmazeIndex6Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/6.活动列表页.html')

class AmazeIndex7Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/7.活动内容页.html')

class AmazeIndex8Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/8.专题列表页.html')

class AmazeIndex9Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/9.专栏内容页.html')

class AmazeIndex10Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/10.私信内容页.html')

class AmazeIndex11Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/11.个人中心.html')

class AmazeIndex12Handler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('amazeui/12.空间动态列表页.html')
