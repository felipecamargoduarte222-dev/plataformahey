function mostrarPagina(pagina){

let paginas = document.querySelectorAll(".pagina");

paginas.forEach(function(p){
p.classList.remove("ativa");
});

document.getElementById(pagina).classList.add("ativa");

}

function abrirJogo(nome){

alert("Abrindo o jogo do " + nome);

}