$(function(){
  var buy = $('.item-actions__buy');
  var bookmark = $('.item-actions__bookmark');
  var arr = [$('.confirm'), $('.login__popup'), $('.write-form__popup')];
  
  $('.services-slider__pagination-item').on('click', function(){
    var $pagination = $(this).closest('.services-slider__pagination');
    $pagination.find('.services-slider__pagination-item.active').removeClass('active');
    $(this).addClass('active')
    var blockToShow = $(this).attr('rel');
    $('.services-slider__slide.show').slideUp(200, showNextPanel);
    
    function showNextPanel() {
    $(this).removeClass('show');

    $('#'+blockToShow).slideDown(300, function() {
      $(this).addClass('show');
    });
  }
  });
  
  
  $('#write').on('click', function(e){
    e.preventDefault();
    $('.write-form__popup').css({'display': 'block'});
  })
  
  $('#write').on('click', function(e){
    e.preventDefault();
    $('.write-form__popup').css({'display': 'block'});
  })
  
  $.each(buy, function(){
    $(this).on('click', function(){
      $('.confirm').css({'display': 'block'});
      $('#basket').html();
    })
    $('.confirm__submit-continue').on('click', function(){
      $('.confirm').removeClass('confirm__popup-show');
    })
  })
  
  $.each(bookmark, function(){
    $(this).on('click', function(){
      $('#bookmark').html();
    })
  })
  
  $('#login').on('click', function(){
    $('.login__popup').css({'display': 'block'});
  })
  
  $(this).keydown(close);
  
  function close(event){
    if(event.which == 27){
      $.each(arr, function(){
        $(this).css({'display': 'none'})
      })
    }
  }
  
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGJ1eSA9ICQoJy5pdGVtLWFjdGlvbnNfX2J1eScpO1xyXG4gIHZhciBib29rbWFyayA9ICQoJy5pdGVtLWFjdGlvbnNfX2Jvb2ttYXJrJyk7XHJcbiAgdmFyIGFyciA9IFskKCcuY29uZmlybScpLCAkKCcubG9naW5fX3BvcHVwJyksICQoJy53cml0ZS1mb3JtX19wb3B1cCcpXTtcclxuICBcclxuICAkKCcuc2VydmljZXMtc2xpZGVyX19wYWdpbmF0aW9uLWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyICRwYWdpbmF0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VydmljZXMtc2xpZGVyX19wYWdpbmF0aW9uJyk7XHJcbiAgICAkcGFnaW5hdGlvbi5maW5kKCcuc2VydmljZXMtc2xpZGVyX19wYWdpbmF0aW9uLWl0ZW0uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgIHZhciBibG9ja1RvU2hvdyA9ICQodGhpcykuYXR0cigncmVsJyk7XHJcbiAgICAkKCcuc2VydmljZXMtc2xpZGVyX19zbGlkZS5zaG93Jykuc2xpZGVVcCgyMDAsIHNob3dOZXh0UGFuZWwpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzaG93TmV4dFBhbmVsKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cclxuICAgICQoJyMnK2Jsb2NrVG9TaG93KS5zbGlkZURvd24oMzAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIFxyXG4gICQoJyN3cml0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLndyaXRlLWZvcm1fX3BvcHVwJykuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcclxuICB9KVxyXG4gIFxyXG4gICQoJyN3cml0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLndyaXRlLWZvcm1fX3BvcHVwJykuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcclxuICB9KVxyXG4gIFxyXG4gICQuZWFjaChidXksIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJy5jb25maXJtJykuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcclxuICAgICAgJCgnI2Jhc2tldCcpLmh0bWwoKTtcclxuICAgIH0pXHJcbiAgICAkKCcuY29uZmlybV9fc3VibWl0LWNvbnRpbnVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCgnLmNvbmZpcm0nKS5yZW1vdmVDbGFzcygnY29uZmlybV9fcG9wdXAtc2hvdycpO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIFxyXG4gICQuZWFjaChib29rbWFyaywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCgnI2Jvb2ttYXJrJykuaHRtbCgpO1xyXG4gICAgfSlcclxuICB9KVxyXG4gIFxyXG4gICQoJyNsb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcubG9naW5fX3BvcHVwJykuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcclxuICB9KVxyXG4gIFxyXG4gICQodGhpcykua2V5ZG93bihjbG9zZSk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gY2xvc2UoZXZlbnQpe1xyXG4gICAgaWYoZXZlbnQud2hpY2ggPT0gMjcpe1xyXG4gICAgICAkLmVhY2goYXJyLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKHsnZGlzcGxheSc6ICdub25lJ30pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG59KSJdLCJmaWxlIjoicG9wdXAuanMifQ==
