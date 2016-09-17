// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。


$(function () {
  // 加载 apage-infinite-scroll-bottom.html 时初始化swiper
  //底部无限滚动
  $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
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


  //多个标签页下的无限滚动
  $(document).on("pageInit", "#page-fixed-tab-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li')[0].length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        html += '<li class="item-content""><div class="item-inner"><div class="item-title">新条目</div></div></li>';
      }
      // 添加新条目
      $('.infinite-scroll.active .list-container').append(html);
    }

    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      var tabIndex = 0;
      if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
        tabIndex = 0;
      }
      if($(this).find('.infinite-scroll.active').attr('id') == "tab3"){
        tabIndex = 1;
      }
      lastIndex = $('.list-container').eq(tabIndex).find('li').length;

      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          //$.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
          // 删除加载提示符
          $('.infinite-scroll-preloader').eq(tabIndex).hide();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex =  $('.list-container').eq(tabIndex).find('li').length;
        $.refreshScroller();
      }, 1000);
    });
  });


  // 加载 activity-info.html 时初始化swiper
  $(document).on("pageInit", "#page-activity-info", function(e, id, $page) {
    $('.swiper-container1').swiper({
      // Disable preloading of all images
      preloadImages: true,
      // Enable lazy loading
      lazyLoading: false,
      //slidesPerView: 'auto',
      slidesPerView: 8, //页面分组显示，这里8个一组
      //slidesPerViewFit: true,
      //slidesPerColumn: 8, //一列容纳8个
      //slidesPerGroup: 4,
      //centeredSlides: true,
      //paginationClickable: true,
      //spaceBetween: 30, //slide间隙
      freeMode: true,
      //grabCursor: true
    });
  });


  // 加载 wysiwyg-editor.html 时初始化富媒体编辑器
  $(document).on("pageInit", "#page-wysiwyg-editor", function(e, id, $page) {
    $('#edit')
      .on('froalaEditor.initialized', function (e, editor) {
        $('#edit').parents('form').on('submit', function () {
          var html = $('#edit').val()
          console.log(html);
          alert(html);

          if (html == null || html == undefined || html == '') {
            return false;
          } else {
            document.getElementById("content").value = html;
            document.getElementById("form1").submit();
            return true;
          }
        })
      })
    .froalaEditor({
      toolbarButtons : [ 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'subscript', 'superscript',
                        '|', 'color', 'emoticons', 'paragraphFormat', 'paragraphStyle',
                        '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                        '|', 'insertLink', 'insertTable', 'insertHR',
                        '|', 'undo', 'redo', 'clearFormatting', 'html'],
      toolbarButtonsMD: [ 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize',
                        '|', 'color', 'emoticons', 'paragraphFormat', 'paragraphStyle',
                        '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                        '|', 'insertLink', 'insertHR',
                        '|', 'undo', 'redo', 'html'],
      toolbarButtonsSM: [ 'bold', 'italic', 'underline', 'fontFamily', 'fontSize',
                        '|', 'color', 'paragraphFormat', 'align', 'formatOL', 'formatUL',
                        '|', 'insertLink',
                        '|', 'undo', 'redo', 'html'],
      toolbarButtonsXS: [ 'bold', 'fontSize', '|',
                        'color', 'paragraphFormat', 'align', 'formatUL',
                        '|', 'insertLink'],
      enter: $.FroalaEditor.ENTER_P,
      // Set the language code.
      language: 'zh_cn',
      toolbarSticky: true,
    })
  });


  // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
  $.init();
});
