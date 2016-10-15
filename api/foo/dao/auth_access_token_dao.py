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

import logging
import pymongo
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
from comm import singleton
from global_const import *


# login options
# {'_id':'session_token', 'create_time':0, 'last_update_time':0,
# 'account_id':'uuid'}
class auth_access_token_dao(singleton):
    __access_token_collection = None;

    def __init__(self):
        if self.__access_token_collection is None:
            conn = pymongo.MongoClient(MONGO_HOST, MONGO_PORT);
            db = conn[MONGO_DB];
            db.authenticate(MONGO_USR, MONGO_PWD);
            self.__access_token_collection = db.auth_access_token;
        else:
            logging.info("auth_access_token_dao has inited......");


    def create(self, json):
        self.__access_token_collection.insert(json);
        logging.info("create access_token success......");


    def delete(self, _id):
        self.__access_token_collection.remove({"_id":_id});
        logging.info("delete access_token success......");


    def query(self, _id):
        cursor = self.__access_token_collection.find({"_id":_id})
        data = None
        for i in cursor:
            data = i
        return data


    def query_by_refresh(self, refresh_token):
        cursor = self.__access_token_collection.find({"refresh_token":refresh_token})
        data = None
        for i in cursor:
            data = i
        return data
