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

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util

from comm import *
from global_const import STP


class BlogIndexHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('blog/index.html')


class BlogArticleHandler(tornado.web.RequestHandler):
    def get(self, article_id):
        logging.info("got article_id %r in uri", article_id)
        logging.info(self.request)

        url = "http://" + STP + "/blogs/articles/" + article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got _article response %r", response.body)
        _article = json_decode(response.body)
        _timestamp = _article["timestamp"]
        _datetime = timestamp_datetime(_timestamp / 1000)
        _article["timestamp"] = _datetime
        try:
            _article['accountNickname']
        except:
            _article['accountNickname'] = "anonymous"

        url = "http://" + STP + "/blogs/my-articles/" + article_id + "/paragraphs"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got _paragraphs response %r", response.body)
        _paragraphs = json_decode(response.body)

        self.render('blog/article.html',
                article=_article,
                paragraphs=_paragraphs)


class BlogArticleEditHandler(tornado.web.RequestHandler):
    def get(self, article_id):
        logging.info("got article_id %r in uri", article_id)
        logging.info(self.request)

        url = "http://" + STP + "/blogs/articles/" + article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got _article response %r", response.body)
        _article = json_decode(response.body)
        _timestamp = _article["timestamp"]
        _datetime = timestamp_datetime(_timestamp / 1000)
        _article["timestamp"] = _datetime
        try:
            _article['accountNickname']
        except:
            _article['accountNickname'] = "anonymous"

        url = "http://" + STP + "/blogs/my-articles/" + article_id + "/paragraphs"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got _paragraphs response %r", response.body)
        _paragraphs = json_decode(response.body)

        self.render('blog/article-edit.html',
                article=_article,
                paragraphs=_paragraphs)


class BlogParagraphEditHandler(tornado.web.RequestHandler):
    def get(self, paragraph_id):
        logging.info("got paragraph_id %r in uri", paragraph_id)
        logging.info(self.request)

        url = "http://"+STP+"/blogs/paragraphs/" + paragraph_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _paragraph = json_decode(response.body)

        self.render('blog/paragraph-edit.html',
                paragraph=_paragraph)


class BlogArticleTitleEditHandler(tornado.web.RequestHandler):
    def get(self, article_id):
        logging.info("got article_id %r in uri", article_id)
        logging.info(self.request)

        url = "http://" + STP + "/blogs/articles/" + article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got _article response %r", response.body)
        _article = json_decode(response.body)

        self.render('blog/article-title-edit.html',
                article=_article)


class BlogRichTextEditHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('blog/rich-text-edit.html')
