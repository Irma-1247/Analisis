//Variables
var contenido;
var area = document.getElementById('zona');
var end = document.getElementById('end');
var iron = document.getElementById('iron');
var viuda = document.getElementById('viuda');
var ultron = document.getElementById('ultron');

//Funciones click
function registrarManejadores(){
	if(end.addEventListener){
		end.addEventListener('click',function(){
			contenido = '';
			area.innerHTML = contenido;
			llamada('Avengers: Endgame')},false);
	}
	if(iron.addEventListener){
		iron.addEventListener('click',function(){
			contenido = '';
			area.innerHTML = contenido;
			llamada('Iron Man 3')},false);
	}
	if(viuda.addEventListener){
		viuda.addEventListener('click',function(){
			contenido = '';
			area.innerHTML = contenido;
			llamada('Black Widow')},false);
	}
	if(ultron.addEventListener){
		ultron.addEventListener('click',function(){
			contenido = '';
			area.innerHTML = contenido;
			llamada('Avengers: Age of Ultron')},false);
	}
}

//Funciones
function llamada (movie){
	//Ajax
	function ajaxRequest(){
		//Crear array() con cadenas para creación de objeto ActiveX
		//en caso de navegadores antiguos de Internet Explorer
		var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		//Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		if(window.ActiveXObject){
			for(var i=0; i<activexmodes.length; i++){
				try{
					return new ActiveXObject(activexmodes[i]);
				}
				catch(e){
					return false;
				}
			}
		}
		// Si se está usando Chrome, Mozilla, Safari, Opera, etc.
		else if (window.XMLHttpRequest){
			return new XMLHttpRequest();
		}
		else{
			return false;
		}
	}
	//OBTENIENDO DATOS
	var request = new ajaxRequest();
	request.onreadystatechange = function(){
		if(request.readyState==4){
			if(request.status==200 || window.location.href.indexOf("http")==-1){
				//Recibir resultado como un objeto de JavaScript usando el método parse()
				var jsondata = JSON.parse(request.responseText);
				var rssentries = jsondata.items;
				for(var i=0; i<rssentries.length; i++){
					if(rssentries[i].title == movie)
					{
						contenido = '<h1>'+ rssentries[i].title +'</h1>\n';
						contenido += '<p><strong>Sinopsis:</strong> '+ rssentries[i].sinopsis +'</p>\n';
						contenido += '<p><strong>Personajes:</strong> '+ rssentries[i].personajes +'</p>\n';
						contenido += '<p>'+ rssentries[i].director +'</p>\n';
					}
				}
				area.innerHTML = contenido;
			}
			else{
				alert("Ha ocurrido un error mientras se realizaba la petición");
			}
		}
	}
	request.open("GET", "json/index.json", true);
	request.send(null);
}

if(window.addEventListener){
	window.addEventListener("load", registrarManejadores(), false);
}