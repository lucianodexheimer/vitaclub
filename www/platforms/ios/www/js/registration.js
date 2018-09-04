// JavaScript Document
// ANDROID API KEY AIzaSyBWaodrtQpBb6KxujbV2XfKQwLJAjN7Jss
// ANDROID PROJECT NUMBER 822409998369
var ref="";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "822409998369"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true,
				"clearBadge":true
            }
        });
        console.log('after init');

        push.on('registration', function(data) {
			logar();
			
			//alert(device.platform);
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
			
			 var oldDevice = localStorage.getItem('device');
            if (oldDevice !== device.platform) {
                // Save new registration ID
                localStorage.setItem('device', device.platform);
                // Post registrationId to your app server as the value has changed
            }

           // var parentElement = document.getElementById('registration');
           // var listeningElement = parentElement.querySelector('.waiting');
           // var receivedElement = parentElement.querySelector('.received');

            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
			alert('erro');
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
		//	alert('event');
            console.log('notification event');
			if(data.message!==null && data.message!="" && data.message!="null") {
            	navigator.notification.alert(
					data.message,         // message
					function(){
						//alert('vai teste');
							if(localStorage.id!=undefined && localStorage.senha!=undefined && localStorage.usuario!=undefined) {
								//alert('logado');
							} else {
								//alert('nao');
							}
							//var ref = window.open('http://192.241.205.6/vitaclub/', '_blank', 'toolbar=no,location=no');
						},                 // callback
					'Vitaclub',           // title
					'Ok'                  // buttonName
				);
			}
       });
    }
};