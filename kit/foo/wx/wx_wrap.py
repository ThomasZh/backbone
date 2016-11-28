#!/usr/bin/env python
# -*- coding: utf-8 -*-
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

import hashlib
import logging
import random
import string
import time

from tornado.escape import json_decode
from tornado.httpclient import HTTPClient


def getAccessTokenByClientCredential(appId, appSecret):
    url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+appSecret
    http_client = HTTPClient()
    response = http_client.fetch(url, method="GET")
    logging.info("got response %r", response.body)
    rs = json_decode(response.body)
    return rs["access_token"]


def sendTemplateMessage(access_token):
    url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+access_token
    http_client = HTTPClient()
    
