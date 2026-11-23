
let slideActual = 0;

let slides = document.querySelectorAll(".item");

let indicadores = document.querySelectorAll(".carousel-indicators li");


function mostrarSlide(numero) {

    slides[slideActual].classList.remove("active");

    indicadores[slideActual].classList.remove("active");


    slideActual = (numero + slides.length) % slides.length;


    slides[slideActual].classList.add("active");

    indicadores[slideActual].classList.add("active");

}


function cambiarSlide(direccion) {

    mostrarSlide(slideActual + direccion);

}


indicadores.forEach((indicador, index) => {

    indicador.onclick = function() {

        mostrarSlide(index);

    };

});
