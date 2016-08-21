# _*_ coding: utf-8_*_
#
# genral application route config:
# simplify the router config by dinamic load class
# by lwz7512
# @2016/05/17

import tornado.web

from foo import comm


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(comm, 'IndexHandle')),
        (r'/demo-ui', getattr(comm, 'DemoUiHandle')),
        (r'/api/qrcode', getattr(comm, 'ApiQrcodeHandle')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
