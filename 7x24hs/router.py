# _*_ coding: utf-8_*_
#
# genral application route config:
# simplify the router config by dinamic load class
# by lwz7512
# @2016/05/17

import tornado.web

from foo import comm
from foo.auth import auth_account
from foo.ajax import ajax_auth


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(comm, 'IndexHandle')),
        ('/login', getattr(auth_account, 'AuthLoginHandler')),
        ('/logout', getattr(auth_account, 'AuthLogoutHandler')),
        ('/register', getattr(auth_account, 'AuthRegisterHandler')),
        ('/lost-pwd', getattr(auth_account, 'AuthLostPwdHandler')),
        ('/profile', getattr(auth_account, 'AuthProfileHandler')),
        ('/profile-edit', getattr(auth_account, 'AuthProfileEditHandler')),
        ('/ajax/vcode', getattr(ajax_auth, 'AjaxAuthVcodeXHR')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
