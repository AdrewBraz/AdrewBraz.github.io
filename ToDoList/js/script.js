var stats = (function() {
    var tasks = 0;

    var $stats = $('#statsModule');
    var template = $('#stats-template').html()

    _render();

    function _render() {
        console.log(tasks);
        $stats.html(Mustache.render(template, { tasks: tasks }));
    }

    function setTasks(newTask) {
        tasks = newTask;
        _render();
    }

    return {
        setTasks: setTasks
    }
})();

var people = (function() {
    var tasks = [];
    var $el = $('#tasksModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#task-template').html();

    $button.on('click', addTask);
    $input.keydown(function(event) {
        if (event.which == 13) addTask()
    })
    $ul.delegate('i.del', 'click', deleteTask);

    _render();

    console.log(stats);

    function _render() {
        $ul.html(Mustache.render(template, { tasks: tasks }));
        stats.setTasks(tasks.length);
    };

    function addTask() {
        tasks.push($input.val());
        _render();
        $input.val('')
    }

    function deleteTask(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        tasks.splice(i, 1);
        _render();
    }

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHN0YXRzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhc2tzID0gMDtcclxuXHJcbiAgICB2YXIgJHN0YXRzID0gJCgnI3N0YXRzTW9kdWxlJyk7XHJcbiAgICB2YXIgdGVtcGxhdGUgPSAkKCcjc3RhdHMtdGVtcGxhdGUnKS5odG1sKClcclxuXHJcbiAgICBfcmVuZGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gX3JlbmRlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrcyk7XHJcbiAgICAgICAgJHN0YXRzLmh0bWwoTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB7IHRhc2tzOiB0YXNrcyB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0VGFza3MobmV3VGFzaykge1xyXG4gICAgICAgIHRhc2tzID0gbmV3VGFzaztcclxuICAgICAgICBfcmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZXRUYXNrczogc2V0VGFza3NcclxuICAgIH1cclxufSkoKTtcclxuXHJcbnZhciBwZW9wbGUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFza3MgPSBbXTtcclxuICAgIHZhciAkZWwgPSAkKCcjdGFza3NNb2R1bGUnKTtcclxuICAgIHZhciAkYnV0dG9uID0gJGVsLmZpbmQoJ2J1dHRvbicpO1xyXG4gICAgdmFyICRpbnB1dCA9ICRlbC5maW5kKCdpbnB1dCcpO1xyXG4gICAgdmFyICR1bCA9ICRlbC5maW5kKCd1bCcpO1xyXG4gICAgdmFyIHRlbXBsYXRlID0gJGVsLmZpbmQoJyN0YXNrLXRlbXBsYXRlJykuaHRtbCgpO1xyXG5cclxuICAgICRidXR0b24ub24oJ2NsaWNrJywgYWRkVGFzayk7XHJcbiAgICAkaW5wdXQua2V5ZG93bihmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PSAxMykgYWRkVGFzaygpXHJcbiAgICB9KVxyXG4gICAgJHVsLmRlbGVnYXRlKCdpLmRlbCcsICdjbGljaycsIGRlbGV0ZVRhc2spO1xyXG5cclxuICAgIF9yZW5kZXIoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhzdGF0cyk7XHJcblxyXG4gICAgZnVuY3Rpb24gX3JlbmRlcigpIHtcclxuICAgICAgICAkdWwuaHRtbChNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHsgdGFza3M6IHRhc2tzIH0pKTtcclxuICAgICAgICBzdGF0cy5zZXRUYXNrcyh0YXNrcy5sZW5ndGgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUYXNrKCkge1xyXG4gICAgICAgIHRhc2tzLnB1c2goJGlucHV0LnZhbCgpKTtcclxuICAgICAgICBfcmVuZGVyKCk7XHJcbiAgICAgICAgJGlucHV0LnZhbCgnJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpID0gZXZlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyICRyZW1vdmUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnbGknKTtcclxuICAgICAgICAgICAgaSA9ICR1bC5maW5kKCdsaScpLmluZGV4KCRyZW1vdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgX3JlbmRlcigpO1xyXG4gICAgfVxyXG5cclxufSkoKTsiXSwiZmlsZSI6InNjcmlwdC5qcyJ9
