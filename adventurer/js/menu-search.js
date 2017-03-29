(function() {
    var body = document.body;
    var header = document.querySelector('.page-header');
    var Search = function(id) {

        this.search = document.getElementById(id);
        this.btn = header.querySelector('.search-btn'),
            this.searchInput = this.search.querySelector('.search-input');
        var _self = this;

        function showForm(elem) {
            elem.reset();
            elem.classList.add('visible');
            window.setTimeout(function() {
                _self.searchInput.focus()
            }, 4);
        }

        this.btn.onclick = function(e) {
            checkTarget(e, 'LI');
        }

        this.addBlur = function(elem) {
            var event = new Event('blur');
            elem.dispatchEvent(event);
            console.log(event);
            window.setTimeout(function() {
                _self.search.classList.remove('visible');
            }, 400);
        }

        this.searchInput.onblur = function() {
            _self.search.classList.remove('visible');
        }

        function checkTarget(e, tag) {
            e.preventDefault()
            var target = e.target;
            while (target != this) {
                if (target.tagName == tag) {
                    showForm(_self.search);
                    return;
                }
                target = target.parentNode;
            };
        }
    }

    var search = new Search('search');

    var Menu = function(id) {
        this.menu = document.getElementById(id);
        this.btn = header.querySelector('.btn-menu');
        this.btnClose = this.menu.querySelector('.menu__close');
        this._locked = false;

        var _self = this;

        this.lock = function() {
            if (_self._locked) {
                return false;
            }
            _self._locked = true;
            window.setTimeout(function() {
                _self._locked = false;
            }, 350);

            return true;
        };

        this.show = function(cls) {
            if (_self.lock()) {
                body.classList.add(cls);
            }
        };

        this.hide = function(cls) {
            if (_self.lock()) {
                body.classList.remove(cls);
            }
        }

        this.toggle = function(cls) {
            if (_self.lock()) {
                body.classList.toggle(cls);
            }
        }

        function isMenu(event) {
            var target = event.currentTarget;
            if (target) {
                _self.hide('is-menu-visible');
            }
        }

        this.btn.onclick = function(e) {
            e.preventDefault();
            _self.toggle('is-menu-visible');
        }


        this.btnClose.onclick = function(e) {
            e.preventDefault();
            isMenu(e);
        }
    }

    var menu = new Menu('menu');
    body.onkeydown = function(e) {
        if (e.keyCode == 27) {
            search.addBlur(search.searchInput);
            menu.hide('is-menu-visible');
        }
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtZW51LXNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyJyk7XHJcbiAgICB2YXIgU2VhcmNoID0gZnVuY3Rpb24oaWQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5idG4gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLnNlYXJjaC1idG4nKSxcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dCA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKTtcclxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93Rm9ybShlbGVtKSB7XHJcbiAgICAgICAgICAgIGVsZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYuc2VhcmNoSW5wdXQuZm9jdXMoKVxyXG4gICAgICAgICAgICB9LCA0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYnRuLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVGFyZ2V0KGUsICdMSScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRCbHVyID0gZnVuY3Rpb24oZWxlbSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2JsdXInKTtcclxuICAgICAgICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLnNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm9uYmx1ciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBfc2VsZi5zZWFyY2guY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tUYXJnZXQoZSwgdGFnKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIHdoaWxlICh0YXJnZXQgIT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09IHRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dGb3JtKF9zZWxmLnNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKCdzZWFyY2gnKTtcclxuXHJcbiAgICB2YXIgTWVudSA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdGhpcy5tZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAgIHRoaXMuYnRuID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5idG4tbWVudScpO1xyXG4gICAgICAgIHRoaXMuYnRuQ2xvc2UgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvcignLm1lbnVfX2Nsb3NlJyk7XHJcbiAgICAgICAgdGhpcy5fbG9ja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMubG9jayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoX3NlbGYuX2xvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9zZWxmLl9sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLl9sb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMzUwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGNscykge1xyXG4gICAgICAgICAgICBpZiAoX3NlbGYubG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoY2xzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKGNscykge1xyXG4gICAgICAgICAgICBpZiAoX3NlbGYubG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b2dnbGUgPSBmdW5jdGlvbihjbHMpIHtcclxuICAgICAgICAgICAgaWYgKF9zZWxmLmxvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKGNscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzTWVudShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgX3NlbGYuaGlkZSgnaXMtbWVudS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYnRuLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgX3NlbGYudG9nZ2xlKCdpcy1tZW51LXZpc2libGUnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmJ0bkNsb3NlLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaXNNZW51KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWVudSA9IG5ldyBNZW51KCdtZW51Jyk7XHJcbiAgICBib2R5Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgIHNlYXJjaC5hZGRCbHVyKHNlYXJjaC5zZWFyY2hJbnB1dCk7XHJcbiAgICAgICAgICAgIG1lbnUuaGlkZSgnaXMtbWVudS12aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyJdLCJmaWxlIjoibWVudS1zZWFyY2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
