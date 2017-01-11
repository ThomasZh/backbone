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
from global_const import MONGO_HOST, MONGO_PORT, MONGO_USR, MONGO_PWD


# kit(keep in touch) options
# {'_id':'uuid', 'name':'your_name', 'email':'your@email.com', 'message':'...',
#   'create_time':0}
class kit_dao(singleton):
    __kit_collection = None;

    def __init__(self):
        if self.__kit_collection is None:
            conn = pymongo.MongoClient(MONGO_HOST, MONGO_PORT);
            db = conn['7x24hs'];
            db.authenticate(MONGO_USR, MONGO_PWD);
            self.__kit_collection = db.kit;
        else:
            logging.info("kit_dao has inited......");


    def create(self, json):
        self.__kit_collection.insert(json);
        logging.info("create kit success......");


    # 分页查询
    def query_pagination(self, before, limit):
        cursor = self.__kit_collection.find({
                "create_time":{"$lt":before}}).sort("create_time",-1).limit(limit);
        array = []
        for i in cursor:
            array.append(i)
        return array


    def query(self, _id):
        cursor = self.__kit_collection.find({"_id":_id})
        data = None
        for i in cursor:
            data = i
        return data
