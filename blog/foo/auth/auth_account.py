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
from gettext import gettext as _
import logging
import time
import sys
import os
import uuid
import smtplib
import json as JSON # 启用别名，不会跟方法里的局部变量混淆
from bson import json_util

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from comm import *
from global_const import *

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util


class AuthLoginHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('auth/login.html', err_msg='')

    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        logging.info(self.request)
        phone = self.get_argument("loginPhone", "")
        md5pwd = self.get_argument("loginPwd", "")
        logging.info("phone %r", phone)

        try:
            url = "http://" + AUTH_HOST + "/auth/token"
            body_data = {"appid":APPID, "app_secret":APP_SECRET,
                    "login":phone, "pwd":md5pwd}
            logging.info("post body %r", body_data)
            _json = json_encode(body_data)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            logging.info("got token response %r", response.body)

            token = json_decode(response.body)
            _timestamp = int(time.time())
            expires_at = _timestamp + token['expires_in']
            self.set_secure_cookie("session_token", token['access_token'])
            self.set_secure_cookie("expires_at", str(expires_at))
            self.set_secure_cookie("refresh_token", token['refresh_token'])
            self.set_secure_cookie("account_id", token['account_id'])

            self.redirect("/profile")
        except:
            err_title = str( sys.exc_info()[0] );
            err_detail = str( sys.exc_info()[1] );
            logging.error("error: %r info: %r", err_title, err_detail)
            if err_detail == 'HTTP 404: Not Found':
                _err_msg = _("Please enter a correct username and password.")
                self.render('auth/login.html', err_msg=_err_msg)
                return
            else:
                _err_msg = _(err_detail)
                self.render('auth/login.html', err_msg=_err_msg)
                return


class AuthRegisterHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('auth/register.html', err_msg='')

    def post(self):
        logging.info(self.request)
        phone = self.get_argument("registerPhone", "")
        md5pwd = self.get_argument("registerPwd", "")
        logging.info("phone %r", phone)

        try:
            url = "http://" + AUTH_HOST + "/auth/account"
            body_data = {"appid":APPID, "app_secret":APP_SECRET,
                    "login":phone, "pwd":md5pwd}
            logging.info("post body %r", body_data)
            _json = json_encode(body_data)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            logging.info("got token response %r", response.body)

            _err_msg = _("You have already register an account, please login.")
            self.render('auth/login.html', err_msg=_err_msg)
        except:
            err_title = str( sys.exc_info()[0] );
            err_detail = str( sys.exc_info()[1] );
            logging.error("error: %r info: %r", err_title, err_detail)
            if err_detail == 'HTTP 409: Conflict':
                _err_msg = _("This phone already exist, please enter a new one.")
                self.render('auth/register.html', err_msg=_err_msg)
                return
            else:
                _err_msg = _(err_detail)
                self.render('auth/register.html', err_msg=_err_msg)
                return


class AuthLostPwdHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)
        self.render('auth/lost-pwd.html', err_msg="")

    def post(self):
        logging.info(self.request)
        phone = self.get_argument("lostPhone", "")
        verify_code = self.get_argument("lostVerifyCode", "")
        md5pwd = self.get_argument("lostPwd", "")
        logging.info("phone %r", phone)
        logging.info("verify_code %r", verify_code)

        try:
            url = "http://" + AUTH_HOST + "/auth/pwd"
            body_data = {"appid":APPID, "app_secret":APP_SECRET,
                    "login":phone, "verify_code":verify_code, "pwd":md5pwd}
            logging.info("post body %r", body_data)
            _json = json_encode(body_data)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            logging.info("got response %r", response.body)

            _err_msg = _("Password already updated, please login.")
            self.render("auth/login.html", err_msg=_err_msg)
        except:
            err_title = str( sys.exc_info()[0] );
            err_detail = str( sys.exc_info()[1] );
            logging.error("error: %r info: %r", err_title, err_detail)
            if err_detail == 'HTTP 404: Not Found':
                _err_msg = _("This phone not exist in system, please register first.")
                self.render('auth/lost-pwd.html', err_msg=_err_msg)
                return
            elif err_detail == 'HTTP 401: Unauthorized':
                _err_msg = _("This verify code not pair for phone, please retype it.")
                self.render('auth/lost-pwd.html', err_msg=_err_msg)
                return
            elif err_detail == 'HTTP 408: Request Timeout':
                _err_msg = _("This verify code is timeout, please request new one.")
                self.render('auth/lost-pwd.html', err_msg=_err_msg)
                return
            else:
                _err_msg = _(err_detail)
                self.render('auth/lost-pwd.html', err_msg=_err_msg)
                return


class AuthProfileHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        session_token = self.get_secure_cookie("session_token")
        account_id = self.get_secure_cookie("account_id")
        logging.info("got session_token %r from cookie", session_token)
        logging.info("got account_id %r from cookie", account_id)

        url = "http://" + AUTH_HOST + "/auth/account/" + account_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET", headers={"Authorization":"Bearer "+session_token})
        logging.info("got account response %r", response.body)
        _account = json_decode(response.body)

        self.render('auth/profile.html', account=_account)


class AuthLogoutHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self):
        logging.info(self.request)
        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token response %r", session_token)

        url = "http://" + AUTH_HOST + "/auth/token"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="DELETE", headers={"Authorization":"Bearer "+session_token})
        logging.info("got logout response %r", response.body)

        self.redirect("/login")


class AuthProfileEditHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        session_token = self.get_secure_cookie("session_token")
        account_id = self.get_secure_cookie("account_id")
        logging.info("got session_token %r from cookie", session_token)
        logging.info("got account_id %r from cookie", account_id)

        url = "http://" + AUTH_HOST + "/auth/account/" + account_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET", headers={"Authorization":"Bearer "+session_token})
        logging.info("got account response %r", response.body)
        _account = json_decode(response.body)

        self.render('auth/profile-edit.html', account=_account)

    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self):
        logging.info(self.request)

        session_token = self.get_secure_cookie("session_token")
        account_id = self.get_secure_cookie("account_id")
        logging.info("got session_token %r from cookie", session_token)
        logging.info("got account_id %r from cookie", account_id)

        nickname = self.get_argument("textNickname", "")
        logging.info("got nickname %r", nickname)
        avatar = self.get_argument("avatar", "")
        logging.info("got avatar %r", avatar)

        url = "http://" + AUTH_HOST + "/auth/account/" + account_id
        body_data = {"account_id":account_id,
                "nickname":nickname, "avatar":avatar}
        logging.info("put body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got account response %r", response.body)

        self.redirect("/profile")


class AuthAvatarEditHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        session_token = self.get_secure_cookie("session_token")
        account_id = self.get_secure_cookie("account_id")
        logging.info("got session_token %r from cookie", session_token)
        logging.info("got account_id %r from cookie", account_id)

        url = "http://" + AUTH_HOST + "/auth/account/" + account_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET", headers={"Authorization":"Bearer "+session_token})
        logging.info("got account response %r", response.body)
        _account = json_decode(response.body)

        self.render('auth/avatar-edit.html', account=_account)
