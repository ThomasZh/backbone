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
from gettext import gettext as _
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

from comm import *
from global_const import *

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util


class BlogArticleIndexHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        self.render('blog/index.html')


class BlogArticleCreateHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        self.render('blog/article-create.html')

    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self):
        logging.info(self.request)

        image = self.get_argument("filename", "")
        logging.info("got image %r", image)
        title = self.get_argument("article_title", "")
        logging.info("got article_title %r", title)
        desc = self.get_argument("article_desc", "")
        logging.info("got article_desc %r", desc)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        url = "http://" + AUTH_HOST + "/blog/articles"
        body_data = {'type':'blog', 'image':image, 'title':title, 'desc':desc}
        logging.info("post body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.render('blog/index.html')


class BlogArticleHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        self.render('blog/article.html')


class BlogArticleMineHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        account_id = self.get_secure_cookie("account_id")
        logging.info("got account_id %r from cookie", account_id)
        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        self.render('blog/my-articles.html',
                account_id=account_id,
                session_token=session_token)
