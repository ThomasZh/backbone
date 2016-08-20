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
import uuid
from qrcode import *


class IndexHandle(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('index.html')


class ApiQrcodeHandle(tornado.web.RequestHandler):
    def post(self):
        logging.info(self.request)

        _url = self.get_argument("url", "")
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
        # To save it
        _id = str(uuid.uuid1()).replace('-', '')
        img.save('static/qrcode/' + _id + '.png')     # Save file

        img_url = '/static/qrcode/' + _id + '.png'
        self.write(img_url)
        self.finish()


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('comm/page_404.html')
