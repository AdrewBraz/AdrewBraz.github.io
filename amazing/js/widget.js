$(function(){var o=$("body"),t=o.innerWidth(),e=o.find("#vimeo"),i=o.find("#ajax-btn");i.on("click",function(o){function i(o){e.html(o.html).addClass("col-xs-12 col-md-6 col-md-offset-3 clearfix").toggleClass("show-block")}if(o.preventDefault(),t<768)var m="https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/106535324/&maxwidth=300&maxheight=400&";else m="https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/106535324";$.getJSON(m,i)})});