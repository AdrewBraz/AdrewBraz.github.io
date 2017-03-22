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