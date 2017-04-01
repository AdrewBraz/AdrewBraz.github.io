(function() {
    var Periodic = function() {
        this.html = document;
        this.focus = this.html.getElementById('focus');
        this.massFlag = 'showMasse';
        this.numFlag = 'showSerialNumber';
        this.root = this.html.querySelector(".periodic");
        this.mass = this.root.querySelectorAll("div.element > div.details");
        this.couche = this.root.querySelectorAll("div.element > div.num");
        this.chemDivs = this.html.getElementsByClassName("cell");
        this.options = this.html.getElementById('checkOptions');
    }

    Periodic.prototype.show = function(target, arr, flag) {
        if (target.getAttribute('id') == flag) {
            if (target.checked === true) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].style.display = "block";
                }
            } else {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].style.display = "none";
                }
            }
        }
    }

    Periodic.prototype.checkOptions = function(e) {
        var _self = this;
        target = e.target;
        current = e.currentTarget;
        while (target != current) {
            if (target.tagName == "INPUT") {
                _self.show(target, _self.mass, _self.massFlag);
                _self.show(target, _self.couche, _self.numFlag);
            }
            target = target.parentNode;
        };
    }


    Periodic.prototype.showElement = function(selector) {
        var _self = this;
        selector.onmouseover = function(e) {
            _self.focus.innerHTML = "";
            target = e.target;
            for (var i = 0; i < target.children.length; i++) {
                _self.focus.appendChild(target.children[i].cloneNode(true));
            }
        }
    }



    Periodic.prototype.init = function() {
        var _self = this;
        this.options.onclick = function(e) {
            _self.checkOptions(e);
        }
        this.showElement(this.root);
    };

    var periodic = new Periodic();
    periodic.init();
})();