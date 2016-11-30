#!/usr/bin/env python
# _*_ coding: utf-8_*_
#
# Copyright 2016 planc2c.com
# dev@tripc2c.com
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
import uuid
import time
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util

from comm import *
from global_const import *


class AjaxArticleIndexXHR(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        _timestamp = self.get_argument("last", 0) # datetime as timestamp
        logging.info("got last %r", _timestamp)
        _timestamp = int(_timestamp)
        if _timestamp == 0:
            _timestamp = int(time.time())
        logging.info("got _timestamp %r", _timestamp)

        try:
            params = {"before":_timestamp, "limit":2, "status":"pub"}
            url = url_concat("http://"+AUTH_HOST+"/blog/articles", params)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="GET")
            logging.info("got response %r", response.body)
            articles = json_decode(response.body)

            for article in articles:
                # publish_time 转换成友好阅读方式(例如：10分钟前)，保留此值为分页使用
                article["timestamp"] = article["publish_time"]
                article["publish_time"] = time_span(article["publish_time"])

                url = "http://" + AUTH_HOST + "/auth/basic/" + article['account_id']
                http_client = HTTPClient()
                response = http_client.fetch(url, method="GET")
                logging.info("got account response %r", response.body)
                account = json_decode(response.body)

                article["account_nickname"] = account["nickname"]
                article["account_avatar"] = account["avatar"]

            self.finish(JSON.dumps(articles))
        except:
            err_title = str( sys.exc_info()[0] );
            err_detail = str( sys.exc_info()[1] );
            logging.error("error: %r info: %r", err_title, err_detail)
            if err_detail == 'HTTP 404: Not Found':
                self.finish()


class AjaxAccountArticleXHR(tornado.web.RequestHandler):
    def get(self, account_id):
        logging.info(self.request)
        logging.info("got account_id %r from uri", account_id)

        _timestamp = self.get_argument("last", 0) # datetime as timestamp
        logging.info("got last %r", _timestamp)
        _timestamp = int(_timestamp)
        if _timestamp == 0:
            _timestamp = int(time.time())
        logging.info("got _timestamp %r", _timestamp)

        try:
            params = {"before":_timestamp, "limit":2, "status":"all"}
            url = url_concat("http://"+AUTH_HOST+"/blog/accounts/"+account_id+"/articles", params)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="GET")
            logging.info("got response %r", response.body)
            _articles = json_decode(response.body)

            for _article in _articles:
                # publish_time 转换成友好阅读方式(例如：10分钟前)，保留此值为分页使用
                _article["timestamp"] = _article["publish_time"]
                _article["publish_time"] = time_span(_article["publish_time"])

            self.finish(JSON.dumps(_articles))
        except:
            err_title = str( sys.exc_info()[0] );
            err_detail = str( sys.exc_info()[1] );
            logging.error("error: %r info: %r", err_title, err_detail)
            if err_detail == 'HTTP 404: Not Found':
                self.finish()


class AjaxArticleXHR(tornado.web.RequestHandler):
    def delete(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="DELETE", headers={"Authorization":"Bearer "+access_token})
        logging.info("got response %r", response.body)

        self.finish()


class AjaxArticlePubXHR(tornado.web.RequestHandler):
    def put(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        access_token = None
        try:
            access_token = self.request.headers['Authorization']
            access_token = access_token.replace('Bearer ','')
        except:
            logging.info("got access_token null")
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return
        logging.info("got access_token %r", access_token)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id+"/pub"
        http_client = HTTPClient()
        body_data = {'article_id':article_id}
        logging.info("post body %r", body_data)
        _json = json_encode(body_data)
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+access_token})
        logging.info("got response %r", response.body)

        self.finish()
