#!/usr/bin/env python
# _*_ coding: utf-8_*_
#
# Copyright 2016 7x24hs.com
# thomas@7x24hs.com
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
import hashlib
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
from bson import json_util
import requests

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from comm import *
from global_const import *
from dao import auth_login_dao
from dao import auth_account_dao
from dao import auth_access_token_dao
from dao import blog_article_dao

from tornado.escape import json_encode, json_decode
from tornado.httpclient import *
from tornado.httputil import url_concat
from bson import json_util


# /blog/articles
class BlogAritcleIndexXHR(tornado.web.RequestHandler):
    # 查询博客文章列表
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        logging.info(self.request)
        before = self.get_argument("before", 0)
        limit = self.get_argument("limit", 20)
        before = int(before)
        limit = int(limit)
        logging.info("get before %r from argument", before)
        logging.info("get limit %r from argument", limit)

        articles = blog_article_dao.blog_article_dao().query_pagination('blog', 'pub', before, limit)
        if not articles:
            self.set_status(404) # Not Found
            self.write('Not Found')
            self.finish()
            return

        self.set_status(200) # OK
        self.finish(JSON.dumps(articles))
        return

    # 创建文章
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        logging.info(self.request)

        data = json_decode(self.request.body)
        title = None
        image = None
        desc = None
        try:
            _type = data['type']
            title = data['title']
            image = data['image']
            desc = data['desc']
            logging.info("got _type %r", _type)
            logging.info("got title %r", title)
            logging.info("got image %r", image)
            logging.info("got desc %r", desc)
        except:
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return

        if _type is None or title is None or image is None or desc is None:
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(401) # Unauthorized
            self.write('Unauthorized')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        token = auth_access_token_dao.auth_access_token_dao().query(access_token)
        if token is None:
            self.set_status(403) # Forbidden
            self.write('Forbidden')
            self.finish()
            return

        article_id = str(uuid.uuid1()).replace('-', '')
        timestamp = int(time.time());
        data['_id'] = article_id
        data['type'] = _type
        data['status'] = "draft"
        data['create_time'] = timestamp
        data['publish_time'] = timestamp
        data['account_id'] = token['account_id']
        blog_article_dao.blog_article_dao().create(data)

        self.set_status(200) # OK
        self.finish(JSON.dumps({'article_id':article_id}))
        return


# /blog/articles/([a-z0-9]*)
class BlogAritcleXHR(tornado.web.RequestHandler):
    # 查询文章详情
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r in uri", article_id)

        article = blog_article_dao.blog_article_dao().query(article_id)
        if not article:
            self.set_status(404) # Not Found
            self.write('Not Found')
            self.finish()
            return

        self.set_status(200) # OK
        self.finish(JSON.dumps(article))
        return

    # 删除文章
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def delete(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r in uri", article_id)

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(401) # Unauthorized
            self.write('Unauthorized')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        token = auth_access_token_dao.auth_access_token_dao().query(access_token)
        if token is None:
            self.set_status(403) # Forbidden
            self.write('Forbidden')
            self.finish()
            return

        # TODO 检查文章是否account_id创建

        article = blog_article_dao.blog_article_dao().delete(article_id)

        self.set_status(200) # OK
        self.finish(JSON.dumps("OK"))
        return


    # 修改文章
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def put(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r in uri", article_id)

        data = json_decode(self.request.body)
        title = None
        image = None
        desc = None
        try:
            title = data['title']
            image = data['image']
            desc = data['desc']
            logging.info("got title %r", title)
            logging.info("got image %r", image)
            logging.info("got desc %r", desc)
        except:
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return

        if title is None or image is None or desc is None:
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(401) # Unauthorized
            self.write('Unauthorized')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        token = auth_access_token_dao.auth_access_token_dao().query(access_token)
        if token is None:
            self.set_status(403) # Forbidden
            self.write('Forbidden')
            self.finish()
            return

        # TODO 检查文章是否account_id创建

        timestamp = int(time.time());
        data['_id'] = article_id
        data['last_update_time'] = timestamp
        blog_article_dao.blog_article_dao().update(data)

        self.set_status(200) # OK
        self.finish(JSON.dumps("OK"))
        return


# /blog/account/([a-z0-9]*)/articles
class BlogAccountAritclesXHR(tornado.web.RequestHandler):
    # 查询博客文章列表
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self, account_id):
        logging.info(self.request)
        before = self.get_argument("before", 0)
        limit = self.get_argument("limit", 20)
        status = self.get_argument("status", "pub")
        _type = self.get_argument("type", "blog")
        before = int(before)
        limit = int(limit)
        logging.info("get before %r from argument", before)
        logging.info("get limit %r from argument", limit)
        logging.info("get status %r from argument", status)
        logging.info("get _type %r from argument", _type)

        articles = blog_article_dao.blog_article_dao().query_pagination_by_account(account_id, _type, status, before, limit)
        if not articles:
            self.set_status(404) # Not Found
            self.write('Not Found')
            self.finish()
            return

        self.set_status(200) # OK
        self.finish(JSON.dumps(articles))
        return


# /blog/articles/([a-z0-9]*)
class BlogAritclePubXHR(tornado.web.RequestHandler):
    # 发布文章
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def put(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r in uri", article_id)

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(401) # Unauthorized
            self.write('Unauthorized')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        token = auth_access_token_dao.auth_access_token_dao().query(access_token)
        if token is None:
            self.set_status(403) # Forbidden
            self.write('Forbidden')
            self.finish()
            return

        # TODO 检查文章是否account_id创建

        timestamp = int(time.time());
        data = {'_id':article_id, 'status':'pub',
                'last_update_time':timestamp, 'publish_time':timestamp}
        blog_article_dao.blog_article_dao().update(data)

        self.set_status(200) # OK
        self.finish(JSON.dumps("OK"))
        return
