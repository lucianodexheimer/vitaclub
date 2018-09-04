function callbk() {
}

function logar() {
alert('log');
	} 
$(function(){
	server='http://192.241.205.6/vitaclub/';
	
	if(localStorage.id!=undefined && localStorage.senha!=undefined && localStorage.usuario!=undefined) {
		window.location.replace('dashboard.html');
		//console.log(localStorage.usuario);
	} 
	
	
	
	$('#btn-entrar').click(function(){
		
		var login = $('input[name=auth_usuario]').val();
		var senha = $('input[name=auth_senha]').val();
		if(login=='' || senha=='') {
			navigator.notification.alert('Digite o seu usuário e senha', callbk, 'VitaClub', 'Ok');
		} else {
			
			if(localStorage.registrationId!=undefined) var regID= localStorage.registrationId;
			else var regID="";
			
			if(localStorage.device!=undefined) var device= localStorage.device;
			else var device="";
			
			$('#btn-entrar').html('Autenticando...');
			$.ajax({
				type:"post",url:server+"usuarios/loginApp.php",data:"ajax=wlib&auth_usuario="+login+"&auth_senha="+senha+"&regid="+regID+"&device="+device,
				success: function(a) {
					$('#btn-entrar').html('<i class="icon-lock"></i> Entrar');
					if(a==0) {
						navigator.notification.alert('Usuário e/ou senha incorreto(s)!', callbk, 'VitaClub', 'Ok');
					} else {
						localStorage.setItem("id", a.id);
						localStorage.setItem("usuario", a.usuario);
						localStorage.setItem("senha", a.senha);
						
						window.location.replace('dashboard.html');
					}
				},
				error: function() {					
					navigator.notification.alert('Erro. Tente novamente!', callbk, 'VitaClub', 'Ok');
					$('#btn-entrar').html('<i class="icon-lock"></i> Entrar');
				}
			});
		}
	});
	
	$('#btn-esqueci').click(function(){
		$('#box-login').hide();
		$('#box-recuperar-senha').show();
		return false;
	});
	
	$('#btn-voltar').click(function(){
		$('#box-recuperar-senha').hide();
		$('#box-login').show();
		return false;
	});
	
	function alertCallback() {
	}
	
	$('#btn-recuperar').click(function(){
		var login = $('#js-recuperar-login').val();
		if(login=="") {
			navigator.notification.alert('Digite o seu usuário', callbk, 'VitaClub', 'Ok');
			
			$('#js-recuperar-login').addClass('erro');
		} else {
			$('#btn-recuperar').html('Carregando...');
			$.ajax({
				type:"post",url:server+"usuarios/recuperar-senha.php",data:"ajax=wlib&login="+login,
				success: function(a) {
					if(a==1) {
						navigator.notification.alert('A senha foi enviada para o seu e-mail cadastrado.', callbk, 'VitaClub', 'Ok');
					} else {
						navigator.notification.alert('Erro: '+a, callbk, 'VitaClub', 'Ok');
						//swal({title: "Erro!", text: a, type:"error", confirmButtonColor: "#424242"});
					}
					$('#btn-recuperar').html('<i class="icon-lock"></i> Recuperar');
				},
				error: function() {
					navigator.notification.alert('Erro. Tente novamente!', callbk, 'VitaClub', 'Ok');
					$('#btn-recuperar').html('<i class="icon-lock"></i> Recuperar');
				}
			});
		}
	});
});


