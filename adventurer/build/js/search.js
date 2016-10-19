$(function(){
  var $body = $('body'),
      $search = $('#search'),
      $searchInput = $search.find('input'),
      $menu = $('#menu');
      
  
  //search
  $body.on('click', '[href="#search"]', function(e){
    e.preventDefault();
    if(!$search.hasClass('visible')){
      $search[0].reset();
      $search.addClass('visible');
      $searchInput.focus();
    }
  })
  
  
  $searchInput
    .on('keydown', function(e){
      if(e.keyCode == 27) $searchInput.blur();
    })
   .on('blur', function() {
		window.setTimeout(function() {
		  $search.removeClass('visible');
		}, 100);
    });
  
  //MENU
  
  $menu._locked = false;
  
  $menu._lock = function(){
    if($menu._locked)
      return false;
    $menu._locked = true;
    
    window.setTimeout(function() {
					$menu._locked = false;
				}, 350);
    
    return true;
  }
  
  $menu._show = function(){
    if($menu._lock()){
      $body.addClass('is-menu-visible')
    };
  }
    
  $menu._hide = function(){
    if($menu._lock()){
      $body.removeClass('is-menu-visible')
    };  
  }
  
  $menu._toggle = function(){
    if($menu._lock()){
      $body.toggleClass('is-menu-visible')
    };
  }
    
  $menu
       .appendTo($body)
  
       .on('click', '.menu__close', function(e){
         e.stopPropagation();
         $menu._hide();
      })  
    
       .find('.menu__inner')
         .on('click', '.menu__close', function(e){
           e.preventDefault;
           e.stopPropagation;
           e.stopImmediatePropagation;
         
           $menu._hide();
       })
    
       .on('click', function(event) {
		  event.stopPropagation();
       })
       
       .on('click', 'a', function(event) {
		  var href = $(this).attr('href');
		    event.preventDefault();
		    event.stopPropagation();
				
            $menu._hide();

            window.setTimeout(function() {
				window.location.href = href;
		    }, 350);

		});
  
  $body
    .on('click', '[href="#menu"]', function(e){
      e.stopPropagation();
      e.preventDefault();
    
      $menu._toggle();
    })
    
    .on('keydown', function(event){
      if(event.keyCode == 27){
        $menu._hide();
      }
  });
  
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpe1xyXG4gIHZhciAkYm9keSA9ICQoJ2JvZHknKSxcclxuICAgICAgJHNlYXJjaCA9ICQoJyNzZWFyY2gnKSxcclxuICAgICAgJHNlYXJjaElucHV0ID0gJHNlYXJjaC5maW5kKCdpbnB1dCcpLFxyXG4gICAgICAkbWVudSA9ICQoJyNtZW51Jyk7XHJcbiAgICAgIFxyXG4gIFxyXG4gIC8vc2VhcmNoXHJcbiAgJGJvZHkub24oJ2NsaWNrJywgJ1tocmVmPVwiI3NlYXJjaFwiXScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoISRzZWFyY2guaGFzQ2xhc3MoJ3Zpc2libGUnKSl7XHJcbiAgICAgICRzZWFyY2hbMF0ucmVzZXQoKTtcclxuICAgICAgJHNlYXJjaC5hZGRDbGFzcygndmlzaWJsZScpO1xyXG4gICAgICAkc2VhcmNoSW5wdXQuZm9jdXMoKTtcclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIFxyXG4gICRzZWFyY2hJbnB1dFxyXG4gICAgLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGlmKGUua2V5Q29kZSA9PSAyNykgJHNlYXJjaElucHV0LmJsdXIoKTtcclxuICAgIH0pXHJcbiAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHQgICRzZWFyY2gucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcclxuXHRcdH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICBcclxuICAvL01FTlVcclxuICBcclxuICAkbWVudS5fbG9ja2VkID0gZmFsc2U7XHJcbiAgXHJcbiAgJG1lbnUuX2xvY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYoJG1lbnUuX2xvY2tlZClcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgJG1lbnUuX2xvY2tlZCA9IHRydWU7XHJcbiAgICBcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JG1lbnUuX2xvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH0sIDM1MCk7XHJcbiAgICBcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBcclxuICAkbWVudS5fc2hvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkbWVudS5fbG9jaygpKXtcclxuICAgICAgJGJvZHkuYWRkQ2xhc3MoJ2lzLW1lbnUtdmlzaWJsZScpXHJcbiAgICB9O1xyXG4gIH1cclxuICAgIFxyXG4gICRtZW51Ll9oaWRlID0gZnVuY3Rpb24oKXtcclxuICAgIGlmKCRtZW51Ll9sb2NrKCkpe1xyXG4gICAgICAkYm9keS5yZW1vdmVDbGFzcygnaXMtbWVudS12aXNpYmxlJylcclxuICAgIH07ICBcclxuICB9XHJcbiAgXHJcbiAgJG1lbnUuX3RvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkbWVudS5fbG9jaygpKXtcclxuICAgICAgJGJvZHkudG9nZ2xlQ2xhc3MoJ2lzLW1lbnUtdmlzaWJsZScpXHJcbiAgICB9O1xyXG4gIH1cclxuICAgIFxyXG4gICRtZW51XHJcbiAgICAgICAuYXBwZW5kVG8oJGJvZHkpXHJcbiAgXHJcbiAgICAgICAub24oJ2NsaWNrJywgJy5tZW51X19jbG9zZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAkbWVudS5faGlkZSgpO1xyXG4gICAgICB9KSAgXHJcbiAgICBcclxuICAgICAgIC5maW5kKCcubWVudV9faW5uZXInKVxyXG4gICAgICAgICAub24oJ2NsaWNrJywgJy5tZW51X19jbG9zZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgIGUucHJldmVudERlZmF1bHQ7XHJcbiAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb247XHJcbiAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb247XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICRtZW51Ll9oaWRlKCk7XHJcbiAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICB9KVxyXG4gICAgICAgXHJcbiAgICAgICAub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cdFx0ICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHJcbiAgICAgICAgICAgICRtZW51Ll9oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcblx0XHQgICAgfSwgMzUwKTtcclxuXHJcblx0XHR9KTtcclxuICBcclxuICAkYm9keVxyXG4gICAgLm9uKCdjbGljaycsICdbaHJlZj1cIiNtZW51XCJdJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgICAkbWVudS5fdG9nZ2xlKCk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gMjcpe1xyXG4gICAgICAgICRtZW51Ll9oaWRlKCk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuICBcclxufSkiXSwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
