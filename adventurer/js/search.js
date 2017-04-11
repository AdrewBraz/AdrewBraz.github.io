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



// .on('click', 'a', function(event) {
//     var href = $(this).attr('href');
//     event.preventDefault();
//     event.stopPropagation();

//     $menu._hide();

//     window.setTimeout(function() {
//         window.location.href = href;
//     }, 350);

// });

// $body
//     .on('click', '[href="#menu"]', function(e) {
//         e.stopPropagation();
//         e.preventDefault();

//         $menu._toggle();
//     })

// .on('keydown', function(event) {
//     if (event.keyCode == 27) {
//         $menu._hide();
//     }
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgdmFyIGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcicpO1xyXG4gICAgdmFyIFNlYXJjaCA9IGZ1bmN0aW9uKGlkKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAgIHRoaXMuYnRuID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYnRuJyksXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSB0aGlzLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0Zvcm0oZWxlbSkge1xyXG4gICAgICAgICAgICBlbGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLnNlYXJjaElucHV0LmZvY3VzKClcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBjaGVja1RhcmdldChlLCAnTEknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQmx1ciA9IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdibHVyJyk7XHJcbiAgICAgICAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zZWFyY2guY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5vbmJsdXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgX3NlbGYuc2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVGFyZ2V0KGUsIHRhZykge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICB3aGlsZSAodGFyZ2V0ICE9IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSB0YWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93Rm9ybShfc2VsZi5zZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCgnc2VhcmNoJyk7XHJcblxyXG4gICAgdmFyIE1lbnUgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHRoaXMubWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLmJ0biA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuYnRuLW1lbnUnKTtcclxuICAgICAgICB0aGlzLmJ0bkNsb3NlID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19jbG9zZScpO1xyXG4gICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKF9zZWxmLl9sb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfc2VsZi5fbG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5fbG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDM1MCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbihjbHMpIHtcclxuICAgICAgICAgICAgaWYgKF9zZWxmLmxvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKGNscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbihjbHMpIHtcclxuICAgICAgICAgICAgaWYgKF9zZWxmLmxvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlID0gZnVuY3Rpb24oY2xzKSB7XHJcbiAgICAgICAgICAgIGlmIChfc2VsZi5sb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShjbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc01lbnUoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLmhpZGUoJ2lzLW1lbnUtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIF9zZWxmLnRvZ2dsZSgnaXMtbWVudS12aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5idG5DbG9zZS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlzTWVudShlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1lbnUgPSBuZXcgTWVudSgnbWVudScpO1xyXG4gICAgYm9keS5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICBzZWFyY2guYWRkQmx1cihzZWFyY2guc2VhcmNoSW5wdXQpO1xyXG4gICAgICAgICAgICBtZW51LmhpZGUoJ2lzLW1lbnUtdmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcblxyXG5cclxuLy8gLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuLy8gICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbi8vICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4vLyAgICAgJG1lbnUuX2hpZGUoKTtcclxuXHJcbi8vICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcbi8vICAgICB9LCAzNTApO1xyXG5cclxuLy8gfSk7XHJcblxyXG4vLyAkYm9keVxyXG4vLyAgICAgLm9uKCdjbGljaycsICdbaHJlZj1cIiNtZW51XCJdJywgZnVuY3Rpb24oZSkge1xyXG4vLyAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbi8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuLy8gICAgICAgICAkbWVudS5fdG9nZ2xlKCk7XHJcbi8vICAgICB9KVxyXG5cclxuLy8gLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuLy8gICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XHJcbi8vICAgICAgICAgJG1lbnUuX2hpZGUoKTtcclxuLy8gICAgIH1cclxuLy8gfSk7Il0sImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
