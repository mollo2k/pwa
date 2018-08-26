document.getElementById("breg_sw").addEventListener("click", freg_sw);
window.addEventListener('load', fload);
var vload=false;

function freg_sw() {
	if('serviceWorker' in navigator) {
		console.log('El navegador soporta ServiceWorker');
		if(vload){
			console.log('Se inicia el registro');
			navigator.serviceWorker.register('./sw.js').then(reg => console.log('Registro de SW exitoso', reg))
			.catch(err => console.warn('Al final no se registro', err))
		}
	} else {
		console.log('No soporta ServiceWorker');
	}
}

function fload() {
	vload = true;
	console.log("Carga completa...");
}
