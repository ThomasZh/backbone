# backbone
使用Tornado（Python）框架搭建网站的示例。

有3个工程：7x24hs qrcode kit

7x24hs是主站，单页网站，个人信息展示，Demo: http://www.7x24hs.com

qrcode是输入URL，获取二维码，Demo: http://qrcode.7x24hs.com
提供API
http://qrcode.7x24hs.com/api/qrcode
mothed: post
body: {"url":"your_url"}
response: qrcode_url

kit是英语keep in touch的缩写，就是各站点下面联系我的发送消息，通过发送email给站长提醒
提供API
http://kit.7x24hs.com/api/kits
mothed: post
body: {"name":"your_name", "email":"your_email", "message": "your_message"}
response: SUCCESS
