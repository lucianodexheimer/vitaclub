function logar() {
	alert('log');
	cordova.InAppBrowser.open('http://192.241.205.6/vitaclub/', '_blank', 'toolbar=no,location=no,transitionstyle=crossdissolve');
	$('#load').load('http://192.241.205.6/vitaclub/usuarios/loginCookie.php',{'auth_usuario':localStorage.usuario,'auth_senha':localStorage.senha,'regID':localStorage.registrationId,'device':localStorage.device},function(){
		//alert('teste');
		console.log(localStorage.device+' <');
		var ref = cordova.InAppBrowser.open('http://192.241.205.6/vitaclub/', '_blank', 'toolbar=no,location=no,transitionstyle=crossdissolve');
		ref.addEventListener('loadstart', function(event) {
			//alert(event.url);
			 if (event.url.match("mobile/close") || event.url.match("sair.php")) {
				ref.close();
				localStorage.clear();
				window.location.replace('index.html');
			 }
		 }); 
		 ref.addEventListener('exit', function(event) {
			localStorage.clear();
			window.location.replace('index.html');
		 });
	});
}
$(function(){
	//alert('ok2 ->'+localStorage.usuario);
	//alert(localStorage.usuario+" -> "+localStoage.senha);
	
	
});