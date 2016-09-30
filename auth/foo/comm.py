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


class singleton(object):
    _singleton = None;
    def __new__(cls):
        if cls._singleton is None:
            cls._singleton = object.__new__(cls);
        return cls._singleton;


#获取脚本文件的当前路径
def cur_file_dir():
     #获取脚本路径
     path = sys.path[0]
     #判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
     if os.path.isdir(path):
         return path
     elif os.path.isfile(path):
         return os.path.dirname(path)


# 时间格式转换
def timestamp_date(value):
    #_format = '%Y-%m-%d %H:%M:%S'
    _format = '%Y/%m/%d/%H'
    # value is timestamp(int), eg: 1332888820
    _value = time.localtime(value)
    ## time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=0)
    _dt = time.strftime(_format, _value)
    return _dt


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


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
