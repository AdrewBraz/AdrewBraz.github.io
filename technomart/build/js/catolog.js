$(function(){function n(n){27==n.which&&$.each(a,function(){$(this).css({display:"none"})})}var i=$("#filter"),o=i.find("#brand"),c=i.find("#range"),t=i.find("#power"),l=i.find(".range-filter__wrap"),f=i.find(".brand-list"),e=i.find(".power-list"),s=1,r=$(".item-actions__buy"),u=$(".item-actions__bookmark"),a=[$(".confirm"),$(".login__popup"),$(".write-form__popup")];o.on("click",function(){f.slideToggle()}),t.on("click",function(){e.slideToggle()}),c.on("click",function(){l.slideToggle()}),$.each(r,function(){$(this).on("click",function(){$(".confirm").css({display:"block"}),$("#basket").text(s)}),$(".confirm__submit-continue").on("click",function(){$(".confirm").removeClass("confirm__popup-show")})}),$.each(u,function(){$(this).on("click",function(){$("#bookmark").html()})}),$(this).keydown(n),$("#login").on("click",function(){$(".login__popup").css({display:"block"})})});