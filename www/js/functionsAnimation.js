function mostrar()
{
	var ambulancia = document.getElementById('ambulancia');
	var policia = document.getElementById('policia');
	var bomberos = document.getElementById('bomberos');
	if(document.getElementById('ambulancia').style.display == 'block')
	{
		$("#policia").removeClass("policia");
		$("#bomberos").removeClass("bomberos");
		$("#policia").addClass("policiaR");
		$("#bomberos").addClass("bomberosR");
		policia.addEventListener("animationend",ocultar,false);
	}
	else
	{
		policia.removeEventListener("animationend",ocultar,false);
		$("#policia").removeClass("policiaR");
		$("#bomberos").removeClass("bomberosR");
		ambulancia.style.display = 'block';
		policia.style.display = 'block';
		bomberos.style.display = 'block';
		$("#ambulancia").addClass("ambulancia");
		$("#policia").addClass("policia");
		$("#bomberos").addClass("bomberos");
	}
}

function ocultar(e)
{
    var ambulancia = document.getElementById('ambulancia');
	var policia = document.getElementById('policia');
	var bomberos = document.getElementById('bomberos');
	ambulancia.style.display = 'none';
	policia.style.display = 'none';
	bomberos.style.display = 'none';
}

function llamar(entidad)
{
	switch(entidad)
	{
		case 1: location.href='tel:5570512853';
		break;
		case 2: location.href='tel:5570512853';
		break;
		case 3: location.href='tel:5570512853';
		break;
	}
    //mostrarBtnTerminarEmergencia();
    sessionStorage.setItem("idEmergencia", entidad);
	//location.href = '#paginaMapa';
    obtenerCoordenadas();
    setTimeout(function(){ 
        guardarUbicacionEmergencia();
    }, 3000);
    
}

function muestraMenu()
{
   var menu = null; 
   menu = document.getElementsByName('desplegable');
    for(var i=0; menu.length > i; i++)
    {
        if(menu[i].style.display == 'block')
        {
            $(menu[i]).removeClass("desplegable");
            $(menu[i]).addClass("desplegableR");
            menu[i].name = menu[i];
            menu[i].addEventListener("animationend",ocultarMenu,false);
        }
        else
        {
            menu[i].removeEventListener("animationend",ocultarMenu,false);
            $(menu[i]).removeClass("desplegableR");
            menu[i].style.display = 'block';
            $(menu[i]).addClass("desplegable");
        }
    }
}

function ocultarMenuArray()
{
    var menu = document.getElementsByName('desplegable');
    menu.forEach(function (item, index)
                {
                    item.removeEventListener("animationend",ocultarMenu,false);
                    item.style.display = 'none';
                 });
    
}

function ocultarMenu(e)
{
    e.target.style.display = 'none';
}