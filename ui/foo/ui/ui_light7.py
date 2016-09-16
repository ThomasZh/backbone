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


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('light7/index.html')


class Light7IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/index.html')


class Light7ActivityInfoHandler(tornado.web.RequestHandler):
    def get(self):
        content = u'<h1>标题一</h1>' + \
                u'<h2>标题二</h2>' + \
                u'<h3>标题三</h3>' + \
                u'<h4>标题四</h4>' + \
                u'<h5>标题五</h5>' + \
                u'<h6>标题六</h6>' + \
                u'<p>我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白</p>' + \
                u'<ul>' + \
                  u'<li><a href="#router1">链接1</a></li>' + \
                  u'<li><a href="#router2">链接2</a></li>' + \
                  u'<li><a href="#router3">链接3</a></li>' + \
                  u'<li><a href="#router4">链接4</a></li>' + \
                  u'<li><a href="#router5">链接5</a></li>' + \
                  u'<li><a href="#router6">链接6</a></li>' + \
                u'</ul>' + \
                u'<ol>' + \
                  u'<li>当时的绅士俱乐部源于</li>' + \
                  u'<li>除古香古色的房间</li>' + \
                  u'<li>和美轮美奂的装饰</li>' + \
                  u'<li>书房餐厅</li>' + \
                  u'<li>图书馆</li>' + \
                  u'<li>茶室</li>' + \
                u'</ol>' + \
                u'<blockquote class="blockquote">俱乐部是个很特殊的商业交际平台，因为如果在普通氛围里不可能办到的事，在俱乐部里就可以做成，这是因为俱乐部的平等传统。只要是会员，大家就是平等的，即使是全球500强企业的CEO，也不可能在俱乐部里拒绝其他会员喝一杯、坐下来聊聊的邀请。有人觉得这些俱乐部的会员大都是身居高位的企业领导者，对于习惯了“单位”文化背景下的人来说，会在比较之下觉得心理不平衡，其实是根本没必要的。一个社会只有中产阶级的数量越多，社会才越稳定。</blockquote>'

        self.render('light7/activity-info.html', content=content)


class Light7ActivityApplicantHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/activity-applicant.html')


class Light7ActivityHhaHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/activity-hha.html')


class Light7ActivityOrderConfirmHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/activity-order-confirm.html')


class Light7TitleEditHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/title-edit.html')


class Light7WysiwygEditorHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/wysiwyg-editor.html')


class Light7FixedTabHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/fixed-tab.html')


class Light7BottomScrollHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/bottom-infinite-scroll.html')


class Light7FixedTabScrollHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/fixed-tab-infinite-scroll.html')


class Light7PcVouchersHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/pc-vouchers.html')


class Light7PcCertsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/pc-certs.html')


class Light7ProductDetailHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/product-detail.html')


class Light7LoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('light7/login.html')
