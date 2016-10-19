function Slider(selector, options){
  var sliderNode = document.querySelector(selector)
  var container = sliderNode.querySelector('.slider__container');
  var elem = sliderNode.querySelector('.slider__elem');
  var childs = elem.children;
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
      self.showNext();
      self.__render();
    }, 6000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gU2xpZGVyKHNlbGVjdG9yLCBvcHRpb25zKXtcclxuICB2YXIgc2xpZGVyTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbiAgdmFyIGNvbnRhaW5lciA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fY29udGFpbmVyJyk7XHJcbiAgdmFyIGVsZW0gPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2VsZW0nKTtcclxuICB2YXIgY2hpbGRzID0gZWxlbS5jaGlsZHJlbjtcclxuICB2YXIgcHJldiA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fbmF2LXByZXYnKTtcclxuICB2YXIgbmV4dCA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fbmF2LW5leHQnKTtcclxuICB2YXIgcGFnaW5hdGlvbiA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fcGFnaW5hdGlvbicpO1xyXG4gIHZhciBjdXJyZW50U2xpZGVJbmRleCA9IG9wdGlvbnMuY3VycmVudFNsaWRlciB8fCAwO1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB2YXIgdG90YWxTbGlkZXMgPSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gIFxyXG4gIHByZXYub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNlbGYuc2hvd1ByZXYoKTtcclxuICAgIHNlbGYuX19yZW5kZXIoKTtcclxuICB9O1xyXG4gICAgXHJcbiAgbmV4dC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2VsZi5zaG93TmV4dCgpO1xyXG4gICAgc2VsZi5fX3JlbmRlcigpO1xyXG4gIH07XHJcbiAgICBcclxuICBwYWdpbmF0aW9uLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbGluayA9IGUudGFyZ2V0O1xyXG4gICAgaWYgKGxpbmsudGFnTmFtZSAhPT0gJ0xJJykgeyByZXR1cm47IH1cclxuICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gK2xpbmsuZGF0YXNldFsnaXRlbSddO1xyXG4gICAgc2VsZi5jaGFuZ2VBY3RpdmUoKTtcclxuICAgIHNlbGYuX19yZW5kZXIoKTtcclxuICB9O1xyXG5cclxuICB0aGlzLnNob3dQcmV2ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggPT09IDApIHtcclxuICAgICAgY3VycmVudFNsaWRlSW5kZXggPSB0b3RhbFNsaWRlcyAtIDE7XHJcbiAgICAgIHNlbGYuY2hhbmdlQWN0aXZlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGN1cnJlbnRTbGlkZUluZGV4LS07XHJcbiAgICBzZWxmLmNoYW5nZUFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gIHRoaXMuc2hvd05leHQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PT0gdG90YWxTbGlkZXMgLSAxKSB7XHJcbiAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gMDtcclxuICAgICAgc2VsZi5jaGFuZ2VBY3RpdmUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgICBjdXJyZW50U2xpZGVJbmRleCsrO1xyXG4gICAgICBzZWxmLmNoYW5nZUFjdGl2ZSgpO1xyXG4gIH07XHJcbiAgICBcclxuICB0aGlzLl9fcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVsZW0uc3R5bGUubWFyZ2luTGVmdCA9IC0oY3VycmVudFNsaWRlSW5kZXggKiBlbGVtLm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5jaGFuZ2VBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsU2xpZGVzOyBpKyspIHtcclxuICAgICAgcGFnaW5hdGlvbi5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICAgIHBhZ2luYXRpb24uY2hpbGRyZW5bY3VycmVudFNsaWRlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIH07XHJcbiAgICBcclxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNlbGYuc2hvd05leHQoKTtcclxuICAgICAgc2VsZi5fX3JlbmRlcigpO1xyXG4gICAgfSwgNjAwMCk7XHJcbiAgfTtcclxuICBcclxuICB0aGlzLnBhZ2luYXRpb25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxTbGlkZXM7IGkrKykge1xyXG4gICAgICB2YXIgcGFnaW5hdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICBwYWdpbmF0aW9uTGlzdC5jbGFzc05hbWUgPSAncGFnaW5hdGlvbi1saXN0X19pdGVtJztcclxuICAgICAgcGFnaW5hdGlvbkxpc3Quc2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0nLCBpKTtcclxuICAgICAgcGFnaW5hdGlvbi5hcHBlbmRDaGlsZChwYWdpbmF0aW9uTGlzdCk7XHJcbiAgICB9XHJcbiAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2N1cnJlbnRTbGlkZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9O1xyXG4gIFxyXG4gIHRoaXMucGFnaW5hdGlvbmNoYW5nZSgpO1xyXG4gIHRoaXMuX19yZW5kZXIoKTsgIFxyXG59Il0sImZpbGUiOiJzbGlkZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
