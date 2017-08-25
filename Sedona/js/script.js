(function(){
  var form = document.querySelector('.search-content__form');
  var search = document.querySelector('.search-content__btn');
  var adult = document.getElementById('adult-field');
  var child = document.getElementById('child-field');
  var nav = document.querySelector('.main-nav')
  var adultElement = document.querySelector('.search-form__adult-quantity');
  var childElement = document.querySelector('.search-form__child-quantity');
  var toggle = document.getElementById('toggle');
  var close = document.getElementById('close');
  var header = document.querySelector('.page-header__logo-wrap')
  var highLimit = 10;
  var lowLimit = 0;
  
  toggle.onclick = function(event){
    event.preventDefault();
    toggle.classList.toggle('page-header__toggle--close');
    header.classList.toggle('page-header__logo-wrap--hidden');
    nav.classList.toggle('main-nav--visible');
    close.classList.toggle('close-btn--visible');
  }
    
  search.onclick = function(event){
    form.classList.toggle('search-content__form-open');
  }
  
  function Counter(elem){
    var currentcounter = 0;
    var self = this;
    
    this.plus = function(){
      currentcounter++;
      if(currentcounter > 10){
        currentcounter = 10;
        return currentcounter;
      }
      return currentcounter;
    }
    
    this.minus = function(){
      currentcounter--;
      if(currentcounter < 0){
        currentcounter = 0;
        return currentcounter;
      }
      return currentcounter;
    }
        
    
    elem.onclick = function(e){
      e.preventDefault();
      var target = e.target;
      var action = target.getAttribute('data-counter');
      if(action == 'minus'){
        target.nextElementSibling.value = self[action]();
      }
      
      if(action == 'plus'){
        target.previousElementSibling.value = self[action]();
      }
    }
  }
  
  new Counter(adultElement);
  new Counter(childElement);
  
})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWNvbnRlbnRfX2Zvcm0nKTtcclxuICB2YXIgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1jb250ZW50X19idG4nKTtcclxuICB2YXIgYWR1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWR1bHQtZmllbGQnKTtcclxuICB2YXIgY2hpbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hpbGQtZmllbGQnKTtcclxuICB2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2JylcclxuICB2YXIgYWR1bHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtX19hZHVsdC1xdWFudGl0eScpO1xyXG4gIHZhciBjaGlsZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm1fX2NoaWxkLXF1YW50aXR5Jyk7XHJcbiAgdmFyIHRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUnKTtcclxuICB2YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UnKTtcclxuICB2YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19sb2dvLXdyYXAnKVxyXG4gIHZhciBoaWdoTGltaXQgPSAxMDtcclxuICB2YXIgbG93TGltaXQgPSAwO1xyXG4gIFxyXG4gIHRvZ2dsZS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdwYWdlLWhlYWRlcl9fdG9nZ2xlLS1jbG9zZScpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3BhZ2UtaGVhZGVyX19sb2dvLXdyYXAtLWhpZGRlbicpO1xyXG4gICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbmF2LS12aXNpYmxlJyk7XHJcbiAgICBjbG9zZS5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZS1idG4tLXZpc2libGUnKTtcclxuICB9XHJcbiAgICBcclxuICBzZWFyY2gub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnc2VhcmNoLWNvbnRlbnRfX2Zvcm0tb3BlbicpO1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBDb3VudGVyKGVsZW0pe1xyXG4gICAgdmFyIGN1cnJlbnRjb3VudGVyID0gMDtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIFxyXG4gICAgdGhpcy5wbHVzID0gZnVuY3Rpb24oKXtcclxuICAgICAgY3VycmVudGNvdW50ZXIrKztcclxuICAgICAgaWYoY3VycmVudGNvdW50ZXIgPiAxMCl7XHJcbiAgICAgICAgY3VycmVudGNvdW50ZXIgPSAxMDtcclxuICAgICAgICByZXR1cm4gY3VycmVudGNvdW50ZXI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGN1cnJlbnRjb3VudGVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLm1pbnVzID0gZnVuY3Rpb24oKXtcclxuICAgICAgY3VycmVudGNvdW50ZXItLTtcclxuICAgICAgaWYoY3VycmVudGNvdW50ZXIgPCAwKXtcclxuICAgICAgICBjdXJyZW50Y291bnRlciA9IDA7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRjb3VudGVyO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjdXJyZW50Y291bnRlcjtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIFxyXG4gICAgZWxlbS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICB2YXIgYWN0aW9uID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb3VudGVyJyk7XHJcbiAgICAgIGlmKGFjdGlvbiA9PSAnbWludXMnKXtcclxuICAgICAgICB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnZhbHVlID0gc2VsZlthY3Rpb25dKCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmKGFjdGlvbiA9PSAncGx1cycpe1xyXG4gICAgICAgIHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlID0gc2VsZlthY3Rpb25dKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgbmV3IENvdW50ZXIoYWR1bHRFbGVtZW50KTtcclxuICBuZXcgQ291bnRlcihjaGlsZEVsZW1lbnQpO1xyXG4gIFxyXG59KSgpIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
