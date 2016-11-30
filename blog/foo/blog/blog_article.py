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
import urllib
import html2text
import markdown
import re

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../dao"))

from comm import *
from global_const import *

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
from bson import json_util


class BlogWritingHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        random = random_x(8)
        logging.info("got random %r", random)

        self.render('writing.html',
                random=random)


class BlogArticleIndexHandler(tornado.web.RequestHandler):
    def get(self):
        logging.info(self.request)

        random = random_x(8)
        logging.info("got random %r", random)

        self.render('blog/index.html',
                random=random)


class BlogArticleCreateHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        random = random_x(8)
        logging.info("got random %r", random)

        self.render('blog/article-create.html',
                random=random)

    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self):
        logging.info(self.request)

        random = random_x(8)
        logging.info("got random %r", random)

        image = self.get_argument("filename", "")
        logging.info("got image %r", image)
        title = self.get_argument("article_title", "")
        logging.info("got article_title %r", title)
        desc = self.get_argument("article_desc", "")
        logging.info("got article_desc %r", desc)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        url = "http://" + AUTH_HOST + "/blog/articles"
        body_data = {'type':'blog', 'image':image, 'title':title, 'desc':desc}
        logging.info("post body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/mine?random=' + random)


class BlogArticleHandler(tornado.web.RequestHandler):
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got article response %r", response.body)
        article = json_decode(response.body)
        article["publish_time"] = time_span(article["publish_time"])

        if article.has_key('paragraphs'):
            html = markdown.markdown(article['paragraphs'])
            logging.info("got article paragraphs %r", html)

            # 为图片延迟加载准备数据
            # <img alt="" src="http://bighorn.b0.upaiyun.com/blog/2016/11/2/758f7478-d406-4f2e-9566-306a963fb979" />
            # <img data-original="真实图片" src="占位符图片">
            ptn="(<img alt=\"\" src=\"http[s]*://[\w\.\/\-]+\" />)"
            img_ptn = re.compile(ptn)
            imgs = img_ptn.findall(html)
            for img in imgs:
                logging.info("got img %r", img)
                ptn="<img alt=\"\" src=\"(http[s]*://[\w\.\/\-]+)\" />"
                url_ptn = re.compile(ptn)
                urls = url_ptn.findall(html)
                url = urls[0]
                logging.info("got url %r", url)
                #html = html.replace(img, "<img class=\"lazy\" data-original=\""+url+"\" src=\"/static/images/weui.png\" width=\"100%\" height=\"480\" />")
                html = html.replace(img, "<img class=\"lazy\" width=\"100%\" data-original=\""+url+"\" />")
            logging.info("got html %r", html)

            article['paragraphs'] = html

        self.render('blog/article.html',
                random=random,
                article=article)


class BlogArticleEditHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got article response %r", response.body)
        article = json_decode(response.body)

        self.render('blog/article-edit.html',
                random=random,
                article=article)

    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        image = self.get_argument("filename", "")
        logging.info("got image %r", image)
        title = self.get_argument("article_title", "")
        logging.info("got article_title %r", title)
        desc = self.get_argument("article_desc", "")
        logging.info("got article_desc %r", desc)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        url = "http://" + AUTH_HOST + "/blog/articles/" + article_id
        body_data = {'image':image, 'title':title, 'desc':desc}
        logging.info("post body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/mine?random=' + random)


class BlogArticleMineHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        logging.info(self.request)

        random = random_x(8)
        logging.info("got random %r", random)

        account_id = self.get_secure_cookie("account_id")
        logging.info("got account_id %r from cookie", account_id)
        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        self.render('blog/my-articles.html',
                random=random,
                account_id=account_id,
                session_token=session_token)


class BlogArticleParagraphImportHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        self.render('blog/paragraphs-import.html',
                random=random,
                article_id=article_id)

    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)
        url = self.get_argument("article_url", "")
        logging.info("got article_url %r", url)

        random = random_x(8)
        logging.info("got random %r", random)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        # 读取网页内容
        html = urllib.urlopen(url).read()
        logging.info("got html %r", html)
        html = html.decode('utf8')
        # 使用 html2text 将网页内容转换为 Markdown 格式
        h = html2text.HTML2Text()
        h.ignore_links = False
        paragraphs = h.handle(html)
        logging.info("got paragraphs %r", paragraphs)

        # 修改文章段落内容
        url = "http://" + AUTH_HOST + "/blog/articles/" + article_id + "/paragraphs"
        body_data = {'paragraphs':paragraphs}
        logging.info("put body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/' + article_id + '/paragraphs/edit?random=' + random)


class BlogArticleParagraphEditHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        article = json_decode(response.body)

        # 使用 markdown 将网页内容转换为 html 格式
        if article.has_key('paragraphs'):
            html = markdown.markdown(article['paragraphs'])
            article['paragraphs'] = html
        else:
            article['paragraphs'] = ''

        self.render('blog/paragraphs-edit.html',
                random=random,
                article=article)


    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)
        paragraphs = self.get_argument("paragraphs", "")
        logging.info("got paragraphs %r", paragraphs)

        # 使用 html2text 将网页内容转换为 Markdown 格式
        h = html2text.HTML2Text()
        h.ignore_links = False
        paragraphs = h.handle(paragraphs)
        logging.info("got paragraphs %r", paragraphs)

        random = random_x(8)
        logging.info("got random %r", random)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        # 修改文章段落内容
        url = "http://" + AUTH_HOST + "/blog/articles/" + article_id + "/paragraphs"
        body_data = {'paragraphs':paragraphs}
        logging.info("put body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/mine?random=' + random)


class BlogArticleParagraphMarkdownHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        article = json_decode(response.body)

        if not article.has_key('paragraphs'):
            article['paragraphs'] = ''

        self.render('blog/paragraphs-markdown.html',
                random=random,
                article=article)


    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)
        paragraphs = self.get_argument("paragraphs", "")
        logging.info("got paragraphs %r", paragraphs)

        random = random_x(8)
        logging.info("got random %r", random)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        # 修改文章段落内容
        url = "http://" + AUTH_HOST + "/blog/articles/" + article_id + "/paragraphs"
        body_data = {'paragraphs':paragraphs}
        logging.info("put body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/mine?random=' + random)


class BlogArticleParagraphAppendHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)

        random = random_x(8)
        logging.info("got random %r", random)

        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        article = json_decode(response.body)

        self.render('blog/paragraphs-append.html',
                random=random,
                article=article)


    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self, article_id):
        logging.info(self.request)
        logging.info("got article_id %r from uri", article_id)
        str_filenames = self.get_argument("filenames", "")
        logging.info("got filenames %r", str_filenames)
        paragraphs = self.get_argument("paragraphs", "")
        logging.info("got paragraphs %r", paragraphs)

        random = random_x(8)
        logging.info("got random %r", random)

        session_token = self.get_secure_cookie("session_token")
        logging.info("got session_token %r from cookie", session_token)

        # 取得文章原来段落的内容
        url = "http://"+AUTH_HOST+"/blog/articles/"+article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got article response %r", response.body)
        article = json_decode(response.body)

        # 加入新段落
        old_paragraphs = article['paragraphs']
        filenames = str_filenames.split(',')
        for filename in filenames:
            logging.info("got filename %r", filename)
            if filename:
                old_paragraphs += "![](" + filename +  ")"
        old_paragraphs += paragraphs

        # 修改文章段落内容
        url = "http://" + AUTH_HOST + "/blog/articles/" + article_id + "/paragraphs"
        body_data = {'paragraphs':old_paragraphs}
        logging.info("put body %r", body_data)
        _json = json_encode(body_data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json, headers={"Authorization":"Bearer "+session_token})
        logging.info("got token response %r", response.body)

        self.redirect('/blog/articles/' + article_id + '?random=' + random)
