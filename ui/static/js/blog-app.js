// light7 路由组件要求：
// 当通过ajax加载新页面的时候，路由器会自动忽略新页面的JS和CSS脚本。
// 所以请把全部页面的脚本都打包到入口页面。
// 在demo中我们每个页面都引用了相同的脚本，是为了在子页面刷新的时候也可以用。


$(function () {

  // 加载 page-club 时, 初始化swiper
  $(document).on("pageInit", "#page-club", function(e, id, $page) {
    $('#club-member-swiper').swiper({
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

  $(document).on("pageInit", "#page-settings", function(e, id, $page) {
    // theme
    var $dark = $("#dark-switch").on("change", function() {
      $(document.body)[$dark.is(":checked") ? "addClass" : "removeClass"]("theme-dark");
    });
  });

  // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
  $.init();
});
