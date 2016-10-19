(function(){ 
  var sliderBtn1 = document.getElementById('slider-btn-1');
  var sliderBtn2 = document.getElementById('slider-btn-2');
  var sliderBtn3 = document.getElementById('slider-btn-3');
  var slide1 = document.querySelector('.services-slider__slide--1');
  var slide2 = document.querySelector('.services-slider__slide--2');
  var slide3 = document.querySelector('.services-slider__slide--3');
  var label1 = document.querySelector('.services-slider__pagination' + ' ' +'label[for = slider-btn-1]');
  var label2 = document.querySelector('.services-slider__pagination' + ' ' +'label[for = slider-btn-2]');
  var label3 = document.querySelector('.services-slider__pagination' + ' ' +'label[for = slider-btn-3]');
  var basket = document.querySelector('.basket-counter');
  var bookmark = document.querySelector('.bookmarks-counter');
  var login = document.querySelector('.page-header__log-in');
  var confirm = document.querySelector('.confirm');
  var confirmContinue = document.querySelector('.confirm__submit-continue');
  var loginPopup = document.querySelector('.login__popup');
  var cross = document.querySelector('.login__icon-cross');
  var bookmarks = document.querySelectorAll('.item-actions__bookmark');
  var buy = document.querySelectorAll('.item-actions__buy');
  var writeUs = document.querySelector('.write-form__popup');
  var writeBtn = document.querySelector('.info-contacts__btn');
  var writeBtnSubmit = document.querySelector('.write-form__submit-btn');
  var writeBtnCancel = document.querySelector('.write-form__submit-cancel');
  
  writeBtn.addEventListener('click', function(e){
    e.preventDefault();
    writeUs.classList.add('write-form__popup-show');
  })
  
  writeBtnSubmit.onclick = function(e){
    e.preventDefault();
    alert('Ваше сообщение отправлено!');
  }
  
  writeBtnCancel.onclick = function(e){
    e.preventDefault();
    writeUs.classList.remove('write-form__popup-show');
  }
  
  login.addEventListener('click', function(e){
    e.preventDefault();
    loginPopup.classList.add('login__popup-show');
  })
  
   cross.onclick = function(e){
    e.preventDefault();
    loginPopup.classList.remove('login__popup-show');
  }
   
  function buyProduct(){
    for(var i = 0; i < buy.length; i++){
      buy[i].addEventListener('click', function(e){
        e.preventDefault();
        confirm.classList.add('confirm__popup-show');
        basket.innerHTML++;
      })
    }
  }
  
  buyProduct();
  
  function bookmarkProduct(){
    for(var i = 0; i < bookmarks.length; i++){
      bookmarks[i].addEventListener('click', function(e){
        e.preventDefault();
        bookmark.innerHTML++;
      })
    }
  }
  
  bookmarkProduct();
  
  confirmContinue.onclick = function(e){
    e.preventDefault();
    confirm.classList.remove('confirm__popup-show');
  }
  
  sliderBtn1.onclick = function(e){
    e.preventDefault();
    var checked = sliderBtn1.getAttribute('checked');
    if(checked == true){
      return
    } else{
      sliderBtn2.removeAttribute('checked');
      sliderBtn3.removeAttribute('checked');
      slide1.style.display = 'block';
      slide2.style.display = 'none';
      slide3.style.display = 'none';
    }
  }

  sliderBtn2.onclick = function(e){
    e.preventDefault();
    sliderBtn1.removeAttribute('checked');
    sliderBtn3.removeAttribute('checked');
    slide1.style.display = 'none';
    slide3.style.display = 'none';
    slide2.style.display = 'block';
  }

  sliderBtn3.onclick = function(e){
    e.preventDefault();
    var checked = sliderBtn3.getAttribute('checked');
    if(checked == true){
    return
    } else{
      checked == true;
      sliderBtn1.removeAttribute('checked');
      sliderBtn2.removeAttribute('checked');
      slide1.style.display = 'none';
      slide2.style.display = 'none';
      slide3.style.display = 'block';
    }
  }
  })();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7IFxyXG4gIHZhciBzbGlkZXJCdG4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlci1idG4tMScpO1xyXG4gIHZhciBzbGlkZXJCdG4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlci1idG4tMicpO1xyXG4gIHZhciBzbGlkZXJCdG4zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlci1idG4tMycpO1xyXG4gIHZhciBzbGlkZTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtc2xpZGVyX19zbGlkZS0tMScpO1xyXG4gIHZhciBzbGlkZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtc2xpZGVyX19zbGlkZS0tMicpO1xyXG4gIHZhciBzbGlkZTMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtc2xpZGVyX19zbGlkZS0tMycpO1xyXG4gIHZhciBsYWJlbDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtc2xpZGVyX19wYWdpbmF0aW9uJyArICcgJyArJ2xhYmVsW2ZvciA9IHNsaWRlci1idG4tMV0nKTtcclxuICB2YXIgbGFiZWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlcnZpY2VzLXNsaWRlcl9fcGFnaW5hdGlvbicgKyAnICcgKydsYWJlbFtmb3IgPSBzbGlkZXItYnRuLTJdJyk7XHJcbiAgdmFyIGxhYmVsMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXJ2aWNlcy1zbGlkZXJfX3BhZ2luYXRpb24nICsgJyAnICsnbGFiZWxbZm9yID0gc2xpZGVyLWJ0bi0zXScpO1xyXG4gIHZhciBiYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFza2V0LWNvdW50ZXInKTtcclxuICB2YXIgYm9va21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzLWNvdW50ZXInKTtcclxuICB2YXIgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2xvZy1pbicpO1xyXG4gIHZhciBjb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0nKTtcclxuICB2YXIgY29uZmlybUNvbnRpbnVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm1fX3N1Ym1pdC1jb250aW51ZScpO1xyXG4gIHZhciBsb2dpblBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX19wb3B1cCcpO1xyXG4gIHZhciBjcm9zcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9faWNvbi1jcm9zcycpO1xyXG4gIHZhciBib29rbWFya3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1hY3Rpb25zX19ib29rbWFyaycpO1xyXG4gIHZhciBidXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1hY3Rpb25zX19idXknKTtcclxuICB2YXIgd3JpdGVVcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cml0ZS1mb3JtX19wb3B1cCcpO1xyXG4gIHZhciB3cml0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWNvbnRhY3RzX19idG4nKTtcclxuICB2YXIgd3JpdGVCdG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JpdGUtZm9ybV9fc3VibWl0LWJ0bicpO1xyXG4gIHZhciB3cml0ZUJ0bkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cml0ZS1mb3JtX19zdWJtaXQtY2FuY2VsJyk7XHJcbiAgXHJcbiAgd3JpdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHdyaXRlVXMuY2xhc3NMaXN0LmFkZCgnd3JpdGUtZm9ybV9fcG9wdXAtc2hvdycpO1xyXG4gIH0pXHJcbiAgXHJcbiAgd3JpdGVCdG5TdWJtaXQub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgYWxlcnQoJ9CS0LDRiNC1INGB0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3QviEnKTtcclxuICB9XHJcbiAgXHJcbiAgd3JpdGVCdG5DYW5jZWwub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgd3JpdGVVcy5jbGFzc0xpc3QucmVtb3ZlKCd3cml0ZS1mb3JtX19wb3B1cC1zaG93Jyk7XHJcbiAgfVxyXG4gIFxyXG4gIGxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsb2dpblBvcHVwLmNsYXNzTGlzdC5hZGQoJ2xvZ2luX19wb3B1cC1zaG93Jyk7XHJcbiAgfSlcclxuICBcclxuICAgY3Jvc3Mub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbG9naW5Qb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdsb2dpbl9fcG9wdXAtc2hvdycpO1xyXG4gIH1cclxuICAgXHJcbiAgZnVuY3Rpb24gYnV5UHJvZHVjdCgpe1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGJ1eS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGJ1eVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25maXJtLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm1fX3BvcHVwLXNob3cnKTtcclxuICAgICAgICBiYXNrZXQuaW5uZXJIVE1MKys7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGJ1eVByb2R1Y3QoKTtcclxuICBcclxuICBmdW5jdGlvbiBib29rbWFya1Byb2R1Y3QoKXtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBib29rbWFya3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICBib29rbWFya3NbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYm9va21hcmsuaW5uZXJIVE1MKys7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGJvb2ttYXJrUHJvZHVjdCgpO1xyXG4gIFxyXG4gIGNvbmZpcm1Db250aW51ZS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25maXJtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbmZpcm1fX3BvcHVwLXNob3cnKTtcclxuICB9XHJcbiAgXHJcbiAgc2xpZGVyQnRuMS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgY2hlY2tlZCA9IHNsaWRlckJ0bjEuZ2V0QXR0cmlidXRlKCdjaGVja2VkJyk7XHJcbiAgICBpZihjaGVja2VkID09IHRydWUpe1xyXG4gICAgICByZXR1cm5cclxuICAgIH0gZWxzZXtcclxuICAgICAgc2xpZGVyQnRuMi5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgICAgc2xpZGVyQnRuMy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgICAgc2xpZGUxLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICBzbGlkZTIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgc2xpZGUzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzbGlkZXJCdG4yLm9uY2xpY2sgPSBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNsaWRlckJ0bjEucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XHJcbiAgICBzbGlkZXJCdG4zLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xyXG4gICAgc2xpZGUxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBzbGlkZTMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHNsaWRlMi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9XHJcblxyXG4gIHNsaWRlckJ0bjMub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGNoZWNrZWQgPSBzbGlkZXJCdG4zLmdldEF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xyXG4gICAgaWYoY2hlY2tlZCA9PSB0cnVlKXtcclxuICAgIHJldHVyblxyXG4gICAgfSBlbHNle1xyXG4gICAgICBjaGVja2VkID09IHRydWU7XHJcbiAgICAgIHNsaWRlckJ0bjEucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XHJcbiAgICAgIHNsaWRlckJ0bjIucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XHJcbiAgICAgIHNsaWRlMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBzbGlkZTIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgc2xpZGUzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG4gIH1cclxuICB9KSgpOyJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
