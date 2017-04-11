(function (){
  var menu = document.getElementById('menu');
  var nav = document.getElementById('nav');
  
  menu.onclick = function(e){
    menu.classList.toggle('close');
    menu.previousElementSibling.classList.toggle('close');
    nav.style.display = 'flex';
  }
  
})()
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJob3Zlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCl7XHJcbiAgdmFyIG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpO1xyXG4gIHZhciBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2Jyk7XHJcbiAgXHJcbiAgbWVudS5vbmNsaWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlJyk7XHJcbiAgICBtZW51LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2UnKTtcclxuICAgIG5hdi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gIH1cclxuICBcclxufSkoKSJdLCJmaWxlIjoiaG92ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
