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
from global_const import STP


class ApiAccountXHR(tornado.web.RequestHandler):
    def get(self):
        _timestamp = self.get_argument("last", 0) # datetime as timestamp
        logging.info("got last %r", _timestamp)
        _timestamp = int(_timestamp)

        if _timestamp == 0:
            _timestamp = long(time.time() * 1000)
        logging.info("got _timestamp %r", _timestamp)

        params = {"before": _timestamp, "limit": 5}
        url = url_concat("http://"+STP+"/blogs/articles", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _articles = json_decode(response.body)

        for _article in _articles:
            _datetime = timestamp_datetime(_article["timestamp"] / 1000)
            _article["publishTimestamp"] = _datetime

        self.finish(JSON.dumps(_articles))
