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
import datetime
import random

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
    __session_ticket = None;


    # 只有调用 self.get_current_user()后，再调用此函数
    def get_session_ticket(self):
        return self.__session_ticket


    def get_current_user(self):
        access_token = self.get_secure_cookie("access_token")
        logging.info("got access_token %r from cookie", access_token)
        if not access_token:
            return None

        url = "http://" + AUTH_HOST + "/auth/token"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET", headers={"Authorization":"Bearer "+access_token})
        logging.info("session_ticket response %r", response.body)
        session_ticket = json_decode(response.body)

        _timestamp = int(time.time())
        expires_at = session_ticket['expires_at']
        if _timestamp < expires_at:
            logging.info("got current_timestamp %r < expires_at %r from session_ticket", _timestamp, expires_at)
            self.__session_ticket = session_ticket
            return session_ticket
        else:
            refresh_token = session_ticket['refresh_token']
            logging.info("got refresh_token %r from session_ticket", refresh_token)

            url = "http://" + AUTH_HOST + "/auth/refresh-token"
            http_client = HTTPClient()
            response = http_client.fetch(url, method="GET", headers={"Authorization":"Bearer "+refresh_token})
            logging.info("got session_ticket response %r", response.body)
            session_ticket = json_decode(response.body)

            self.set_secure_cookie("access_token", session_ticket['access_token'])
            self.__session_ticket = session_ticket
            return session_ticket


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')



def timestamp_friendly_date(value):
    #_format = '%Y-%m-%d %H:%M:%S'
    y_format = '%Y'
    m_format = '%m'
    d_format = '%d'
    w_format = '%w'
    # value is timestamp(int), eg: 1332888820
    _value = time.localtime(value)
    _current = time.localtime()
    ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=0)
    current_y_dt = time.strftime(y_format, _current)
    y_dt = time.strftime(y_format, _value)
    m_dt = time.strftime(m_format, _value)
    d_dt = time.strftime(d_format, _value)
    w_dt = time.strftime(w_format, _value)
    if w_dt == '0':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期日'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期日'
    elif w_dt == '1':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期一'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期一'
    elif w_dt == '2':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期二'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期二'
    elif w_dt == '3':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期三'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期三'
    elif w_dt == '4':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期四'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期四'
    elif w_dt == '5':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期五'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期五'
    elif w_dt == '6':
        if current_y_dt == y_dt:
            _dt = str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期六'
        else:
            _dt = str(int(y_dt)) + '年' + str(int(m_dt)) + '月' + str(int(d_dt)) + ' 星期六'
    return _dt


def timestamp_date(value):
    #_format = '%Y-%m-%d %H:%M:%S'
    _format = '%m/%d/%Y'
    # value is timestamp(int), eg: 1332888820
    _value = time.localtime(value)
    ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=0)
    _dt = time.strftime(_format, _value)
    return _dt


def date_timestamp(dt):
     # dt is string
     time.strptime(dt, '%m/%d/%Y')
     ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=-1)
     # "2012-03-28 06:53:40" to timestamp(int)
     _timestamp = time.mktime(time.strptime(dt, '%m/%d/%Y'))
     return int(_timestamp)


def timestamp_datetime(value):
    #_format = '%Y-%m-%d %H:%M:%S'
    _format = '%m/%d/%Y %H:%M'
    # value is timestamp(int), eg: 1332888820
    _value = time.localtime(value)
    ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=0)
    _dt = time.strftime(_format, _value)
    return _dt


def datetime_timestamp(dt):
     # dt is string
     time.strptime(dt, '%m/%d/%Y %H:%M')
     ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=-1)
     # "2012-03-28 06:53:40" to timestamp(int)
     _timestamp = time.mktime(time.strptime(dt, '%m/%d/%Y %H:%M'))
     return int(_timestamp)


def time_span(ts):
    delta = datetime.datetime.now() - datetime.datetime.fromtimestamp(ts)
    if delta.days >= 365:
        return '%d年前' % (delta.days / 365)
    elif delta.days >= 30:
        return '%d个月前' % (delta.days / 30)
    elif delta.days > 0:
        return '%d天前' % delta.days
    elif delta.seconds < 60:
        return "%d秒前" % delta.seconds
    elif delta.seconds < 60 * 60:
        return "%d分钟前" % (delta.seconds / 60)
    else:
        return "%d小时前" % (delta.seconds / 60 / 60)


#验证码函数
def random_x(i):
    code = []
    for i in range(i):
        if i == random.randint(1,3):
            code.append(str(random.randint(1,9)))
        else:
            tmp = random.randint(65,90)
            code.append(chr(tmp))

    return ''.join(code)
