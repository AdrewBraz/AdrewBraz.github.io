$(function(){!function(){var i=$("body"),n=i.find(".write"),e=i.find(".login"),o=i.find(".item-actions__buy"),s=i.find(".confirm"),t=($(".item-actions__bookmark"),i.find(".services-slider__pagination-item"));t.on("click",function(){function i(){$(this).removeClass("show"),$("#"+e).slideDown(300,function(){$(this).addClass("show")})}var n=$(this).closest(".services-slider__pagination");n.find(".services-slider__pagination-item.active").removeClass("active"),$(this).addClass("active");var e=$(this).attr("rel");$(".services-slider__slide.show").slideUp(200,i)}),i.on("click","#write",function(i){i.preventDefault(),n.addClass("write__popup")}).on("click",'[href="#writecancel"]',function(i){i.preventDefault(),n.removeClass("write__popup")}).on("keydown",function(i){27==i.which&&n.removeClass("write__popup")&&s.removeClass("confirm__popup")&&e.removeClass("login__popup")}).on("click","#login",function(){$(".login").addClass("login__popup")}).on("click","#cross",function(i){i.preventDefault(),e.removeClass("login__popup")}),$.each(o,function(){$(this).on("click",function(){s.addClass("confirm__popup")}),s.on("click",'[href="#continue"]',function(){s.removeClass("confirm__popup")})})}()}),$(function(){!function(){function i(){t.animate({"margin-left":"-="+f},_,n)}function n(){++d===a&&(d=1,t.css({"margin-left":0}))}function e(){o=setInterval(function(){i()},p)}var o,s=$(".shop-content__slider-container"),t=s.find(".slider__wrap"),c=t.find(".slider__elem"),l=s.find(".slider-nav__prev"),r=s.find(".slider-nav__next"),a=c.length,f=c.outerWidth(),_=500,p=4500,d=1;t.css({width:""+f*a}),r.on("click",i),l.on("click",i),e()}()});