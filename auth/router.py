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

import tornado.web

from foo import comm
from foo.api import api_auth


def map():

    config = [
        ('/api/token', getattr(api_auth, 'ApiAuthTokenXHR')),
        ('/api/account', getattr(api_auth, 'ApiAuthAccountXHR')),
        ('/api/vcode', getattr(api_auth, 'ApiAuthVcodeXHR')),
        ('/api/lost-pwd', getattr(api_auth, 'ApiAuthLostPwdXHR')),

        # comm
        ('.*', getattr(comm, 'PageNotFoundHandler'))

    ]

    return config
