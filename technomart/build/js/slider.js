$(function(){
  
  var $slider = $('.slider__wrap');
  var $elem = $('.slider__elem');
  var $prev = $('.slider-nav__prev');
  var $next = $('.slider-nav__next')
  
  var items = $elem.length;
  var width = $elem.outerWidth();
  var animationSpeed = 500;
  var pause = 4500;
  var currentSlide = 1;
  var interval;
  
  
  $slider.css({'width': ''+ width*items});
  
  $next.on('click', animateNext);
  $prev.on('click', animateNext);
  
  function animateNext(){
    $slider.animate({'margin-left': '-='+width}, animationSpeed, showNext)};
  
  function showNext(){
    if(++currentSlide === items){
      currentSlide = 1; 
      $slider.css({'margin-left': 0});  
    }
  } 
  
  
                    
  function startSlider(){
   interval = setInterval(function(){
    animateNext ()}, pause)
  }
  
  function stopSlider(){
    clearInterval(interval);
  }
  
  startSlider();
  
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpe1xyXG4gIFxyXG4gIHZhciAkc2xpZGVyID0gJCgnLnNsaWRlcl9fd3JhcCcpO1xyXG4gIHZhciAkZWxlbSA9ICQoJy5zbGlkZXJfX2VsZW0nKTtcclxuICB2YXIgJHByZXYgPSAkKCcuc2xpZGVyLW5hdl9fcHJldicpO1xyXG4gIHZhciAkbmV4dCA9ICQoJy5zbGlkZXItbmF2X19uZXh0JylcclxuICBcclxuICB2YXIgaXRlbXMgPSAkZWxlbS5sZW5ndGg7XHJcbiAgdmFyIHdpZHRoID0gJGVsZW0ub3V0ZXJXaWR0aCgpO1xyXG4gIHZhciBhbmltYXRpb25TcGVlZCA9IDUwMDtcclxuICB2YXIgcGF1c2UgPSA0NTAwO1xyXG4gIHZhciBjdXJyZW50U2xpZGUgPSAxO1xyXG4gIHZhciBpbnRlcnZhbDtcclxuICBcclxuICBcclxuICAkc2xpZGVyLmNzcyh7J3dpZHRoJzogJycrIHdpZHRoKml0ZW1zfSk7XHJcbiAgXHJcbiAgJG5leHQub24oJ2NsaWNrJywgYW5pbWF0ZU5leHQpO1xyXG4gICRwcmV2Lm9uKCdjbGljaycsIGFuaW1hdGVOZXh0KTtcclxuICBcclxuICBmdW5jdGlvbiBhbmltYXRlTmV4dCgpe1xyXG4gICAgJHNsaWRlci5hbmltYXRlKHsnbWFyZ2luLWxlZnQnOiAnLT0nK3dpZHRofSwgYW5pbWF0aW9uU3BlZWQsIHNob3dOZXh0KX07XHJcbiAgXHJcbiAgZnVuY3Rpb24gc2hvd05leHQoKXtcclxuICAgIGlmKCsrY3VycmVudFNsaWRlID09PSBpdGVtcyl7XHJcbiAgICAgIGN1cnJlbnRTbGlkZSA9IDE7IFxyXG4gICAgICAkc2xpZGVyLmNzcyh7J21hcmdpbi1sZWZ0JzogMH0pOyAgXHJcbiAgICB9XHJcbiAgfSBcclxuICBcclxuICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICBmdW5jdGlvbiBzdGFydFNsaWRlcigpe1xyXG4gICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICBhbmltYXRlTmV4dCAoKX0sIHBhdXNlKVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBzdG9wU2xpZGVyKCl7XHJcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhcnRTbGlkZXIoKTtcclxuICBcclxufSk7Il0sImZpbGUiOiJzbGlkZXIuanMifQ==
