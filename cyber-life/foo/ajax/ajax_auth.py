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
import smtplib
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
from bson import json_util

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from comm import *
from global_const import *

from tornado.escape import json_encode, json_decode
from tornado.httpclient import *
from tornado.httputil import url_concat
from bson import json_util


# 创建验证码
class AjaxAuthVerifyCodeXHR(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        logging.info(self.request)
        logging.info(self.request.body)
        _body = json_decode(self.request.body)
        self.set_header('Content-Type', 'application/json')

        phone = _body['phone']
        logging.info("got phone %r", phone)
        if phone is None or phone == "":
            self.set_status(400) # Bad Request
            self.write('Bad Request')
            self.finish()
            return

        url = "http://api.7x24hs.com/auth/pwd/verify-code"
        body_data = {"appid":APPID, "app_secret":APP_SECRET, "login":phone}
        logging.info("post body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = None
        try:
            response = http_client.fetch(url, method="POST", body=_json)
            logging.info("got response %r", response.body)
            logging.info("got response.headers %r", response.headers)
        except HTTPError as e:
            # HTTPError is raised for non-200 responses; the response
            # can be found in e.response.
            logging.error("send verify code error: %r", str(e))
            self.set_status(e.code) # HTTPError
            self.write(str(e))
            self.finish()
        except Exception as e:
            # Other errors are possible, such as IOError.
            logging.error("send verify code error: %r", str(e))
            self.set_status(500) # Internal Server Error
            self.write(str(e))
            self.finish()
        else:
            # if no exception,get here
            logging.info("return 200: OK")
            self.set_status(200) # OK
            self.write('OK')
            self.finish()
        finally:
            http_client.close()

        return
