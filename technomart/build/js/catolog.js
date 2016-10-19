$(function(){
  var $filter = $('#filter');
  var $brand = $filter.find('#brand');
  var $range = $filter.find('#range');
  var $power = $filter.find('#power');
  
  var $rangeList = $filter.find('.range-filter__wrap');
  var $brandList = $filter.find('.brand-list');
  var $powerList = $filter.find('.power-list');
  var counter =+1;
  var $buy = $('.item-actions__buy');
  var $bookmark = $('.item-actions__bookmark');
  var arr = [$('.confirm'), $('.login__popup'), $('.write-form__popup')];
             
  $brand.on('click', function(){
    $brandList.slideToggle()
  })
  
  $power.on('click', function(){
    $powerList.slideToggle()
  })
  
  $range.on('click', function(){
    $rangeList.slideToggle()
  })
  
  $.each($buy, function(){
    $(this).on('click', function(){
      $('.confirm').css({'display': 'block'});
      $('#basket').text(counter);
    })
    $('.confirm__submit-continue').on('click', function(){
      $('.confirm').removeClass('confirm__popup-show');
    })
  })
  
  $.each($bookmark, function(){
    $(this).on('click', function(){
      $('#bookmark').html();
    })
  })
  
  $(this).keydown(close)
  
  function close(event){
    if(event.which == 27){
      $.each(arr, function(){
        $(this).css({'display': 'none'})
      })
    }
  }
  
  $('#login').on('click', function(){
    $('.login__popup').css({'display': 'block'});
  })
  
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXRvbG9nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKXtcclxuICB2YXIgJGZpbHRlciA9ICQoJyNmaWx0ZXInKTtcclxuICB2YXIgJGJyYW5kID0gJGZpbHRlci5maW5kKCcjYnJhbmQnKTtcclxuICB2YXIgJHJhbmdlID0gJGZpbHRlci5maW5kKCcjcmFuZ2UnKTtcclxuICB2YXIgJHBvd2VyID0gJGZpbHRlci5maW5kKCcjcG93ZXInKTtcclxuICBcclxuICB2YXIgJHJhbmdlTGlzdCA9ICRmaWx0ZXIuZmluZCgnLnJhbmdlLWZpbHRlcl9fd3JhcCcpO1xyXG4gIHZhciAkYnJhbmRMaXN0ID0gJGZpbHRlci5maW5kKCcuYnJhbmQtbGlzdCcpO1xyXG4gIHZhciAkcG93ZXJMaXN0ID0gJGZpbHRlci5maW5kKCcucG93ZXItbGlzdCcpO1xyXG4gIHZhciBjb3VudGVyID0rMTtcclxuICB2YXIgJGJ1eSA9ICQoJy5pdGVtLWFjdGlvbnNfX2J1eScpO1xyXG4gIHZhciAkYm9va21hcmsgPSAkKCcuaXRlbS1hY3Rpb25zX19ib29rbWFyaycpO1xyXG4gIHZhciBhcnIgPSBbJCgnLmNvbmZpcm0nKSwgJCgnLmxvZ2luX19wb3B1cCcpLCAkKCcud3JpdGUtZm9ybV9fcG9wdXAnKV07XHJcbiAgICAgICAgICAgICBcclxuICAkYnJhbmQub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICRicmFuZExpc3Quc2xpZGVUb2dnbGUoKVxyXG4gIH0pXHJcbiAgXHJcbiAgJHBvd2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkcG93ZXJMaXN0LnNsaWRlVG9nZ2xlKClcclxuICB9KVxyXG4gIFxyXG4gICRyYW5nZS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJHJhbmdlTGlzdC5zbGlkZVRvZ2dsZSgpXHJcbiAgfSlcclxuICBcclxuICAkLmVhY2goJGJ1eSwgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCgnLmNvbmZpcm0nKS5jc3MoeydkaXNwbGF5JzogJ2Jsb2NrJ30pO1xyXG4gICAgICAkKCcjYmFza2V0JykudGV4dChjb3VudGVyKTtcclxuICAgIH0pXHJcbiAgICAkKCcuY29uZmlybV9fc3VibWl0LWNvbnRpbnVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCgnLmNvbmZpcm0nKS5yZW1vdmVDbGFzcygnY29uZmlybV9fcG9wdXAtc2hvdycpO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIFxyXG4gICQuZWFjaCgkYm9va21hcmssIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJyNib29rbWFyaycpLmh0bWwoKTtcclxuICAgIH0pXHJcbiAgfSlcclxuICBcclxuICAkKHRoaXMpLmtleWRvd24oY2xvc2UpXHJcbiAgXHJcbiAgZnVuY3Rpb24gY2xvc2UoZXZlbnQpe1xyXG4gICAgaWYoZXZlbnQud2hpY2ggPT0gMjcpe1xyXG4gICAgICAkLmVhY2goYXJyLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKHsnZGlzcGxheSc6ICdub25lJ30pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gICQoJyNsb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcubG9naW5fX3BvcHVwJykuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcclxuICB9KVxyXG4gIFxyXG59KTsiXSwiZmlsZSI6ImNhdG9sb2cuanMifQ==
