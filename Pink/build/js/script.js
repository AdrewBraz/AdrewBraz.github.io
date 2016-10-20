var toggler = document.getElementById('toggler');
var nav = document.querySelector('.main-nav');
var header = nav.parentElement;
var logo = document.querySelector('.page-header__logo-link');
var close = document.getElementById('close');

toggler.onclick = function(e){
  e.preventDefault();
  e.currentTarget.style.display = 'none';
  logo.style.display = 'none';
  close.style.display = 'block';
  nav.classList.add('main-nav--vertical');
}

close.onclick = function(e){
  e.preventDefault();
  e.currentTarget.style.display = 'none';
  logo.style.display = 'block';
  toggler.style.display = 'block';
  nav.classList.remove('main-nav--vertical');
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvZ2dsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlcicpO1xyXG52YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2Jyk7XHJcbnZhciBoZWFkZXIgPSBuYXYucGFyZW50RWxlbWVudDtcclxudmFyIGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2xvZ28tbGluaycpO1xyXG52YXIgY2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UnKTtcclxuXHJcbnRvZ2dsZXIub25jbGljayA9IGZ1bmN0aW9uKGUpe1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICBsb2dvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgY2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgbmF2LmNsYXNzTGlzdC5hZGQoJ21haW4tbmF2LS12ZXJ0aWNhbCcpO1xyXG59XHJcblxyXG5jbG9zZS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuY3VycmVudFRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIGxvZ28uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgdG9nZ2xlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbWFpbi1uYXYtLXZlcnRpY2FsJyk7XHJcbn0iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
