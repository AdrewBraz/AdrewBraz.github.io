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