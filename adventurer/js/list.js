function List(options){
  var elem = options.elem;
  
  elem.onmousedown = function(){
    return false;
  }
  
  elem.onclick = function(e){
    var target = e.target;
    while(target != this){
      if(target.tagName == 'BUTTON'){
        toggle(target);
        textToggle(target);
        return
      }
      target = target.parentNode;  
    }
  }
  
  function toggle(target){
    target.classList.toggle('list-item__btn-close')
  }
  
  function textToggle(target){
    var parent = target.parentNode;
    var text = parent.nextElementSibling;
    text.classList.toggle('hide');
    parent.classList.toggle('list-item__wrap--open');
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIExpc3Qob3B0aW9ucyl7XHJcbiAgdmFyIGVsZW0gPSBvcHRpb25zLmVsZW07XHJcbiAgXHJcbiAgZWxlbS5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIFxyXG4gIGVsZW0ub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgd2hpbGUodGFyZ2V0ICE9IHRoaXMpe1xyXG4gICAgICBpZih0YXJnZXQudGFnTmFtZSA9PSAnQlVUVE9OJyl7XHJcbiAgICAgICAgdG9nZ2xlKHRhcmdldCk7XHJcbiAgICAgICAgdGV4dFRvZ2dsZSh0YXJnZXQpO1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlOyAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHRvZ2dsZSh0YXJnZXQpe1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtaXRlbV9fYnRuLWNsb3NlJylcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gdGV4dFRvZ2dsZSh0YXJnZXQpe1xyXG4gICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgdmFyIHRleHQgPSBwYXJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgdGV4dC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC1pdGVtX193cmFwLS1vcGVuJyk7XHJcbiAgfVxyXG59Il0sImZpbGUiOiJsaXN0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
