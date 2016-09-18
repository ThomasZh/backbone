# _*_ coding: utf-8_*_
#
# genral application route config:
# simplify the router config by dinamic load class
# by lwz7512
# @2016/05/17

import tornado.web

from foo import comm
from foo.ui import ui_light7
from foo.ui import ui_bf
from foo.ui import ui_club


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(ui_light7, 'IndexHandle')),
        (r'/light7', getattr(ui_light7, 'Light7IndexHandler')),
        (r'/light7/activity-info', getattr(ui_light7, 'Light7ActivityInfoHandler')),
        (r'/light7/activity-applicant', getattr(ui_light7, 'Light7ActivityApplicantHandler')),
        (r'/light7/activity-hha', getattr(ui_light7, 'Light7ActivityHhaHandler')),
        (r'/light7/activity-order-confirm', getattr(ui_light7, 'Light7ActivityOrderConfirmHandler')),
        (r'/light7/pay-success', getattr(ui_light7, 'Light7PaySuccessHandler')),
        (r'/light7/title-edit', getattr(ui_light7, 'Light7TitleEditHandler')),
        (r'/light7/wysiwyg-editor', getattr(ui_light7, 'Light7WysiwygEditorHandler')),
        (r'/light7/upload-file', getattr(ui_light7, 'Light7UploadFileHandler')),
        (r'/light7/fixed-tab', getattr(ui_light7, 'Light7FixedTabHandler')),
        (r'/light7/bottom-scroll', getattr(ui_light7, 'Light7BottomScrollHandler')),
        (r'/light7/fixed-tab-scroll', getattr(ui_light7, 'Light7FixedTabScrollHandler')),
        (r'/light7/pc-vouchers', getattr(ui_light7, 'Light7PcVouchersHandler')),
        (r'/light7/pc-certs', getattr(ui_light7, 'Light7PcCertsHandler')),
        (r'/light7/product-detail', getattr(ui_light7, 'Light7ProductDetailHandler')),
        (r'/light7/login', getattr(ui_light7, 'Light7LoginHandler')),

        (r'/bf', getattr(ui_bf, 'BfIndexHandler')),
        (r'/bf/pc/vouchers', getattr(ui_bf, 'BfPcVouchersHandler')),
        (r'/bf/pc/certs', getattr(ui_bf, 'BfPcCertsHandler')),

        (r'/club', getattr(ui_club, 'ClubIndexHandler')),
        (r'/club/me/vouchers', getattr(ui_club, 'ClubMeVouchersHandler')),
        (r'/club/me/certs', getattr(ui_club, 'ClubMeCertsHandler')),
        (r'/club/me/settings', getattr(ui_club, 'ClubMeSettingsHandler')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
