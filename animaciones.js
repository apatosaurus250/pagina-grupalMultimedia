
const elementos = document.querySelectorAll(
    "section, .tarjeta, .proyecto-card, .recomendaciones"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visible");

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {

    elemento.classList.add("reveal");

    observador.observe(elemento);

});
