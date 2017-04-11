function List(options) {
    var elem = options.elem;

    elem.onmousedown = function() {
        return false;
    }

    elem.onclick = function(e) {
        var target = e.target;
        console.log(this);
        while (target != this) {
            if (target.tagName == 'BUTTON') {
                toggle(target);
                textToggle(target);
                return
            }
            target = target.parentNode;
        }
    }

    function toggle(target) {
        target.classList.toggle('list-item__btn-close')
    }

    function textToggle(target) {
        var parent = target.parentNode;
        var text = parent.nextElementSibling;
        text.classList.toggle('hide');
        parent.classList.toggle('list-item__wrap--open');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIExpc3Qob3B0aW9ucykge1xyXG4gICAgdmFyIGVsZW0gPSBvcHRpb25zLmVsZW07XHJcblxyXG4gICAgZWxlbS5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT0gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFRvZ2dsZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZSh0YXJnZXQpIHtcclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC1pdGVtX19idG4tY2xvc2UnKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRleHRUb2dnbGUodGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gcGFyZW50Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICB0ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcclxuICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC1pdGVtX193cmFwLS1vcGVuJyk7XHJcbiAgICB9XHJcbn0iXSwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
