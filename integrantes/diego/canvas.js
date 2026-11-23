const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

let paletaActual = 0;

const paletas = [
    ["#00F5FF", "#7B2CFF", "#FF36B8", "#FFFFFF"],
    ["#FF6B35", "#FFB000", "#F72585", "#7209B7"]
];

function dibujarCirculo(x, y, radio, color) {

    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);

    ctx.fillStyle = color;
    ctx.fill();

}

function dibujarRectangulo(x, y, ancho, alto, color) {

    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);

}

function dibujarTriangulo(x, y, tamano, color) {

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + tamano, y + tamano);
    ctx.lineTo(x - tamano, y + tamano);

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

}


function dibujarFondo() {

    let degradado = ctx.createLinearGradient(
        0, 0, 900, 600
    );

    degradado.addColorStop(0, "#080d19");
    degradado.addColorStop(1, "#17102e");

    ctx.fillStyle = degradado;
    ctx.fillRect(0, 0, 900, 600);

}

function dibujarLineas() {

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;

    for (let i = 0; i < 12; i++) {

        ctx.beginPath();

        ctx.moveTo(i * 90, 0);
        ctx.lineTo(i * 90, 600);

        ctx.stroke();

    }

}

function generarFiguras() {

    let colores = paletas[paletaActual];

    for (let i = 0; i < 45; i++) {

        let x = Math.random() * 900;
        let y = Math.random() * 600;

        let tamano = Math.random() * 35 + 10;

        let color = colores[
            Math.floor(Math.random() * colores.length)
        ];

        // Alternar tipos de figuras

        if (i % 3 === 0) {

            dibujarCirculo(x, y, tamano, color);

        } else if (i % 3 === 1) {

            dibujarRectangulo(
                x, y, tamano, tamano, color
            );

        } else {

            dibujarTriangulo(x, y, tamano, color);

        }

    }

}

function dibujarTexto() {

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 48px Arial";
    ctx.fillText("Figuritas", 40, 510);

    ctx.font = "bold 48px Arial";
    ctx.fillText("Dimensiones", 40, 560);

    ctx.font = "14px Arial";
    ctx.fillStyle = "#00F5FF";

    ctx.fillText(
        "Arte Digital",
        42, 580
    );

}

function generarComposicion() {

    ctx.clearRect(0, 0, 900, 600);

    dibujarFondo();

    dibujarLineas();

    generarFiguras();

    dibujarTexto();

}

document.getElementById("generar")
.addEventListener("click", function() {

    generarComposicion();

});

document.getElementById("paleta1")
.addEventListener("click", function() {

    paletaActual = 0;
    generarComposicion();

});

document.getElementById("paleta2")
.addEventListener("click", function() {

    paletaActual = 1;
    generarComposicion();

});

document.getElementById("guardar")
.addEventListener("click", function() {

    let enlace = document.createElement("a");

    enlace.download = "neon-dimensions.png";

    enlace.href = canvas.toDataURL("image/png");

    enlace.click();

});

generarComposicion();
