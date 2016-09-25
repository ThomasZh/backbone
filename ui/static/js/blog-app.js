// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。


$(function () {

  //底部无限滚动
  $(document).on("pageInit", "#page-blog", function(e, id, page) {
    var loading = false;
    var lastTimestamp = 0;

    function addItems(ajaxobj) {
      for (var i in ajaxobj) {
        // 生成新条目的HTML
        var html = '';

        var avatar = ajaxobj[i].accountAvatarUrl;
        if (avatar == null || avatar == undefined || avatar == '') {
          avatar = "/static/images/avatar.jpg";
        } else {
          if (avatar == ' ')
            avatar = "/static/images/avatar.jpg";
        }

        var nickname = ajaxobj[i].accountNickname;
        if (nickname == null || nickname == undefined || nickname == '') {
          nickname = "anonymous";
        }
        console.log("nickname: " + nickname);

        html += '<div class="weui_panel weui_panel_access">';
        html += '  <div class="weui_panel_bd">';
        html += '    <div class="weui_media_box weui_media_text">';
        html += '      <ul class="weui_media_info">';
        html += '        <li class="weui_media_info_meta">';
        html += '          <img class="cycle" src="' + avatar + '" width="25" height="25">';
        html += '        </li>';
        html += '        <li class="weui_media_info_meta">' + nickname + '</li>';
        html += '        <li class="weui_media_info_meta">' + ajaxobj[i].publishTimestamp + '</li>';
        html += '      </ul>';
        html += '      <h4 class="weui_media_title">' + ajaxobj[i].title + '</h4>';
        html += '      <img src="' + ajaxobj[i].imgUrl + '" width="100%">';
        html += '      <p class="weui_media_desc">' + ajaxobj[i].content + '</p>';
        html += '    </div>';
        html += '  </div>';
        html += '  <a href="/blog/articles/' + ajaxobj[i].id + '" class="weui_panel_ft">阅读全文</a>';
        html += '</div>';

        // 添加新条目
        $('.infinite-scroll .bd').append(html);

        // 更新最后加载的序号
        lastTimestamp = ajaxobj[i].timestamp;
      }
    }

    // 页面初始化时，首先加载20条记录
    $.get("/api/blog/articles?last="+lastTimestamp,function(data,status){
      ajaxobj = eval("("+data+")");
      console.log("page init get " + ajaxobj.length);
      addItems(ajaxobj);
    });

    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;

      $.get("/api/blog/articles?last="+lastTimestamp,function(data,status){
        ajaxobj = eval("("+data+")");
        console.log("底部滚动 get " + ajaxobj.length);
        if (ajaxobj.length > 0)
          addItems(ajaxobj);
        else {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
        }

        // 恢复flag
        loading = false;
      });
    });
  });


  $(document).on("pageInit", "#page-rich-text-edit", function(e, id, $page) {
    var quill = new Quill('#editor', {
      modules: { toolbar: true },
      theme: 'snow'
    });

    $(document).on('click','#edit_content', function () {
      var length = quill.getLength();
      var text = quill.getText(0, length);
      //$.alert("" + length + ": " + text);

      var contents = quill.getContents();
      console.log('contents', contents);

      // var delta = quill.getContents();
      alert(document.getElementById("editor").innerHTML);
    });
  });

  $(document).on("pageInit", "#page-article-edit", function(e, id, $page) {
    $(document).on('click','#showActionSheet', function () {
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

      $('#actionsheet_edit').one('click', function () {
        location.href = "/blog/paragraph-edit";
      });

      $('#actionsheet_delete').one('click', function () {
        $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
          $('#dialog1').off('click').hide();
          hideActionSheet(weuiActionsheet, mask);
        });
      });

    });

  });


  $(document).on("pageInit", "#page-paragraph-edit", function(e, id, $page) {
    var element = document.getElementById("file");
    var lastImgUrl;
    var fileCounter = 0;
    var arrayObj = new Array();

    element.addEventListener("change", uploadHandle, false);
    function uploadHandle() {
      if (fileCounter == 2) {
        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
          $('#dialog2').off('click').hide();
        });
        return false;
      }

      $('#loadingToast').show();

      var file = document.getElementById('file').files[0];
      lastImgUrl = uploadUpyun(file);
      arrayObj.push(lastImgUrl);
      //document.getElementById("content").value = imgUrl;
    }

    document.addEventListener('uploaded', function(e) {
      inner_html = '<li class="weui_uploader_file" style="background-image:url(' + lastImgUrl + ')"></li>';
      $('#weui_uploader_files').append(inner_html);

      fileCounter++;
      $('#file_counter').html(""+fileCounter+"/2");

      $('#loadingToast').hide();
    });

    $(document).on('click','#on_submit', function () {
      $.alert("上传 " + fileCounter + " 个文件: " + arrayObj);
    });
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
    bucket : 'bike-forever',
    // 上传请求过期时间
    expiration : parseInt((new Date().getTime() + 3600000) / 1000),
    // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
    form_api_secret : 'c3sWvWKcyWo06nKPPcazKT/R4H8='
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

  return 'http://bike-forever.b0.upaiyun.com' + filename;
}
