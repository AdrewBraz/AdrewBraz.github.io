var toggler = document.getElementById('toggler');
var nav = document.querySelector('.main-nav');
var header = nav.parentElement;
var logo = document.querySelector('.page-header__logo-link');
var close = document.getElementById('close');

toggler.onclick = function(e){
  e.preventDefault();
  e.currentTarget.style.display = 'none';
  logo.style.display = 'none';
  close.style.display = 'block';
  nav.classList.add('main-nav--vertical');
}

close.onclick = function(e){
  e.preventDefault();
  e.currentTarget.style.display = 'none';
  logo.style.display = 'block';
  toggler.style.display = 'block';
  nav.classList.remove('main-nav--vertical');
}

function Slider(selector, options){
  var sliderNode = document.querySelector(selector)
  var container = sliderNode.querySelector('.slider__container');
  var elem = sliderNode.querySelector('.slider__elem');
  var prev = sliderNode.querySelector('.slider__nav-prev');
  var next = sliderNode.querySelector('.slider__nav-next');
  var pagination = sliderNode.querySelector('.slider__pagination');
  var currentSlideIndex = options.currentSlider || 0;
  var self = this;
  var totalSlides = container.children.length;
  
  prev.onclick = function(e) {
    e.preventDefault();
    self.showPrev();
    self.__render();
  };
    
  next.onclick = function(e) {
    e.preventDefault();
    self.showNext();
    self.__render();
  };
    
  pagination.onclick = function(e) {
    e.preventDefault();
    var link = e.target;
    if (link.tagName !== 'LI') { return; }
    currentSlideIndex = +link.dataset['item'];
    self.changeActive();
    self.__render();
  };

  this.showPrev = function() {
    if (currentSlideIndex === 0) {
      currentSlideIndex = totalSlides - 1;
      self.changeActive();
      return;
    }
    currentSlideIndex--;
    self.changeActive();
    };
    
  this.showNext = function() {
    if (currentSlideIndex === totalSlides - 1) {
      currentSlideIndex = 0;
      self.changeActive();
      return;
    }
      currentSlideIndex++;
      self.changeActive();
  };
    
  this.__render = function() {
      elem.style.marginLeft = -(currentSlideIndex * elem.offsetWidth) + 'px';
  };

  this.changeActive = function () {
    for (var i = 0; i < totalSlides; i++) {
      pagination.children[i].classList.remove('active');
    }
    pagination.children[currentSlideIndex].classList.add('active');
  };
    
  this.start = function(){
    setInterval(function(){
      if(document.documentElement.clientWidth > 700){
        currentSlideIndex = 0;
        self.__render();
      }
    }, 100);
  };
  
  this.paginationchange = function() {
    for (var i = 0; i < totalSlides; i++) {
      var paginationList = document.createElement('li');
      paginationList.className = 'pagination-list__item';
      paginationList.setAttribute('data-item', i);
      pagination.appendChild(paginationList);
    }
    pagination.children[currentSlideIndex].classList.add('active');
  };
  
  
  
  this.paginationchange();
  this.__render();  
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvZ2dsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlcicpO1xyXG52YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2Jyk7XHJcbnZhciBoZWFkZXIgPSBuYXYucGFyZW50RWxlbWVudDtcclxudmFyIGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2xvZ28tbGluaycpO1xyXG52YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UnKTtcclxuXHJcbnRvZ2dsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICBsb2dvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgY2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgbmF2LmNsYXNzTGlzdC5hZGQoJ21haW4tbmF2LS12ZXJ0aWNhbCcpO1xyXG59XHJcblxyXG5jbG9zZS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuY3VycmVudFRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIGxvZ28uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgdG9nZ2xlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbWFpbi1uYXYtLXZlcnRpY2FsJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNsaWRlcihzZWxlY3Rvciwgb3B0aW9ucyl7XHJcbiAgdmFyIHNsaWRlck5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG4gIHZhciBjb250YWluZXIgPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2NvbnRhaW5lcicpO1xyXG4gIHZhciBlbGVtID0gc2xpZGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19lbGVtJyk7XHJcbiAgdmFyIHByZXYgPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX25hdi1wcmV2Jyk7XHJcbiAgdmFyIG5leHQgPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX25hdi1uZXh0Jyk7XHJcbiAgdmFyIHBhZ2luYXRpb24gPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3BhZ2luYXRpb24nKTtcclxuICB2YXIgY3VycmVudFNsaWRlSW5kZXggPSBvcHRpb25zLmN1cnJlbnRTbGlkZXIgfHwgMDtcclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgdmFyIHRvdGFsU2xpZGVzID0gY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDtcclxuICBcclxuICBwcmV2Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZWxmLnNob3dQcmV2KCk7XHJcbiAgICBzZWxmLl9fcmVuZGVyKCk7XHJcbiAgfTtcclxuICAgIFxyXG4gIG5leHQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNlbGYuc2hvd05leHQoKTtcclxuICAgIHNlbGYuX19yZW5kZXIoKTtcclxuICB9O1xyXG4gICAgXHJcbiAgcGFnaW5hdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGxpbmsgPSBlLnRhcmdldDtcclxuICAgIGlmIChsaW5rLnRhZ05hbWUgIT09ICdMSScpIHsgcmV0dXJuOyB9XHJcbiAgICBjdXJyZW50U2xpZGVJbmRleCA9ICtsaW5rLmRhdGFzZXRbJ2l0ZW0nXTtcclxuICAgIHNlbGYuY2hhbmdlQWN0aXZlKCk7XHJcbiAgICBzZWxmLl9fcmVuZGVyKCk7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5zaG93UHJldiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGN1cnJlbnRTbGlkZUluZGV4ID09PSAwKSB7XHJcbiAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gdG90YWxTbGlkZXMgLSAxO1xyXG4gICAgICBzZWxmLmNoYW5nZUFjdGl2ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjdXJyZW50U2xpZGVJbmRleC0tO1xyXG4gICAgc2VsZi5jaGFuZ2VBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICBcclxuICB0aGlzLnNob3dOZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggPT09IHRvdGFsU2xpZGVzIC0gMSkge1xyXG4gICAgICBjdXJyZW50U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgIHNlbGYuY2hhbmdlQWN0aXZlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICAgY3VycmVudFNsaWRlSW5kZXgrKztcclxuICAgICAgc2VsZi5jaGFuZ2VBY3RpdmUoKTtcclxuICB9O1xyXG4gICAgXHJcbiAgdGhpcy5fX3JlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBlbGVtLnN0eWxlLm1hcmdpbkxlZnQgPSAtKGN1cnJlbnRTbGlkZUluZGV4ICogZWxlbS5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuY2hhbmdlQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFNsaWRlczsgaSsrKSB7XHJcbiAgICAgIHBhZ2luYXRpb24uY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2N1cnJlbnRTbGlkZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9O1xyXG4gICAgXHJcbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICBpZihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPiA3MDApe1xyXG4gICAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gMDtcclxuICAgICAgICBzZWxmLl9fcmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMCk7XHJcbiAgfTtcclxuICBcclxuICB0aGlzLnBhZ2luYXRpb25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxTbGlkZXM7IGkrKykge1xyXG4gICAgICB2YXIgcGFnaW5hdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICBwYWdpbmF0aW9uTGlzdC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbi1saXN0X19pdGVtJztcclxuICAgICAgcGFnaW5hdGlvbkxpc3Quc2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0nLCBpKTtcclxuICAgICAgcGFnaW5hdGlvbi5hcHBlbmRDaGlsZChwYWdpbmF0aW9uTGlzdCk7XHJcbiAgICB9XHJcbiAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2N1cnJlbnRTbGlkZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9O1xyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIHRoaXMucGFnaW5hdGlvbmNoYW5nZSgpO1xyXG4gIHRoaXMuX19yZW5kZXIoKTsgIFxyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
