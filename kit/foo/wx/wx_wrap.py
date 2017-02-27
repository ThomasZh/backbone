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
from tornado.escape import json_encode
from tornado.httpclient import HTTPClient
from comm import *


def getAccessTokenByClientCredential(appId, appSecret):
    url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+appSecret
    http_client = HTTPClient()
    response = http_client.fetch(url, method="GET")
    logging.info("got response %r", response.body)
    rs = json_decode(response.body)
    return rs["access_token"]


def sendWorkflowMessage(access_token, openid, _id, app, name, email, message, timestamp):
    # touser = 店小二openid
    # template_id = 工作流申请通知
    # url = 模版链接跳转地址
    data = {
        "touser": openid,
        "template_id": "k9tnl9iJXwBkSsm7AixEFrMIrEy06xIoMO-kOzNDfCA",
        "url": "http://kit.7x24hs.com/workflow/"+_id,
        "data": {
           "first": {
               "value":"来自系统: " + app,
               "color":"#173177"
           },
           "keyword1": {
               "value":"有一个用户在网页上给我们留言，需要您及时登录查看。",
               "color":"#173177"
           },
           "keyword2": {
               "value":name,
               "color":"#173177"
           },
           "keyword3": {
               "value":timestamp_datetime(timestamp),
               "color":"#173177"
           },
           "remark": {
               "value":"联络方式: "+ email + "\n" + message,
               "color":"#173177"
           },
        }
    }
    _json = json_encode(data)
    url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token
    http_client = HTTPClient()
    response = http_client.fetch(url, method="POST", body=_json)
    logging.info("got response %r", response.body)


def sendSysErrorMessage(access_token, openid, _id, app, sys, level, message, timestamp):
    # touser = 店小二openid
    # template_id = 系统报警通知
    # url = 模版链接跳转地址
    data = {
        "touser": openid,
        "template_id": "KaamuLGDkc7wCabWC9pu898tpnne17whRdXiMFSXCfM",
        "url": "http://kit.7x24hs.com/sys-error/"+_id,
        "data": {
           "first": {
               "value":"请注意业务系统("+app+")报警内容",
               "color":"#173177"
           },
           "keyword1": {
               "value":sys,
               "color":"#173177"
           },
           "keyword2": {
               "value":timestamp_datetime(timestamp),
               "color":"#173177"
           },
           "keyword3": {
               "value":level,
               "color":"#173177"
           },
           "remark": {
               "value":message,
               "color":"#173177"
           },
        }
    }
    _json = json_encode(data)
    url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token
    http_client = HTTPClient()
    response = http_client.fetch(url, method="POST", body=_json)
    logging.info("got response %r", response.body)
