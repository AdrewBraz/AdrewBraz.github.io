;
(function(window, document) {
    'use strict';

    var file = 'sprite.mountains.svg',
        revision = 1;

    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
        return true;

    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function() {
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function() {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };

    if (isLocalStorage && localStorage.getItem('mountainsSVGrev') == revision) {
        data = localStorage.getItem('mountainsSVGdata');
        if (data) {
            insert();
            return true;
        }
    }
    try {
        request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('mountainsSVGdata', data);
                    localStorage.setItem('mountainsSVGrev', revision);
                }
            }
        }
        request.send();
    } catch (e) {}

}(window, document));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBmaWxlID0gJ3Nwcml0ZS5tb3VudGFpbnMuc3ZnJyxcclxuICAgICAgICByZXZpc2lvbiA9IDE7XHJcblxyXG4gICAgaWYgKCFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgfHwgIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJykuY3JlYXRlU1ZHUmVjdClcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB2YXIgaXNMb2NhbFN0b3JhZ2UgPSAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbCxcclxuICAgICAgICByZXF1ZXN0LFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgaW5zZXJ0SVQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc2VydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkgaW5zZXJ0SVQoKTtcclxuICAgICAgICAgICAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5zZXJ0SVQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgaWYgKGlzTG9jYWxTdG9yYWdlICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtb3VudGFpbnNTVkdyZXYnKSA9PSByZXZpc2lvbikge1xyXG4gICAgICAgIGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbW91bnRhaW5zU1ZHZGF0YScpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGluc2VydCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIGZpbGUsIHRydWUpO1xyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIGluc2VydCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21vdW50YWluc1NWR2RhdGEnLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbW91bnRhaW5zU1ZHcmV2JywgcmV2aXNpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgfSBjYXRjaCAoZSkge31cclxuXHJcbn0od2luZG93LCBkb2N1bWVudCkpOyJdLCJmaWxlIjoic3ZnLmpzIn0=
