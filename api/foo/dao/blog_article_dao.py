#!/usr/bin/env python
# _*_ coding: utf-8_*_
#
# Copyright 2016 7x24hs.com
# thomas@7x24hs.com
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

import logging
import pymongo
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
from comm import singleton
from global_const import *


# login options
# {'_id':'uuid', 'create_time':0, 'last_update_time':0,
# 'type':'blog|recruit|itinerary|trip|course', 'publish_time':0, 'status':'pub|draft',
# 'title':'', 'image':'url', 'desc':'content',
# 'paragraphs':''}
class blog_article_dao(singleton):
    __blog_article_collection = None;

    def __init__(self):
        if self.__blog_article_collection is None:
            conn = pymongo.MongoClient(MONGO_HOST, MONGO_PORT);
            db = conn[MONGO_DB];
            db.authenticate(MONGO_USR, MONGO_PWD);
            self.__blog_article_collection = db.blog_article;
        else:
            logging.info("blog_article_dao has inited......");


    def create(self, data):
        self.__blog_article_collection.insert(data);
        logging.info("create blog_article success......");


    def update(self, data):
        _id = data["_id"];
        self.__blog_article_collection.update({"_id":_id},{"$set":data});
        logging.info("update blog_article success......");


    def delete(self, _id):
        self.__blog_article_collection.remove({"_id":_id});
        logging.info("delete blog_article success......");


    def query_not_safe(self, _id):
        cursor = self.__blog_article_collection.find({"_id":_id})
        data = None
        for i in cursor:
            data = i
        return data


    def query(self, _id):
        data = self.query_not_safe(_id)
        if data:
            if not data.has_key('title'):
                data['title'] = ""
            if not data.has_key('image'):
                data['image'] = ""
            if not data.has_key('desc'):
                data['desc'] = ""
            if not data.has_key('status'):
                data['status'] = "draft"
            if not data.has_key('type'):
                data['type'] = "blog"
            if not data.has_key('publish_time'):
                data['publish_time'] = 0

        return data


    # 分页查询某类文章列表
    # 'type':'blog|recruit|itinerary|trip|course', 'status':'pub|draft',
    def query_pagination(self, _type, status, before, limit):
        cursor = self.__blog_article_collection.find({
                "type":_type,
                "status":status,
                "publish_time":{"$lt":before}
            }).sort("publish_time",-1).limit(limit);

        array = []
        for i in cursor:
            array.append(i)
        return array


    # 分页查询某人的文章列表
    def query_pagination_by_account(self, account_id, _type, status, before, limit):
        cursor = None
        if status == "all":
            cursor = self.__blog_article_collection.find({
                    "account_id":account_id,
                    "type":_type,
                    "publish_time":{"$lt":before}
                }).sort("publish_time",-1).limit(limit);
        else:
            cursor = self.__blog_article_collection.find({
                    "account_id":account_id,
                    "type":_type,
                    "status":status,
                    "publish_time":{"$lt":before}
                }).sort("publish_time",-1).limit(limit);

        array = []
        for i in cursor:
            array.append(i)
        return array
