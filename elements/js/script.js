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


    Periodic.prototype.showElement = function(e) {
        var _self = this;
        this.focus.innerHTML = "";
        target = e.target;
        for (var i = 0; i < target.children.length; i++) {
            this.focus.appendChild(target.children[i].cloneNode(true));
        }
    }


    var periodic = new Periodic();

    periodic.options.onclick = function(e) {
        periodic.checkOptions(e)
    };

    periodic.root.mouseover = function(e) {
        periodic.showElement(e);
    }
})();