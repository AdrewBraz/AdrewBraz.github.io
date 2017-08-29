function Slider(selector, options){
  var sliderNode = document.querySelector(selector)
  var container = sliderNode.querySelector('.slider__container');
  var elem = sliderNode.querySelector('.slider__elem');
  var childs = elem.children;
  var prev = sliderNode.querySelector('.slider__nav--prev');
  var next = sliderNode.querySelector('.slider__nav--next');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gU2xpZGVyKHNlbGVjdG9yLCBvcHRpb25zKXtcclxuICB2YXIgc2xpZGVyTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbiAgdmFyIGNvbnRhaW5lciA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fY29udGFpbmVyJyk7XHJcbiAgdmFyIGVsZW0gPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2VsZW0nKTtcclxuICB2YXIgY2hpbGRzID0gZWxlbS5jaGlsZHJlbjtcclxuICB2YXIgcHJldiA9IHNsaWRlck5vZGUucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fbmF2LS1wcmV2Jyk7XHJcbiAgdmFyIG5leHQgPSBzbGlkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX25hdi0tbmV4dCcpO1xyXG4gIHZhciBwYWdpbmF0aW9uID0gc2xpZGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19wYWdpbmF0aW9uJyk7XHJcbiAgdmFyIGN1cnJlbnRTbGlkZUluZGV4ID0gb3B0aW9ucy5jdXJyZW50U2xpZGVyIHx8IDA7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHZhciB0b3RhbFNsaWRlcyA9IGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgXHJcbiAgcHJldi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2VsZi5zaG93UHJldigpO1xyXG4gICAgc2VsZi5fX3JlbmRlcigpO1xyXG4gIH07XHJcbiAgICBcclxuICBuZXh0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzZWxmLnNob3dOZXh0KCk7XHJcbiAgICBzZWxmLl9fcmVuZGVyKCk7XHJcbiAgfTtcclxuICAgIFxyXG4gIHBhZ2luYXRpb24ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBsaW5rID0gZS50YXJnZXQ7XHJcbiAgICBpZiAobGluay50YWdOYW1lICE9PSAnTEknKSB7IHJldHVybjsgfVxyXG4gICAgY3VycmVudFNsaWRlSW5kZXggPSArbGluay5kYXRhc2V0WydpdGVtJ107XHJcbiAgICBzZWxmLmNoYW5nZUFjdGl2ZSgpO1xyXG4gICAgc2VsZi5fX3JlbmRlcigpO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuc2hvd1ByZXYgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PT0gMCkge1xyXG4gICAgICBjdXJyZW50U2xpZGVJbmRleCA9IHRvdGFsU2xpZGVzIC0gMTtcclxuICAgICAgc2VsZi5jaGFuZ2VBY3RpdmUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY3VycmVudFNsaWRlSW5kZXgtLTtcclxuICAgIHNlbGYuY2hhbmdlQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgdGhpcy5zaG93TmV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGN1cnJlbnRTbGlkZUluZGV4ID09PSB0b3RhbFNsaWRlcyAtIDEpIHtcclxuICAgICAgY3VycmVudFNsaWRlSW5kZXggPSAwO1xyXG4gICAgICBzZWxmLmNoYW5nZUFjdGl2ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAgIGN1cnJlbnRTbGlkZUluZGV4Kys7XHJcbiAgICAgIHNlbGYuY2hhbmdlQWN0aXZlKCk7XHJcbiAgfTtcclxuICAgIFxyXG4gIHRoaXMuX19yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgZWxlbS5zdHlsZS5tYXJnaW5MZWZ0ID0gLShjdXJyZW50U2xpZGVJbmRleCAqIGVsZW0ub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICB9O1xyXG5cclxuICB0aGlzLmNoYW5nZUFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxTbGlkZXM7IGkrKykge1xyXG4gICAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgcGFnaW5hdGlvbi5jaGlsZHJlbltjdXJyZW50U2xpZGVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgfTtcclxuICAgIFxyXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpe1xyXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgc2VsZi5zaG93TmV4dCgpO1xyXG4gICAgICBzZWxmLl9fcmVuZGVyKCk7XHJcbiAgICB9LCA2MDAwKTtcclxuICB9O1xyXG4gIFxyXG4gIHRoaXMucGFnaW5hdGlvbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFNsaWRlczsgaSsrKSB7XHJcbiAgICAgIHZhciBwYWdpbmF0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIHBhZ2luYXRpb25MaXN0LmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uLWxpc3RfX2l0ZW0nO1xyXG4gICAgICBwYWdpbmF0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbScsIGkpO1xyXG4gICAgICBwYWdpbmF0aW9uLmFwcGVuZENoaWxkKHBhZ2luYXRpb25MaXN0KTtcclxuICAgIH1cclxuICAgIHBhZ2luYXRpb24uY2hpbGRyZW5bY3VycmVudFNsaWRlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIH07XHJcbiAgXHJcbiAgdGhpcy5wYWdpbmF0aW9uY2hhbmdlKCk7XHJcbiAgdGhpcy5fX3JlbmRlcigpOyAgXHJcbn0iXSwiZmlsZSI6InNsaWRlci5qcyJ9
