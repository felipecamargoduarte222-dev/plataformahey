function mostrarPagina(pagina){

document.getElementById("jogos").style.display="none";
document.getElementById("tech").style.display="none";

document.getElementById(pagina).style.display="block";

}

function abrirJogo(nome){

alert("Abrindo o jogo do " + nome);

}

mostrarPagina("jogos");