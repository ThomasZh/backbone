// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。


$(function () {

  //底部无限滚动
  $(document).on("pageInit", "#page-activitys", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 1;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        html += '<li>';
        html += '<div class="card demo-card-header-pic">';
        html += ' <div valign="bottom" class="card-header color-white no-border no-padding">';
        html += '    <img class="card-cover" src="/static/images/img06.jpg" alt="">';
        html += '  </div>';
        html += '  <div class="card-content">';
        html += '    <div class="card-content-inner">';
        html += '      <p class="color-gray">活动开始于 2016/10/15</p>';
        html += '      <p>西藏，是远方，更是故乡(一年内两次进藏，1W+)</p>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="card-footer">';
        html += '    <a href="#" class="icon icon-friends link">15</a>';
        html += '    <a href="#" class="link" id="create-actions">更多</a>';
        html += '  </div>';
        html += '</div> <!-- card -->';
        html += '</li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }

    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  });

  //底部无限滚动
  $(document).on("pageInit", "#page-routers", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 1;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        html += '<li>';
        html += '<div class="card facebook-card">';
        html += '  <div class="card-header">';
        html += '    <div class="facebook-avatar"><img src="/static/images/avatar.jpg" width="34" height="34"></div>';
        html += '    <div class="facebook-name">夜萧</div>';
        html += '    <div class="facebook-date">星期一 3:47pm</div>';
        html += '  </div>';
        html += '  <div class="card-content">';
        html += '    <div class="content-block">';
        html += '      <div class="row">';
        html += '        <div class="col-100">';
        html += '          <dl>';
        html += '            <dt><img src="/static/images/img07.jpg" width="100%"></dt>';
        html += '          </dl>';
        html += '        </div>';
        html += '      </div>';
        html += '      <div class="row">';
        html += '        <div class="col-100">';
        html += '        2015年09月20日，我向自己预约了这篇游记，当时我说： 10月的某天-10月的某天， 我计划去 黄山 ， 出发前，我敲下了这些文字： 就这样吧 牛背山 + 泸沽湖 的游记';
        html += '        </div>';
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="card-footer">';
        html += '    <a href="#" class="link"><span class="icon icon-emoji"> 15</span></a>';
        html += '    <a href="#" class="link"><span class="icon icon-message"> 6</span></a>';
        html += '    <a href="#" class="link"><span class="icon icon-cart"> 8</span></a>';
        html += '  </div>';
        html += '</div> <!-- card -->';
        html += '</li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }

    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  });

  $(document).on('click','#create-actions', function () {
    var buttons1 = [
      {
        text: '请选择',
        label: true
      },
      {
        text: '报名',
        bold: true,
        color: 'danger',
        onClick: function() {
          $.alert("你选择了“报名“");
        }
      },
      {
        text: '分享',
        onClick: function() {
          $.alert("你选择了“分享“");
        }
      }
    ];
    var buttons2 = [
      {
        text: '取消',
        bg: 'danger'
      }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);
  });

  // theme
  var $dark = $("#dark-switch").on("change", function() {
    $(document.body)[$dark.is(":checked") ? "addClass" : "removeClass"]("theme-dark");
  });

  // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
  $.init();
});
