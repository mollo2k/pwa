var vload=false;
function fload() {
	//Deshabilitar el menu contextual...
	document.addEventListener("contextmenu", function(e) {e.preventDefault();});

	vload = true;
	console.log("Carga completa...");
	if (window.matchMedia('(display-mode: standalone)').matches) {
		vbtn_reg.value = "StandAlone";
		vbtn_reg.style.color = "yellow";
		console.log('Modo: standalone');
  }else{
		vbtn_reg.disabled = false;
		vbtn_reg.value = "Instalar PWA como APP";
		vbtn_reg.style.color = "green";
		console.log('Modo: browser');
	}
}

function freg_sw() {  //Al precionar el boton de registro.
	if('serviceWorker' in navigator) {
		console.log('Soporta ServiceWorker');
		if(vload){
			console.log('Iniciar el registro...');
			navigator.serviceWorker.register('./sw.js').then(reg => {
				reg.installing; // Instalando...
				reg.waiting; // Esperando
				reg.active; // Activo.

				reg.addEventListener('updatefound', () => {
					const newWorker = reg.installing;
					console.log(newWorker.state);

					newWorker.addEventListener('statechange', () => {
						// newWorker.state a cambiado.
						console.log(newWorker.state);
						if(newWorker.state == "installed") {
							vbtn_reg.disabled = true;
							vbtn_reg.style.backgroundColor = "orange";
						}
						if(newWorker.state == "activated") {
							vbtn_reg.style.backgroundColor = "lightblue";
						}
					});
				});
			});
		}
	} else {
		console.log('No soporta ServiceWorker');
	}
}

var vbtn_reg = document.getElementById("btn_reg_sw");
vbtn_reg.addEventListener("click", freg_sw);
window.addEventListener('load', fload);

// ONLINE - OFFLINE
setInterval(function () {
  vbtn_reg.style.borderColor = navigator.onLine ? 'green' : 'red';
}, 250);
