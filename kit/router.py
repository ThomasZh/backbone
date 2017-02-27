# _*_ coding: utf-8_*_
#
# genral application route config:
# simplify the router config by dinamic load class
# by lwz7512
# @2016/05/17

import tornado.web

from foo import comm
from foo.kit import kit_index


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(kit_index, 'IndexHandle')),
        (r'/api/kits', getattr(kit_index, 'ApiKitHandle')),
        (r'/api/sys-error', getattr(kit_index, 'ApiSysErrorHandle')),
        (r'/sys-error/([a-z0-9]*)', getattr(kit_index, 'SysErrorHandle')),
        (r'/workflow/([a-z0-9]*)', getattr(kit_index, 'WorkflowHandle')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
