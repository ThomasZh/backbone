// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。

$(function () {

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
