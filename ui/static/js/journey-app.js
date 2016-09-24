// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。


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


$(function () {

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
        location.href = "/journey/paragraph-edit";
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
