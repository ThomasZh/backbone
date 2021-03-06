// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。

$(function () {
  var random = random_x(6);


  //创建博客文章页面初始化
  $(document).on("pageInit", "#page-paragraph-append", function(e, id, page) {
    var lastImgUrl;
    var fileCounter = 0;
    var arrayObj = new Array();

    $("input[type=file]").each(function() {
      var _this = $(this);
      _this.localResizeIMG({
        width : 800,
        quality : 0.6,
        success : function(result) {
          if (fileCounter == 9) {
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
              $('#dialog2').off('click').hide();
            });
            return false;
          }
          $('#loadingToast').show();

          //获取后缀名
          var att = pre.substr(pre.lastIndexOf("."));
          //压缩后图片的base64字符串
          var base64_string = result.clearBase64;
          //console.log(base64_string);
          //图片预览
          var imgObj = $("#img");
          imgObj.attr("src", "data:image/jpeg;base64," + base64_string)                                      .show();
          //拼接data字符串，传递会后台
          var fileData = $("#fileData");
          fileData.val(att + "," + imgObj.attr("src"));
          //console.log(fileData);

          blob = dataURLtoBlob(result.base64);
          //console.log(blob);

          lastImgUrl = uploadBlogImgToUpyun(blob);
          console.log(lastImgUrl);

          arrayObj.push(lastImgUrl);
          $("#filenames").val(arrayObj);
        }
      });
    });

    document.addEventListener('uploaded', function(e) {
      //$('#weui_uploader_files').html('');
      inner_html = '<li class="weui_uploader_file" style="background-image:url(' + lastImgUrl + '!200x200)"></li>';
      $('#weui_uploader_files').append(inner_html);

      fileCounter++;
      $('#file_counter').html(""+fileCounter+"/9");

      $('#loadingToast').hide();
    });

    $(document).on('click','#OnParagraphAppendSubmit', function () {

      paragraphs = $("#paragraphs").val();
      if (paragraphs == null || paragraphs == undefined || paragraphs == '') {
        if (fileCounter == 0) {
          $.alert('请上传图片或输入描述');
          return false;
        }
      }

      $('#formParagraphAppend').submit();
    });
  });


  //文章详情页面初始化
  $(document).on("pageInit", "#page-article", function(e, id, page) {

    $('img.lazy').lazyload( {
      container: $(".content"),
      threshold: 100,                    //当图片顶部距离显示区域还有100像素时，就开始加载
      placeholder: "/static/images/grey!300x200.jpeg",      // 图片未加载时，占位
//      effect_speed: 100,                // 效果出现的时间
      effect: "fadeIn",               // 图片出现的效果，值有show(直接显示),fadeIn(淡入),slideDown(下拉)
//      event: 'touchstart',                   // 滚动滚轮时触发，可以是：click、mouseover等
//      data_attribute: 'data-original',   // img标签中保存url的自定义属性，默认：data-original
      skip_invisible: true,              // 是否跳过已经隐藏的图片（display:none）
      failure_limit: 2,                  // 由于延迟加载是根据Dom从上到下执行
                                 // 如果遇到Dom位置在上，但是图片定位在下导致看不到，那么会以为之后的图片不在应用延迟加载
                                         // 此处的failure_limit用于限制如果出现N个【Dom位置在上，但是图片定位在下】才终止
      appear: function(){                // 当图片位置刚出现在视图时，触发此事件
        $(this).attr('src');
        //$(this).attr('src', $(this).attr('data-original'));
      },
      load: function(){                  // 当图片路径加载之后，触发此事件
        $(this).attr('src');
        //$(this).attr('src', $(this).attr('data-original'));
      }

    });
  });



  //编辑段落页面(Markdown)初始化
  $(document).on("pageInit", "#page-paragraph-markdown", function(e, id, page) {
    $(document).on('click','#OnParagraphMarkdownSubmit', function () {
      var paragraphs = $("#paragraphs").val();
      if (paragraphs == null || paragraphs == undefined || paragraphs == '') {
        $.alert('请输入段落');
        return false;
      }

      $('#formParagraphMarkdown').submit();
    });
  });


  //编辑段落页面初始化
  $(document).on("pageInit", "#page-paragraph-edit", function(e, id, page) {
    Mokki.editor('.damnEditor', {
      // Costumize with custom color
      // 'colorGlobal' : '#c00'
    });

    $(document).on('click','#OnEditSubmit', function () {
      var paragraphs = $("#mokkiTextEmbed").val();
      if (paragraphs == null || paragraphs == undefined || paragraphs == '') {
        $.alert('请输入段落');
        return false;
      }

      $('#formParagraphEdit').submit();
    });
  });


  //导入段落页面初始化
  $(document).on("pageInit", "#page-article-import", function(e, id, page) {
    $(document).on('click','#OnImportSubmit', function () {
      var article_url = $("#article_url").val();
      if (article_url == null || article_url == undefined || article_url == '') {
        $.alert('请输入URL');
        return false;
      }

      $('#formArticleImport').submit();
    });
  });


  //博客文章列表(首页), 底部无限滚动
  $(document).on("pageInit", "#page-articles", function(e, id, page) {
    var random = random_x(6);
    var loading = false;
    var lastTimestamp = 0;

    function addItems(ajaxobj) {
      for (var i in ajaxobj) {
        var random = random_x(6);
        // 生成新条目的HTML
        var html = '';
        html += '<div class="weui_panel weui_panel_access" id="'+ajaxobj[i]._id+'">';
        html += '  <div class="weui_panel_hd">' + ajaxobj[i].publish_time + '</div>';
        html += '  <div class="weui_panel_bd">';
        html += '    <div class="weui_media_box weui_media_text">';
        html += '      <h4 class="weui_media_title">' + ajaxobj[i].title + '</h4>';
        html += '      <a href="/blog/articles/'+ajaxobj[i]._id+'?random='+random+'"><img src="' + ajaxobj[i].image + '!750x445" width="100%"></a>';
        html += '      <p class="weui_media_desc">' + ajaxobj[i].desc + '</p>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        // 添加新条目
        $('.infinite-scroll .bd').append(html);

        // 更新最后加载的序号
        lastTimestamp = ajaxobj[i].timestamp;
      }
    }

    // 页面初始化时，首先加载20条记录
    $.get("/ajax/blog/articles?last="+lastTimestamp+"&random="+random,function(data,status){
      if (data == null || data == undefined || data == '') {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();

        // 添加没有更多了显示
        var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
        $('.infinite-scroll .bd').append(html);

        return false;
      }

      var ajaxobj = eval("("+data+")");
      console.log("page init get " + ajaxobj.length);
      addItems(ajaxobj);
      if (ajaxobj.length < 2) {
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();

        // 添加没有更多了显示
        var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
        $('.infinite-scroll .bd').append(html);
      }
    });

    $(page).on('infinite', function() {
      var random = random_x(6);
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;

      $.get("/ajax/blog/articles?last="+lastTimestamp+"&random="+random,function(data,status){
        if (data == null || data == undefined || data == '') {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();

          // 添加没有更多了显示
          var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
          $('.infinite-scroll .bd').append(html);

          return false;
        }

        ajaxobj = eval("("+data+")");
        console.log("底部滚动 get " + ajaxobj.length);
        if (ajaxobj.length > 0) {
          addItems(ajaxobj);
        } else {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();

          // 添加没有更多了显示
          var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
          $('.infinite-scroll .bd').append(html);
        }

        // 恢复flag
        loading = false;
      });
    });
  });


  //我的博客文章列表, 底部无限滚动
  $(document).on("pageInit", "#page-my-articles", function(e, id, page) {
    var random = random_x(6);
    session_token = $("#session_token").val();
    var loading = false;
    var lastTimestamp = 0;

    function addItems(ajaxobj) {
      for (var i in ajaxobj) {
        var random = random_x(6);
        // 生成新条目的HTML
        var html = '';
        html += '<div class="weui_panel weui_panel_access" id="'+ajaxobj[i]._id+'">';
        html += '  <div class="weui_panel_hd">';
        if (ajaxobj[i].status == 'pub') {
            html += '发布: ';
        } else {
            html += '草稿: ';
        }
        html += ajaxobj[i].publish_time + '</div>';
        html += '  <div class="weui_panel_bd">';
        html += '    <div class="weui_media_box weui_media_text">';
        html += '      <h4 class="weui_media_title">' + ajaxobj[i].title + '</h4>';
        html += '      <a href="/blog/articles/'+ajaxobj[i]._id+'?random='+random+'"><img src="' + ajaxobj[i].image + '!750x445" width="100%"></a>';
        html += '      <p class="weui_media_desc">' + ajaxobj[i].desc + '</p>';
        html += '    </div>';
        html += '  </div>';
        html += '  <a value="'+ajaxobj[i]._id+'" onclick="javascript:showActionSheet(this);" class="weui_panel_ft">更多操作</a>';
        html += '</div>';

        // 添加新条目
        $('.infinite-scroll .bd').append(html);

        // 更新最后加载的序号
        lastTimestamp = ajaxobj[i].timestamp;
      }
    }

    // 页面初始化时，首先加载20条记录
    var account_id = $("#account_id").val();
    $.get("/ajax/blog/accounts/"+account_id+"/articles?last="+lastTimestamp+"&random="+random,function(data,status){
      if (data == null || data == undefined || data == '') {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();

        // 添加没有更多了显示
        var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
        $('.infinite-scroll .bd').append(html);

        return false;
      }

      var ajaxobj = eval("("+data+")");
      console.log("page init get " + ajaxobj.length);
      addItems(ajaxobj);
      if (ajaxobj.length < 2) {
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();

        // 添加没有更多了显示
        var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
        $('.infinite-scroll .bd').append(html);
      }
    });

    $(page).on('infinite', function() {
      var random = random_x(6);
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;

      $.get("/ajax/blog/accounts/"+account_id+"/articles?last="+lastTimestamp+"&random="+random,function(data,status){
        if (data == null || data == undefined || data == '') {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();

          // 添加没有更多了显示
          var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
          $('.infinite-scroll .bd').append(html);

          return false;
        }

        ajaxobj = eval("("+data+")");
        console.log("底部滚动 get " + ajaxobj.length);
        if (ajaxobj.length > 0)
          addItems(ajaxobj);
        else {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();

          // 添加没有更多了显示
          var html = '<div class="weui_cells_tips text-center">没有更多了...</div>';
          $('.infinite-scroll .bd').append(html);
        }

        // 恢复flag
        loading = false;
      });
    });
  });


  //创建博客文章页面初始化
  $(document).on("pageInit", "#page-article-create", function(e, id, page) {
    var lastImgUrl;
    var fileCounter = 0;
    var arrayObj = new Array();

    $("input[type=file]").each(function() {
      var _this = $(this);
      _this.localResizeIMG({
        width : 800,
        quality : 0.9,
        success : function(result) {
          if (fileCounter == 1) {
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
              $('#dialog2').off('click').hide();
            });
            return false;
          }
          $('#loadingToast').show();

          //获取后缀名
          var att = pre.substr(pre.lastIndexOf("."));
          //压缩后图片的base64字符串
          var base64_string = result.clearBase64;
          //console.log(base64_string);
          //图片预览
          var imgObj = $("#img");
          imgObj.attr("src", "data:image/jpeg;base64," + base64_string)                                      .show();
          //拼接data字符串，传递会后台
          var fileData = $("#fileData");
          fileData.val(att + "," + imgObj.attr("src"));
          //console.log(fileData);

          blob = dataURLtoBlob(result.base64);
          //console.log(blob);

          lastImgUrl = uploadBlogImgToUpyun(blob);
          console.log(lastImgUrl);

          $("#filename").val(lastImgUrl);
          arrayObj.push(lastImgUrl);
        }
      });
    });

    document.addEventListener('uploaded', function(e) {
      $('#weui_uploader_files').html('');
      inner_html = '<li class="weui_uploader_file" style="background-image:url(' + lastImgUrl + '!200x200)"></li>';
      $('#weui_uploader_files').append(inner_html);

      fileCounter++;
      $('#file_counter').html(""+fileCounter+"/1");

      $('#loadingToast').hide();
    });

    $(document).on('click','#on_submit', function () {
      if (fileCounter == 0) {
        // $.alert("上传 " + fileCounter + " 个文件: " + arrayObj);
        $.alert('请上传图片');
        return false;
      }

      article_title = $("#article_title").val();
      if (article_title == null || article_title == undefined || article_title == '') {
        $.alert('请输入标题');
        return false;
      }

      article_desc = $("#article_desc").val();
      if (article_desc == null || article_desc == undefined || article_desc == '') {
        $.alert('请输入描述');
        return false;
      }

      $('#formArticleCreate').submit();
    });
  });


  //编辑博客文章页面初始化
  $(document).on("pageInit", "#page-article-edit", function(e, id, page) {
    var lastImgUrl;
    var fileCounter = 0;
    var arrayObj = new Array();

    $("input[type=file]").each(function() {
      var _this = $(this);
      _this.localResizeIMG({
        width : 800,
        quality : 0.6,
        success : function(result) {
          if (fileCounter == 1) {
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
              $('#dialog2').off('click').hide();
            });
            return false;
          }
          $('#loadingToast').show();

          //获取后缀名
          var att = pre.substr(pre.lastIndexOf("."));
          //压缩后图片的base64字符串
          var base64_string = result.clearBase64;
          //console.log(base64_string);
          //图片预览
          var imgObj = $("#img");
          imgObj.attr("src", "data:image/jpeg;base64," + base64_string)                                      .show();
          //拼接data字符串，传递会后台
          var fileData = $("#fileData");
          fileData.val(att + "," + imgObj.attr("src"));
          //console.log(fileData);

          blob = dataURLtoBlob(result.base64);
          //console.log(blob);

          lastImgUrl = uploadBlogImgToUpyun(blob);
          console.log(lastImgUrl);

          $("#filename").val(lastImgUrl);
          arrayObj.push(lastImgUrl);
        }
      });
    });

    document.addEventListener('uploaded', function(e) {
      $('#weui_uploader_files').html('');
      inner_html = '<li class="weui_uploader_file" style="background-image:url(' + lastImgUrl + ')"></li>';
      $('#weui_uploader_files').append(inner_html);

      fileCounter++;
      $('#file_counter').html(""+fileCounter+"/1");

      $('#loadingToast').hide();
    });

    $(document).on('click','#OnArticleEditSubmit', function () {
      if (fileCounter == 0) {
        // $.alert("上传 " + fileCounter + " 个文件: " + arrayObj);
        $.alert('请上传图片');
        return false;
      }

      article_title = $("#article_title").val();
      if (article_title == null || article_title == undefined || article_title == '') {
        $.alert('请输入标题');
        return false;
      }

      article_desc = $("#article_desc").val();
      if (article_desc == null || article_desc == undefined || article_desc == '') {
        $.alert('请输入描述');
        return false;
      }

      $('#formArticleEdit').submit();
    });
  });


  // 点击忘记密码提交按钮
  $(document).on('click','#btnLostPwd', function () {
    phone = $('#lostPhone').val();
    if (phone == null || phone == undefined || phone == '') {
      $.alert('Please input phone number');
      return false;
    }

    verifiy_code = $('#lostVerifyCode').val();
    if (verifiy_code == null || verifiy_code == undefined || verifiy_code == '') {
      $.alert('Please input verifiy code');
      return false;
    }

    pwd = $('#lostPwd').val();
    if (pwd == null || pwd == undefined || pwd == '') {
      $.alert('Please input new password');
      return false;
    }

    md5pwd = SparkMD5.hash(pwd);
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
    // //调用 jquery.json 库
    // var encoded = $.toJSON( request );
    // var jsonStr = encoded;

    //调用 jquery.cookie 库
    //var _xsrf = $.cookie('_xsrf');

    $.ajax({
      type: "POST",
      //url: "http://api.7x24hs.com/auth/verify-code",
      //data: '{"_xsrf":"'+_xsrf+'", "appid":"APPID", "app_secret":"APP_SECRET", "phone": "' + phone + '"}',
      url: "/ajax/verify-code",
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

    md5pwd = SparkMD5.hash(pwd);
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

    md5pwd = SparkMD5.hash(pwd);
    $('#loginPwd').val(md5pwd);
    $('#formLogin').submit();
  });


  // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
  $.init();
});




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
    'notify_url' : 'http://upyun.com',
    //"allow-file-type":"jpg,jpeg,png",
    //"x-gmkerl-value": "150", /// 如需缩小功能,这必须输入(缩略图宽度/像素)
    //"x-gmkerl-quality": "95", /// 可选(图片压缩质量,默认 95)
    //"x-gmkerl-unsharp": "True", /// 可选(是否进行锐化处理,默认锐化)
    //"x-gmkerl-rotate": "auto", /// 可选(是否进行图片旋转)
    //"x-gmkerl-clip" : "800x800s300a300", /// 可选(是否进行图片裁剪)
  };
  instance.setOptions(options);

  var d = new Date();
  var month = d.getMonth() + 1;
  var filename = '/' + d.getFullYear() + '/' + month + '/' + d.getDate() + '/' + uuid() + ext;
  console.log(filename);
  instance.upload(filename);

  return 'http://tripc2c-person-face.b0.upaiyun.com' + filename;
}





////////////////////////////////////////////////////////////////////
// 文章列表页面显示弹出菜单

var session_token = $("#session_token").val();
var action_article_id; // 正在操作的文章ID
var action; // 正在操作的动作 delete|pub|edit
function showActionSheet(e) {
  article_id = $(e).attr('value');
  console.log(article_id);

  // 正在操作的文章ID
  action_article_id = article_id;

  var mask = $('#mask');
  var weuiActionsheet = $('#weui_actionsheet');
  weuiActionsheet.addClass('weui_actionsheet_toggle');
  mask.show()
    .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
    .addClass('weui_fade_toggle').one('click', function () {
    hideActionSheet(weuiActionsheet, mask);
  });
  $('#actionsheet_cancel').one('click', function () {
    hideActionSheet(weuiActionsheet, mask);
  });
  mask.unbind('transitionend').unbind('webkitTransitionEnd');

  function hideActionSheet(weuiActionsheet, mask) {
    weuiActionsheet.removeClass('weui_actionsheet_toggle');
    mask.removeClass('weui_fade_toggle');
    mask.on('transitionend', function () {
      mask.hide();
    }).on('webkitTransitionEnd', function () {
      mask.hide();
    })
  }

  $('#actionsheet_pub').one('click', function () {
    action = "pub"
    hideActionSheet(weuiActionsheet, mask);
    $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
      //$('#dialog1').off('click').hide();
    });
  });

  $('#actionsheet_paragraphs_import').one('click', function () {
    location.href = "/blog/articles/" + article_id + "/paragraphs/import?random={{ random }}";
  });

  $('#actionsheet_edit').one('click', function () {
    location.href = "/blog/articles/" + article_id + "/edit?random={{ random }}";
  });

  $('#actionsheet_paragraphs_edit').one('click', function () {
    location.href = "/blog/articles/" + article_id + "/paragraphs/edit?random={{ random }}";
  });

  $('#actionsheet_delete').one('click', function () {
    action = "delete"
    hideActionSheet(weuiActionsheet, mask);
    $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
      //$('#dialog1').off('click').hide();
    });
  });
}

function hideActionSheet(weuiActionsheet, mask) {
  weuiActionsheet.removeClass('weui_actionsheet_toggle');
  mask.removeClass('weui_fade_toggle');
  mask.on('transitionend', function () {
    mask.hide();
  }).on('webkitTransitionEnd', function () {
    mask.hide();
  })
}

function comfirmCancel() {
  var mask = $('#mask');
  var weuiActionsheet = $('#weui_actionsheet');
  $('#dialog1').off('click').hide();
  //hideActionSheet(weuiActionsheet, mask);
}

function comfirmYes() {
  if (action == "delete") {
    $.ajax({
      type: "DELETE",
      url: "/ajax/blog/articles/"+action_article_id+"?random={{ random }}",
      headers : {'Authorization':'Bearer '+session_token},
      dataType: 'json',
      contentType: 'application/json',
      success: function(data, status, xhr) {
        // Do Anything After get Return data
        var p = $("#"+action_article_id).children();
        p.remove();

        var mask = $('#mask');
        var weuiActionsheet = $('#weui_actionsheet');
        $('#dialog1').off('click').hide();
        //hideActionSheet(weuiActionsheet, mask);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status == 200){
          var p = $("#"+action_article_id).children();
          p.remove();

          var mask = $('#mask');
          var weuiActionsheet = $('#weui_actionsheet');
          $('#dialog1').off('click').hide();
          //hideActionSheet(weuiActionsheet, mask);
        } else {
          var mask = $('#mask');
          var weuiActionsheet = $('#weui_actionsheet');
          $('#dialog1').off('click').hide();
          //hideActionSheet(weuiActionsheet, mask);

          $.alert(XMLHttpRequest.status);
        }
      },
      complete: function(XMLHttpRequest, textStatus) {
        this; // 调用本次AJAX请求时传递的options参数
      }
    });
  } else if (action == "pub") {
    $.ajax({
      type: "PUT",
      url: "/ajax/blog/articles/"+action_article_id+"/pub?random={{ random }}",
      headers : {'Authorization':'Bearer '+session_token},
      dataType: 'json',
      contentType: 'application/json',
      success: function(data, status, xhr) {
        // Do Anything After get Return data
        var mask = $('#mask');
        var weuiActionsheet = $('#weui_actionsheet');
        $('#dialog1').off('click').hide();
        //hideActionSheet(weuiActionsheet, mask);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status == 200){
          var mask = $('#mask');
          var weuiActionsheet = $('#weui_actionsheet');
          $('#dialog1').off('click').hide();
          //hideActionSheet(weuiActionsheet, mask);
        } else {
          var mask = $('#mask');
          var weuiActionsheet = $('#weui_actionsheet');
          $('#dialog1').off('click').hide();
          //hideActionSheet(weuiActionsheet, mask);

          $.alert(XMLHttpRequest.status);
        }
      },
      complete: function(XMLHttpRequest, textStatus) {
        this; // 调用本次AJAX请求时传递的options参数
      }
    });
  }
}

// 文章列表页面显示弹出菜单
////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////
// 图片压缩上传,
// 引用LocalResizeIMG.js（插件主体）及mobileBUGFix.mini.js（移动端的补丁）

var pre;//源图片名称
var Orientation = null;//图片方向角

/**
 * 获得base64
 * @param {Object} obj
 * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
 * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
 * @param {Function} obj.success(obj) 处理后函数
 *
 */
$.fn.localResizeIMG = function(obj) {
  this.on('change', function() {
    var file = this.files[0];
    pre = file.name;
    var URL = window.URL || window.webkitURL;
    var blob = URL.createObjectURL(file);

    //获取照片方向角属性，用户旋转控制
    EXIF.getData(file, function() {
      //alert(EXIF.pretty(file));
      EXIF.getAllTags(file);
      Orientation = EXIF.getTag(file, 'Orientation');
      //alert(Orientation);
      //return;
    });

    // 执行前函数
    if ($.isFunction(obj.before)) {
      obj.before(this, blob, file);
    }

    _create(blob, file);
    this.value = ''; // 清空临时数据
  });

  /**
   * 生成base64
   * @param blob 通过file获得的二进制
   */
  function _create(blob, file) {
    var img = new Image();
    img.src = blob;

    img.onload = function() {
      var that = this;

      //生成比例
      var w = that.width, h = that.height, scale = w / h;
      w = obj.width || w;
      h = w / scale;

      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      $(canvas).attr({
        width : w,
        height : h
      });
      ctx.drawImage(that, 0, 0, w, h);

      /**
       * 生成base64
       * 兼容修复移动设备需要引入mobileBUGFix.js
       */
      var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.6);

      // 修复IOS
      if (navigator.userAgent.match(/iphone/i)) {
        console.log('iphone');
        //alert(w + ',' + h);
        //如果方向角不为1，都需要进行旋转
        if (Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
                //alert('需要顺时针（向左）90度旋转');
                rotateImg(this,'left',canvas);
                break;
            case 8://需要逆时针（向右）90度旋转
                //alert('需要顺时针（向右）90度旋转');
                rotateImg(this,'right',canvas);
                break;
            case 3://需要180度旋转
                //alert('需要180度旋转');
                rotateImg(this,'right',canvas);//转两次
                rotateImg(this,'right',canvas);
                break;
            default:
              //alert('未旋转处理');
              break;
          }
        }

        // var mpImg = new MegaPixImage(img);
        // mpImg.render(canvas, {
        //   maxWidth : w,
        //   maxHeight : h,
        //   quality : obj.quality || 0.8
        // });
        base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.6);
      } else if (navigator.userAgent.match(/Android/i)) { // 修复android
        var encoder = new JPEGEncoder();
        base64 = encoder.encode(ctx.getImageData(0, 0, w, h),
              obj.quality * 100 || 80);
      } else {
        //如果方向角不为1，都需要进行旋转
        if (Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
                //alert('需要顺时针（向左）90度旋转');
                rotateImg(this,'left',canvas);
                break;
            case 8://需要逆时针（向右）90度旋转
                //alert('需要顺时针（向右）90度旋转');
                rotateImg(this,'right',canvas);
                break;
            case 3://需要180度旋转
                //alert('需要180度旋转');
                rotateImg(this,'right',canvas);//转两次
                rotateImg(this,'right',canvas);
                break;
            default:
              //alert('未旋转处理');
              break;
          }
        }

        // var mpImg = new MegaPixImage(img);
        // mpImg.render(canvas, {
        //   maxWidth : w,
        //   maxHeight : h,
        //   quality : obj.quality || 0.8
        // });
        base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.6);
      }

      // 生成结果
      var result = {
        base64 : base64,
        clearBase64 : base64.substr(base64.indexOf(',') + 1)
      };

      // 执行后函数
      obj.success(result);
    };
  }
};


//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
  //alert(img);
  //最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0;
  var max_step = 3;
  //var img = document.getElementById(pid);
  if (img == null)return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  var height = img.height;
  var width = img.width;
  //var step = img.getAttribute('step');
  var step = 2;
  if (step == null) {
      step = min_step;
  }
  if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
  } else {
      step--;
      step < min_step && (step = max_step);
  }
  //img.setAttribute('step', step);
  /*var canvas = document.getElementById('pic_' + pid);
  if (canvas == null) {
      img.style.display = 'none';
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'pic_' + pid);
      img.parentNode.appendChild(canvas);
  }  */
  //旋转角度以弧度值为参数
  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext('2d');
  switch (step) {
      case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
      case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
      case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
      case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
  }
}

// image:data 转成 blob格式
function dataURLtoBlob(dataUrl) {
  var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}


// 上传blob到upyun
function uploadBlogImgToUpyun(blob) {
  var config = {
    // 空间名称
    bucket : 'bighorn',
    // 上传请求过期时间
    expiration : parseInt((new Date().getTime() + 3600000) / 1000),
    // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
    form_api_secret : 'minNcL/cabhEznMeFpYhEQFsH+k='
  };

  var instance = new Sand(config);
  var options = {
    'notify_url' : 'http://upyun.com',
    //"allow-file-type":"jpg,jpeg,png",
    //"x-gmkerl-value": "150", /// 如需缩小功能,这必须输入(缩略图宽度/像素)
    //"x-gmkerl-quality": "95", /// 可选(图片压缩质量,默认 95)
    //"x-gmkerl-unsharp": "True", /// 可选(是否进行锐化处理,默认锐化)
    //"x-gmkerl-rotate": "auto", /// 可选(是否进行图片旋转)
    //"x-gmkerl-clip" : "800x800s300a300", /// 可选(是否进行图片裁剪)
  };
  instance.setOptions(options);

  var d = new Date();
  var month = d.getMonth() + 1;
  var filename = '/blog/' + d.getFullYear() + '/' + month + '/' + d.getDate() + '/' + uuid();
  console.log(filename);
  instance.upload_blob(filename, blob);

  return 'http://bighorn.b0.upaiyun.com' + filename;
}


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

// 图片压缩上传,
// 引用LocalResizeIMG.js（插件主体）及mobileBUGFix.mini.js（移动端的补丁）
////////////////////////////////////////////////////////////////////


// 生成随机数
var random = random_x(6);
function random_x(n) {
  var num="";
  for(var i=0;i<n;i++)
  {
    num += Math.floor(Math.random()*10);
  }
  return num;
}
