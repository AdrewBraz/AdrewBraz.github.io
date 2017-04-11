var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

var people = (function(){
  var tasks = [];
  var $el = $('#tasksModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#task-template').html();
  
  $button.on('click', addTask);
  $input.keydown(function(event){
    if(event.which == 13) addTask()
  })
  $ul.delegate('i.del', 'click', deleteTask);
  
  _render();
   
  function _render(){  
    $ul.html(Mustache.render(template, {tasks: tasks}));
    events.emit("tasksChanged", tasks.length);
  };
  
  function addTask(){
    tasks.push($input.val());
    _render();
    $input.val('')
  }
  
  function deleteTask(event){
    var $remove = $(event.target).closest('li');
    var i = this.$ul.find('li').index($remove);
    
    tasks.splice(i, 1);
    _render();
  } 
  
})();

(function(){
  var tasks = 0;
  
  var $stats = $('#statsModule');
  var template = $('#stats-template').html()
  
  events.on('tasksChanged', setTasks);
  render();
  
  function render(){
    $stats.html(Mustache.render(template, {tasks: tasks}));
  }
  
  function setTasks(newTask){
    tasks = newTask;
    render();
  }
})()
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50cyA9IHtcclxuICBldmVudHM6IHt9LFxyXG4gIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xyXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XHJcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xyXG4gIH0sXHJcbiAgb2ZmOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XHJcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW1pdDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgZm4oZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnZhciBwZW9wbGUgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgdGFza3MgPSBbXTtcclxuICB2YXIgJGVsID0gJCgnI3Rhc2tzTW9kdWxlJyk7XHJcbiAgdmFyICRidXR0b24gPSAkZWwuZmluZCgnYnV0dG9uJyk7XHJcbiAgdmFyICRpbnB1dCA9ICRlbC5maW5kKCdpbnB1dCcpO1xyXG4gIHZhciAkdWwgPSAkZWwuZmluZCgndWwnKTtcclxuICB2YXIgdGVtcGxhdGUgPSAkZWwuZmluZCgnI3Rhc2stdGVtcGxhdGUnKS5odG1sKCk7XHJcbiAgXHJcbiAgJGJ1dHRvbi5vbignY2xpY2snLCBhZGRUYXNrKTtcclxuICAkaW5wdXQua2V5ZG93bihmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZihldmVudC53aGljaCA9PSAxMykgYWRkVGFzaygpXHJcbiAgfSlcclxuICAkdWwuZGVsZWdhdGUoJ2kuZGVsJywgJ2NsaWNrJywgZGVsZXRlVGFzayk7XHJcbiAgXHJcbiAgX3JlbmRlcigpO1xyXG4gICBcclxuICBmdW5jdGlvbiBfcmVuZGVyKCl7ICBcclxuICAgICR1bC5odG1sKE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwge3Rhc2tzOiB0YXNrc30pKTtcclxuICAgIGV2ZW50cy5lbWl0KFwidGFza3NDaGFuZ2VkXCIsIHRhc2tzLmxlbmd0aCk7XHJcbiAgfTtcclxuICBcclxuICBmdW5jdGlvbiBhZGRUYXNrKCl7XHJcbiAgICB0YXNrcy5wdXNoKCRpbnB1dC52YWwoKSk7XHJcbiAgICBfcmVuZGVyKCk7XHJcbiAgICAkaW5wdXQudmFsKCcnKVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBkZWxldGVUYXNrKGV2ZW50KXtcclxuICAgIHZhciAkcmVtb3ZlID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICB2YXIgaSA9IHRoaXMuJHVsLmZpbmQoJ2xpJykuaW5kZXgoJHJlbW92ZSk7XHJcbiAgICBcclxuICAgIHRhc2tzLnNwbGljZShpLCAxKTtcclxuICAgIF9yZW5kZXIoKTtcclxuICB9IFxyXG4gIFxyXG59KSgpO1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRhc2tzID0gMDtcclxuICBcclxuICB2YXIgJHN0YXRzID0gJCgnI3N0YXRzTW9kdWxlJyk7XHJcbiAgdmFyIHRlbXBsYXRlID0gJCgnI3N0YXRzLXRlbXBsYXRlJykuaHRtbCgpXHJcbiAgXHJcbiAgZXZlbnRzLm9uKCd0YXNrc0NoYW5nZWQnLCBzZXRUYXNrcyk7XHJcbiAgcmVuZGVyKCk7XHJcbiAgXHJcbiAgZnVuY3Rpb24gcmVuZGVyKCl7XHJcbiAgICAkc3RhdHMuaHRtbChNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHt0YXNrczogdGFza3N9KSk7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHNldFRhc2tzKG5ld1Rhc2spe1xyXG4gICAgdGFza3MgPSBuZXdUYXNrO1xyXG4gICAgcmVuZGVyKCk7XHJcbiAgfVxyXG59KSgpIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
