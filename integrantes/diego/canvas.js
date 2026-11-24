
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

let paletaActual = 0;

const paletas = [
    ["#00F5FF", "#7B2CFF", "#FF36B8", "#FFFFFF"],
    ["#FF6B35", "#FFB000", "#F72585", "#7209B7"]
];

// NUMERO ALEATORIO
function numeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

// ELEGIR COLOR
function elegirColor(colores) {
    return colores[Math.floor(Math.random() * colores.length)];
}

// DIBUJAR CIRCULO
function dibujarCirculo(x, y, radio, color) {

    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.shadowBlur = 0;

}

// DIBUJAR RECTANGULO
function dibujarRectangulo(x, y, ancho, alto, color) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(numeroAleatorio(0, Math.PI));

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;

    ctx.fillRect(-ancho / 2, -alto / 2, ancho, alto);

    ctx.shadowBlur = 0;
    ctx.restore();

}

// DIBUJAR TRIANGULO
function dibujarTriangulo(x, y, tamano, color) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(numeroAleatorio(0, Math.PI * 2));

    ctx.beginPath();

    ctx.moveTo(0, -tamano);
    ctx.lineTo(tamano, tamano);
    ctx.lineTo(-tamano, tamano);

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.restore();

}

// DIBUJAR FIGURA ORGANICA
function dibujarOrganica(x, y, tamano, color) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(numeroAleatorio(0, Math.PI * 2));

    ctx.beginPath();

    for (let i = 0; i <= 12; i++) {

        let angulo = (Math.PI * 2 / 12) * i;

        let radio = tamano * numeroAleatorio(0.65, 1.25);

        let px = Math.cos(angulo) * radio;
        let py = Math.sin(angulo) * radio;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 25;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.shadowBlur = 0;

    ctx.restore();

}

// DIBUJAR ANILLOS
function dibujarAnillos(x, y, radio, color) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(numeroAleatorio(0, Math.PI));

    for (let i = 0; i < 4; i++) {

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            radio + i * 12,
            radio * 0.45 + i * 10,
            0,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.8 - i * 0.15;
        ctx.lineWidth = 2;
        ctx.stroke();

    }

    ctx.globalAlpha = 1;
    ctx.restore();

}

// DIBUJAR ESPIRAL
function dibujarEspiral(x, y, color) {

    ctx.beginPath();

    for (let i = 0; i < 100; i++) {

        let angulo = i * 0.12;
        let radio = i * 0.65;

        let px = x + Math.cos(angulo) * radio;
        let py = y + Math.sin(angulo) * radio;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.stroke();

    ctx.shadowBlur = 0;

}

// DIBUJAR ONDAS
function dibujarOndas(color) {

    ctx.save();

    for (let i = 0; i < 5; i++) {

        ctx.beginPath();

        let y = numeroAleatorio(50, 550);

        ctx.moveTo(0, y);

        ctx.bezierCurveTo(
            200, y - numeroAleatorio(30, 100),
            600, y + numeroAleatorio(30, 100),
            900, y
        );

        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 3;
        ctx.stroke();

    }

    ctx.globalAlpha = 1;
    ctx.restore();

}

// DIBUJAR PARTICULAS
function dibujarParticulas(color) {

    for (let i = 0; i < 100; i++) {

        let x = Math.random() * 900;
        let y = Math.random() * 600;
        let radio = numeroAleatorio(1, 3);

        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);

        ctx.fillStyle = color;
        ctx.globalAlpha = Math.random() * 0.8;
        ctx.fill();

    }

    ctx.globalAlpha = 1;

}

// FONDO
function dibujarFondo() {

    let degradado = ctx.createLinearGradient(
        0, 0, 900, 600
    );

    degradado.addColorStop(0, "#080D19");
    degradado.addColorStop(0.5, "#17102E");
    degradado.addColorStop(1, "#080D19");

    ctx.fillStyle = degradado;
    ctx.fillRect(0, 0, 900, 600);

}

// LINEAS DE FONDO
function dibujarLineas() {

    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;

    for (let i = 0; i < 12; i++) {

        ctx.beginPath();

        ctx.moveTo(i * 90, 0);
        ctx.lineTo(i * 90, 600);

        ctx.stroke();

    }

    for (let i = 0; i < 8; i++) {

        ctx.beginPath();

        ctx.moveTo(0, i * 85);
        ctx.lineTo(900, i * 85);

        ctx.stroke();

    }

}

// GENERAR FIGURAS
function generarFiguras() {

    let colores = paletas[paletaActual];

    // Figuras pequeñas
    for (let i = 0; i < 25; i++) {

        let x = Math.random() * 900;
        let y = Math.random() * 600;
        let tamano = numeroAleatorio(15, 35);

        let color = elegirColor(colores);

        if (i % 4 === 0) {

            dibujarCirculo(x, y, tamano, color);

        } else if (i % 4 === 1) {

            dibujarRectangulo(x, y, tamano * 2, tamano, color);

        } else if (i % 4 === 2) {

            dibujarTriangulo(x, y, tamano, color);

        } else {

            dibujarOrganica(x, y, tamano, color);

        }

    }

    // Figuras grandes
    for (let i = 0; i < 5; i++) {

        let x = numeroAleatorio(100, 800);
        let y = numeroAleatorio(100, 450);
        let tamano = numeroAleatorio(45, 75);

        dibujarOrganica(
            x,
            y,
            tamano,
            elegirColor(colores)
        );

    }

    // Anillos decorativos
    for (let i = 0; i < 4; i++) {

        dibujarAnillos(
            numeroAleatorio(100, 800),
            numeroAleatorio(100, 500),
            numeroAleatorio(20, 50),
            elegirColor(colores)
        );

    }

    // Espirales
    dibujarEspiral(
        numeroAleatorio(150, 750),
        numeroAleatorio(150, 450),
        elegirColor(colores)
    );

}

// TEXTO
function dibujarTexto() {

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px Arial";

    ctx.fillText("Figuritas", 40, 510);
    ctx.fillText("Dimensiones", 40, 560);

    ctx.font = "14px Arial";
    ctx.fillStyle = paletas[paletaActual][0];

    ctx.fillText("ARTE DIGITAL GENERATIVO", 42, 580);

}

// COMPOSICION FINAL
function generarComposicion() {

    let colores = paletas[paletaActual];

    ctx.clearRect(0, 0, 900, 600);

    dibujarFondo();

    dibujarLineas();

    dibujarOndas(colores[0]);

    dibujarParticulas(colores[3]);

    generarFiguras();

    dibujarTexto();

}

// BOTON GENERAR
document.getElementById("generar")
.addEventListener("click", function() {

    generarComposicion();

});

// PALETA CYBER
document.getElementById("paleta1")
.addEventListener("click", function() {

    paletaActual = 0;
    generarComposicion();

});

// PALETA SUNSET
document.getElementById("paleta2")
.addEventListener("click", function() {

    paletaActual = 1;
    generarComposicion();

});

// GUARDAR PNG
document.getElementById("guardar")
.addEventListener("click", function() {

    let enlace = document.createElement("a");

    enlace.download = "arte-generativo-diego.png";

    enlace.href = canvas.toDataURL("image/png");

    enlace.click();

});

generarComposicion();
