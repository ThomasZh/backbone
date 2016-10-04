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

from global_const import *
from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('index.html')


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        # return self.get_secure_cookie("session_token")

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r", session_token)
        expires_at = self.get_secure_cookie("expires_at")
        refresh_token = self.get_secure_cookie("refresh_token")

        _timestamp = int(time.time())
        if _timestamp > int(expires_at):
            return session_token
        else:
            url = "http://" + AUTH_HOST + "/api/token"
            body_data = {"grant_type":"refresh", "refresh_token":refresh_token}
            logging.info("post body %r", body_data)
            _json = json_encode(body_data)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            logging.info("got token response %r", response.body)

            token = json_decode(response.body)
            expires_at = _timestamp + token['expires_in']
            session_token = token['access_token']
            self.set_secure_cookie("session_token", session_token)
            self.set_secure_cookie("expires_at", str(expires_at))
            self.set_secure_cookie("refresh_token", token['refresh_token'])

            return session_token


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
