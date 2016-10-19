;( function( window, document )
{
	'use strict';

	var file     = 'build/sprite.symbol.svg',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoIGZ1bmN0aW9uKCB3aW5kb3csIGRvY3VtZW50IClcclxue1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0dmFyIGZpbGUgICAgID0gJ3Nwcml0ZS5zeW1ib2wuc3ZnJyxcclxuXHRcdHJldmlzaW9uID0gMTtcclxuXHJcblx0aWYoICFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgfHwgIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycgKS5jcmVhdGVTVkdSZWN0IClcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR2YXIgaXNMb2NhbFN0b3JhZ2UgPSAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93WyAnbG9jYWxTdG9yYWdlJyBdICE9PSBudWxsLFxyXG5cdFx0cmVxdWVzdCxcclxuXHRcdGRhdGEsXHJcblx0XHRpbnNlcnRJVCA9IGZ1bmN0aW9uKClcclxuXHRcdHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoICdhZnRlcmJlZ2luJywgZGF0YSApO1xyXG5cdFx0fSxcclxuXHRcdGluc2VydCA9IGZ1bmN0aW9uKClcclxuXHRcdHtcclxuXHRcdFx0aWYoIGRvY3VtZW50LmJvZHkgKSBpbnNlcnRJVCgpO1xyXG5cdFx0XHRlbHNlIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgaW5zZXJ0SVQgKTtcclxuXHRcdH07XHJcblxyXG5cdGlmKCBpc0xvY2FsU3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggJ2lubGluZVNWR3JldicgKSA9PSByZXZpc2lvbiApXHJcblx0e1xyXG5cdFx0ZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCAnaW5saW5lU1ZHZGF0YScgKTtcclxuXHRcdGlmKCBkYXRhIClcclxuXHRcdHtcclxuXHRcdFx0aW5zZXJ0KCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dHJ5XHJcblx0e1xyXG5cdFx0cmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0cmVxdWVzdC5vcGVuKCAnR0VUJywgZmlsZSwgdHJ1ZSApO1xyXG5cdFx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGlmKCByZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDAgKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZGF0YSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdGluc2VydCgpO1xyXG5cdFx0XHRcdGlmKCBpc0xvY2FsU3RvcmFnZSApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oICdpbmxpbmVTVkdkYXRhJywgIGRhdGEgKTtcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCAnaW5saW5lU1ZHcmV2JywgICByZXZpc2lvbiApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVxdWVzdC5zZW5kKCk7XHJcblx0fVxyXG5cdGNhdGNoKCBlICl7fVxyXG5cclxufSggd2luZG93LCBkb2N1bWVudCApICk7Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
