function mostrarPagina(pagina){

let paginas = document.querySelectorAll(".pagina");

paginas.forEach(p => {
p.classList.remove("ativa");
p.classList.add("escondida");
});

let atual = document.getElementById(pagina);

atual.classList.remove("escondida");

setTimeout(() => {
atual.classList.add("ativa");
}, 50);

}