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
from foo.ajax import ajax_article
from foo.blog import blog_article
from foo.blog2 import blog2_article


def map():

    config = [

        # GET: 根据 HTTP header 收集客户端相关信息：是否手机、操作系统、浏览器等信息。
        (r'/', getattr(blog_article, 'BlogArticleIndexHandler')),
        ('/writing', getattr(blog_article, 'BlogWritingHandler')),

        # auth
        ('/login', getattr(auth_account, 'AuthLoginHandler')),
        ('/logout', getattr(auth_account, 'AuthLogoutHandler')),
        ('/register', getattr(auth_account, 'AuthRegisterHandler')),
        ('/lost-pwd', getattr(auth_account, 'AuthLostPwdHandler')),
        ('/profile', getattr(auth_account, 'AuthProfileHandler')),
        ('/profile-edit', getattr(auth_account, 'AuthProfileEditHandler')),
        ('/avatar-edit', getattr(auth_account, 'AuthAvatarEditHandler')),

        ('/ajax/verify-code', getattr(ajax_auth, 'AjaxAuthVerifyCodeXHR')),

        # blog
        ('/blog/articles', getattr(blog_article, 'BlogArticleIndexHandler')),
        ('/blog/articles/create', getattr(blog_article, 'BlogArticleCreateHandler')),
        ('/blog/articles/mine', getattr(blog_article, 'BlogArticleMineHandler')),
        ('/blog/articles/([a-z0-9]*)', getattr(blog_article, 'BlogArticleHandler')),
        ('/blog/articles/([a-z0-9]*)/edit', getattr(blog_article, 'BlogArticleEditHandler')),
        ('/blog/articles/([a-z0-9]*)/paragraphs/import', getattr(blog_article, 'BlogArticleParagraphImportHandler')),
        ('/blog/articles/([a-z0-9]*)/paragraphs/edit', getattr(blog_article, 'BlogArticleParagraphEditHandler')),
        ('/blog/articles/([a-z0-9]*)/paragraphs/markdown', getattr(blog_article, 'BlogArticleParagraphMarkdownHandler')),
        ('/blog/articles/([a-z0-9]*)/paragraphs/append', getattr(blog_article, 'BlogArticleParagraphAppendHandler')),

        # blog2
        ('/blog2/articles', getattr(blog2_article, 'Blog2ArticleIndexHandler')),
        ('/blog2/articles/([a-z0-9]*)', getattr(blog2_article, 'Blog2ArticleHandler')),
        ('/blog2/articles/([a-z0-9]*)/paragraphs/append', getattr(blog2_article, 'Blog2ArticleParagraphAppendHandler')),

        # ajax
        ('/ajax/blog/accounts/([a-z0-9]*)/articles', getattr(ajax_article, 'AjaxAccountArticleXHR')),
        ('/ajax/blog/articles/([a-z0-9]*)', getattr(ajax_article, 'AjaxArticleXHR')),
        ('/ajax/blog/articles/([a-z0-9]*)/pub', getattr(ajax_article, 'AjaxArticlePubXHR')),
        ('/ajax/blog/articles', getattr(ajax_article, 'AjaxArticleIndexXHR')),
        ('/ajax/blog/articles/([a-z0-9]*)/paragraphs/append', getattr(ajax_article, 'AjaxArticleParagraphAppendHandler')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
