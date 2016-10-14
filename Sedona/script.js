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
    header.classList.add('page-header__logo-wrap--hidden');
    nav.classList.add('main-nav--visible');
    close.classList.add('close-btn--visible');
  }
  
  close.onclick = function(event){
    event.preventDefault();
    header.classList.remove('page-header__logo-wrap--hidden');
    nav.classList.remove('main-nav--visible');
    close.classList.remove('close-btn--visible');
  }
  
  
  
  
  
  search.onclick = function(event){
    form.classList.add('search-content__form-open');
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