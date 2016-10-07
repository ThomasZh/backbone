// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。

$(function () {

  // 点击获取验证码按钮
  $(document).on('click','#btnLostPwd', function () {
    phone = $('#lostPhone').val();
    if (phone == null || phone == undefined || phone == '') {
      $.alert('Please input phone number');
      return false;
    }

    vcode = $('#lostVcode').val();
    if (vcode == null || vcode == undefined || vcode == '') {
      $.alert('Please input verification code');
      return false;
    }

    pwd = $('#lostPwd').val();
    if (pwd == null || pwd == undefined || pwd == '') {
      $.alert('Please input new password');
      return false;
    }

    md5pwd = hex_md5(pwd);
    $('#lostPwd').val(md5pwd);
    $('#formLostPwd').submit();
  });


  // 点击获取验证码按钮
  $(document).on('click','#btnLostCode', function () {
    var wait = 300; // 5分钟
    function time(t) {
      if (wait == 0) {
        t.removeAttribute("disabled");
        t.value = "获取验证码";
        wait = 300; // 5分钟
      } else {
        t.setAttribute("disabled", true);
        t.value = "" + wait + "s";
        wait--;
        setTimeout(function () { time(t) }, 1000)
      }
    }

    phone = $('#lostPhone').val();
    if (phone == null || phone == undefined || phone == '') {
      $.alert('Please input phone number');
      return false;
    }

    // var request = {
    //   phone: 'phone'
    // };
    // //调用了jquery.json 库
    // var encoded = $.toJSON( request );
    // var jsonStr = encoded;

    $.ajax({
      type: "POST",
      url: "/ajax/vcode",
      data: '{"phone": "' + phone + '"}',
      dataType: 'json',
      contentType: 'application/json',
      success: function(data, status, xhr) {
        // Do Anything After get Return data
        $.alert("验证码已经发送!");
        var btn = document.getElementById("btnLostCode");
        time(btn);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //alert(XMLHttpRequest.status);
        if (XMLHttpRequest.status == 200) {
          $.alert("验证码已经发送!");
          var btn = document.getElementById("btnLostCode");
          time(btn);
        } else if (XMLHttpRequest.status == 404) {
          $.alert("此手机未注册!");
        }

        //alert(XMLHttpRequest.readyState);
        // XMLHttpRequest.readyState: 状态码的意思
        // 0 － （未初始化）还没有调用send()方法
        // 1 － （载入）已调用send()方法，正在发送请求
        // 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
        // 3 － （交互）正在解析响应内容
        // 4 － （完成）响应内容解析完成，可以在客户端调用了

        //alert(textStatus);
        // 发送error可能有下面两张引起的，或者其他程序问题，需要我们认真仔细。
        // 1、data:"{}", data为空也一定要传"{}"；不然返回的是xml格式的。并提示parsererror.
        // 2、parsererror的异常和Header 类型也有关系。及编码header('Content-type: text/html; charset=utf8');
      },
      complete: function(XMLHttpRequest, textStatus) {
        this; // 调用本次AJAX请求时传递的options参数
      }
    });
  });


  // 点击退出按钮
  $(document).on('click','#btnLogout', function () {
    $('#formLogout').submit();
  });


  $(document).on("pageInit", "#page-profile-edit", function(e, id, $page) {
    var element = document.getElementById("file");
    var lastImgUrl;
    var fileCounter = 0;
    var arrayObj = new Array();

    element.addEventListener("change", uploadHandle, false);
    function uploadHandle() {
      if (fileCounter == 1) {
        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
          $('#dialog2').off('click').hide();
        });
        return false;
      }

      $('#loadingToast').show();

      var file = document.getElementById('file').files[0];
      lastImgUrl = uploadUpyun(file);
      document.getElementById('avatar').value = lastImgUrl;
      arrayObj.push(lastImgUrl);
      //document.getElementById("content").value = imgUrl;
    }

    document.addEventListener('uploaded', function(e) {
      document.getElementById('weui_uploader_files').innerHTML = '';
      inner_html = '<li class="weui_uploader_file" style="background-image:url(' + lastImgUrl + ')"></li>';
      $('#weui_uploader_files').append(inner_html);

      fileCounter++;
      $('#file_counter').html(""+fileCounter+"/1");

      $('#loadingToast').hide();
    });

    $(document).on('click','#on_submit', function () {
      $.alert("上传 " + fileCounter + " 个文件: " + arrayObj);
    });
  });


  // 点击提交编辑个人信息按钮
  $(document).on('click','#btnProfileEdit', function () {
    nickname = $('#textNickname').val();
    if (nickname == null || nickname == undefined || nickname == '') {
      $.alert('Please input nickname');
      return false;
    }

    $('#formProfileEdit').submit();
  });


  // 点击注册按钮
  $(document).on('click','#btnRegister', function () {
    phone = $('#registerPhone').val();
    if (phone == null || phone == undefined || phone == '') {
      //$('#inputPhone').attr('placeholder', 'Please input phone number');
      $.alert('Please input phone number');
      return false;
    }

    pwd = $('#registerPwd').val();
    if (pwd == null || pwd == undefined || pwd == '') {
      //$('#inputPwd').attr('placeholder', 'Please input password');
      $.alert('Please input password');
      return false;
    }

    md5pwd = hex_md5(pwd);
    $('#registerPwd').val(md5pwd);
    $('#formRegister').submit();
  });


  // 点击登录按钮
  $(document).on('click','#btnLogin', function () {
    phone = $('#loginPhone').val();
    if (phone == null || phone == undefined || phone == '') {
      //$('#inputPhone').attr('placeholder', 'Please input phone number');
      $.alert('Please input phone number');
      return false;
    }

    pwd = $('#loginPwd').val();
    if (pwd == null || pwd == undefined || pwd == '') {
      //$('#inputPwd').attr('placeholder', 'Please input password');
      $.alert('Please input password');
      return false;
    }

    md5pwd = hex_md5(pwd);
    $('#loginPwd').val(md5pwd);
    $('#formLogin').submit();
  });

  // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
  $.init();
});


function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}


function uploadUpyun(file) {
  var ext = '.' + file.name.split('.').pop();

  var config = {
    // 空间名称
    bucket : 'tripc2c-person-face',
    // 上传请求过期时间
    expiration : parseInt((new Date().getTime() + 3600000) / 1000),
    // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
    form_api_secret : 'Co1+B4OXTJakqhZzeWm3x8KMRis='
  };

  var instance = new Sand(config);
  var options = {
    'notify_url' : 'http://upyun.com'
  };
  instance.setOptions(options);

  var d = new Date();
  var month = d.getMonth() + 1;
  var filename = '/blog/' + d.getFullYear() + '/' + month + '/' + d.getDate() + '/' + uuid() + ext;
  console.log(filename);
  instance.upload(filename);

  return 'http://tripc2c-person-face.b0.upaiyun.com' + filename;
}
