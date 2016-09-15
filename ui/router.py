# _*_ coding: utf-8_*_
#
# genral application route config:
# simplify the router config by dinamic load class
# by lwz7512
# @2016/05/17

import tornado.web

from foo import comm
from foo.ui import ui_mobile


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(ui_mobile, 'IndexHandle')),
        (r'/mobile', getattr(ui_mobile, 'MobileIndexHandler')),
        (r'/mobile/activity-info', getattr(ui_mobile, 'MobileActivityInfoHandler')),
        (r'/mobile/activity-applicant', getattr(ui_mobile, 'MobileActivityApplicantHandler')),
        (r'/mobile/activity-hha', getattr(ui_mobile, 'MobileActivityHhaHandler')),
        (r'/mobile/activity-order-confirm', getattr(ui_mobile, 'MobileActivityOrderConfirmHandler')),
        (r'/mobile/title-edit', getattr(ui_mobile, 'MobileTitleEditHandler')),
        (r'/mobile/wysiwyg-editor', getattr(ui_mobile, 'MobileWysiwygEditorHandler')),
        (r'/mobile/fixed-tab', getattr(ui_mobile, 'MobileFixedTabHandler')),
        (r'/mobile/bottom-scroll', getattr(ui_mobile, 'MobileBottomScrollHandler')),
        (r'/mobile/fixed-tab-scroll', getattr(ui_mobile, 'MobileFixedTabScrollHandler')),
        (r'/mobile/pc-vouchers', getattr(ui_mobile, 'MobilePcVouchersHandler')),
        (r'/mobile/pc-certs', getattr(ui_mobile, 'MobilePcCertsHandler')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
