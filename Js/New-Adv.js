



$(".agreement").click(function(){
    $(".info-new-adv").slideDown(700),
    $(".product-info").slideDown(700)
    $(".pro-img").slideDown(700)
    $(".product-info").slideDown(700)
    $(".agreement").slideUp()
    $(".pro-contact").slideDown(700)
})
$("#head-bar-click").click(function(){
    $(".side-menu-all").stop().slideDown(700);
 })
 $("#click-times").click(function(){
    $(".side-menu-all").stop().slideUp(700);
 })
 $(".category-click").click(function(){
    $(".category-down").stop().slideToggle(700);
  })
  $(".brand-click").click(function(){
    $(".brand-down").stop().slideToggle(700);
  })
  $("div#myId").dropzone({ url: "/file/post" });
  $(document).ready(function(){
    $(".dropzone").dropzone({ dictDefaultMessage: "hello" });
  });