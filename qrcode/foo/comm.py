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
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
from qrcode import *
from tornado.escape import json_encode, json_decode
from image_verify import generate_verify_image


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


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('index.html')


class DemoUiHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('demo-ui.html')


# /api/qrcode
class ApiQrcodeHandle(tornado.web.RequestHandler):
    def post(self):
        logging.info(self.request)

        post_body = self.request.body
        logging.info("got post body %r", post_body)
        data = json_decode(post_body)
        _url = data['url']
        logging.info("got _url %r", _url)

        qr = QRCode(
            # version值为1~40的整数,控制二维码的大小,(最小值是1,是个12*12的矩阵)
            # 如果想让程序自动确定,将值设置为 None 并使用 fit 参数即可
            version=5,
            # error_correction: 控制二维码的错误纠正功能,可取值下列4个常量
            #   ERROR_CORRECT_L: 大约7%或更少的错误能被纠正
            #   ERROR_CORRECT_M(默认): 大约15%或更少的错误能被纠正
            #   ERROR_CORRECT_Q: 大约25%或更少的错误能被纠正
            #   ERROR_CORRECT_H: 大约30%或更少的错误能被纠正
            error_correction=ERROR_CORRECT_L,
            # 控制二维码中每个小格子包含的像素数
            box_size=2,
            # 控制边框(二维码与图片边界的距离)包含的格子数(默认为4,是相关标准规定的最小值)
            border=4,
        )
        qr.add_data(_url)
        qr.make() # Generate the QRCode itself
        # im contains a PIL.Image.Image object
        img = qr.make_image()

        _id = str(uuid.uuid1()).replace('-', '')
        _date = timestamp_date(time.time())
        path = cur_file_dir()
        logging.info("got path %r", path)
        if not os.path.exists(path + "/static/qrcode/" + _date):
            os.makedirs(path + "/static/qrcode/" + _date)

        # To save it
        img.save(path + "/static/qrcode/" + _date + "/" + _id + '.png')     # Save file

        img_url = self.request.protocol + "://" + self.request.host
        img_url = img_url + '/static/qrcode/' + _date + "/" + _id + '.png'
        logging.info("got img_url %r", img_url)
        self.write(img_url)
        self.finish()


# /api/image-verify
class ApiImageVerifyXHR(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        _id = str(uuid.uuid1()).replace('-', '')
        _date = timestamp_date(time.time())
        path = cur_file_dir()
        logging.info("got path %r", path)
        if not os.path.exists(path + "/static/image-verify/" + _date):
            os.makedirs(path + "/static/image-verify/" + _date)

        # To save it
        filepath = path + "/static/image-verify/" + _date + "/" + _id + '.gif'

        mstream, strs = generate_verify_image(save_img=True, filepath=filepath)
        logging.info("got code %r", strs)

        img_url = self.request.protocol + "://" + self.request.host
        img_url = img_url + '/static/image-verify/' + _date + "/" + _id + '.gif'
        logging.info("got img_url %r", img_url)

        self.set_status(200) # Success
        self.write(JSON.dumps({"err_code":200,"err_msg":"Success","code":strs,"image_url":img_url}))
        self.finish()


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
