;( function( window, document )
{
	'use strict';

	var file = 'sprite.symbol.svg',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}
	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiOyggZnVuY3Rpb24oIHdpbmRvdywgZG9jdW1lbnQgKVxyXG57XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgZmlsZSA9ICdzcHJpdGUuc3ltYm9sLnN2ZycsXHJcblx0XHRyZXZpc2lvbiA9IDE7XHJcblxyXG5cdGlmKCAhZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TIHx8ICFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnICkuY3JlYXRlU1ZHUmVjdCApXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0dmFyIGlzTG9jYWxTdG9yYWdlID0gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1sgJ2xvY2FsU3RvcmFnZScgXSAhPT0gbnVsbCxcclxuXHRcdHJlcXVlc3QsXHJcblx0XHRkYXRhLFxyXG5cdFx0aW5zZXJ0SVQgPSBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCAnYWZ0ZXJiZWdpbicsIGRhdGEgKTtcclxuXHRcdH0sXHJcblx0XHRpbnNlcnQgPSBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGlmKCBkb2N1bWVudC5ib2R5ICkgaW5zZXJ0SVQoKTtcclxuXHRcdFx0ZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIGluc2VydElUICk7XHJcblx0XHR9O1xyXG5cclxuXHRpZiggaXNMb2NhbFN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oICdpbmxpbmVTVkdyZXYnICkgPT0gcmV2aXNpb24gKVxyXG5cdHtcclxuXHRcdGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggJ2lubGluZVNWR2RhdGEnICk7XHJcblx0XHRpZiggZGF0YSApXHJcblx0XHR7XHJcblx0XHRcdGluc2VydCgpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0dHJ5XHJcblx0e1xyXG5cdFx0cmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0cmVxdWVzdC5vcGVuKCAnR0VUJywgZmlsZSwgdHJ1ZSApO1xyXG5cdFx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGlmKCByZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDAgKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZGF0YSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdGluc2VydCgpO1xyXG5cdFx0XHRcdGlmKCBpc0xvY2FsU3RvcmFnZSApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oICdpbmxpbmVTVkdkYXRhJywgIGRhdGEgKTtcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCAnaW5saW5lU1ZHcmV2JywgICByZXZpc2lvbiApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVxdWVzdC5zZW5kKCk7XHJcblx0fVxyXG5cdGNhdGNoKCBlICl7fVxyXG5cclxufSggd2luZG93LCBkb2N1bWVudCApICk7Il0sImZpbGUiOiJzdmcuanMifQ==
