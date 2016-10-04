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
# {'_id':'phone', 'md5pwd':pwd, 'salt':'salt', 'create_time':0, 'last_update_time':0}
class auth_login_dao(singleton):
    __login_collection = None;

    def __init__(self):
        if self.__login_collection is None:
            conn = pymongo.MongoClient(MONGO_HOST, MONGO_PORT);
            db = conn[MONGO_DB];
            db.authenticate(MONGO_USR, MONGO_PWD);
            self.__login_collection = db.auth_login;
        else:
            logging.info("auth_login_dao has inited......");


    def create(self, json):
        self.__login_collection.insert(json);
        logging.info("create auth_login success......");


    def query_not_safe(self, login):
        cursor = self.__login_collection.find({"_id":login})
        data = None
        for i in cursor:
            data = i
        return data
