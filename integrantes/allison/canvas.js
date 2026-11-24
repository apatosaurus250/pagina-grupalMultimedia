
// ======================================
// LABORATORIO GENERATIVO
// ALLISON CHILLOGALLO
// Concepto: RITMO VISUAL
// ======================================

// Obtener el Canvas
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// Botones
const botonPaleta1 = document.getElementById("paleta1");
const botonPaleta2 = document.getElementById("paleta2");
const botonGenerar = document.getElementById("generar");
const botonGuardar = document.getElementById("guardar");

// Paletas de colores
const paletas = [

    // Paleta 1: Atardecer
    ["#211A24", "#D98CA3", "#E8B4A2", "#F3EBDD", "#B9A0D9"],

    // Paleta 2: Lavanda
    ["#211A24", "#B9A0D9", "#8D78B5", "#E8C8DF", "#F3EBDD"]

];

// Variables
let paletaActual = paletas[0];
let variacion = 0;


// ======================================
// FUNCIÓN 1: DIBUJAR EL FONDO
// ======================================

function dibujarFondo() {

    const degradado = ctx.createLinearGradient(
        0, 0, canvas.width, canvas.height
    );

    degradado.addColorStop(0, paletaActual[0]);
    degradado.addColorStop(0.5, paletaActual[2]);
    degradado.addColorStop(1, paletaActual[0]);

    ctx.fillStyle = degradado;

    ctx.fillRect(
        0, 0,
        canvas.width,
        canvas.height
    );

}


// ======================================
// FUNCIÓN 2: DIBUJAR CÍRCULOS
// ======================================

function dibujarCirculo(x, y, radio, color) {

    ctx.beginPath();

    ctx.arc(
        x, y, radio,
        0, Math.PI * 2
    );

    ctx.fillStyle = color;
    ctx.fill();

}


// ======================================
// FUNCIÓN 3: DIBUJAR LÍNEAS
// ======================================

function dibujarLinea(x1, y1, x2, y2, color) {

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.stroke();

}


// ======================================
// FUNCIÓN 4: DIBUJAR TRIÁNGULOS
// ======================================

function dibujarTriangulo(x, y, tamano, color) {

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + tamano, y);
    ctx.lineTo(x + tamano / 2, y - tamano);

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

}


// ======================================
// FUNCIÓN 5: DIBUJAR RECTÁNGULOS
// ======================================

function dibujarRectangulo(x, y, ancho, alto, color) {

    ctx.fillStyle = color;

    ctx.fillRect(
        x, y,
        ancho, alto
    );

}


// ======================================
// FUNCIÓN 6: DIBUJAR TÍTULOS
// ======================================

function dibujarTextos() {

    ctx.fillStyle = paletaActual[4];

    ctx.font = "bold 34px Arial";

    ctx.fillText(
        "RITMO VISUAL",
        45, 65
    );

    ctx.font = "16px Arial";

    ctx.fillStyle = paletaActual[3];

    ctx.fillText(
        "El arte de transformar música en formas",
        48, 95
    );

    ctx.font = "bold 13px Arial";

    ctx.fillStyle = paletaActual[4];

    ctx.fillText(
        "ALLISON CHILLOGALLO  /  GENERATIVE ART",
        45, 510
    );

}


// ======================================
// FUNCIÓN 7: GENERAR COMPOSICIÓN
// ======================================

function generarComposicion() {

    // Dibujar fondo
    dibujarFondo();

    // Líneas decorativas superiores
    for (let i = 0; i < 8; i++) {

        let x = 50 + i * 110;

        dibujarLinea(
            x, 130,
            x + 40, 130,
            paletaActual[3]
        );

    }

    // Generar figuras geométricas
    for (let i = 0; i < 45; i++) {

        let x = 40 + Math.random() * 820;
        let y = 150 + Math.random() * 310;

        let tamano = 8 + Math.random() * 35;

        let color = paletaActual[
            1 + Math.floor(Math.random() * 4)
        ];

        // Alternar diferentes figuras
        if (i % 4 === 0) {

            dibujarCirculo(
                x, y,
                tamano,
                color
            );

        } else if (i % 4 === 1) {

            dibujarRectangulo(
                x, y,
                tamano * 1.5,
                tamano,
                color
            );

        } else if (i % 4 === 2) {

            dibujarTriangulo(
                x, y,
                tamano,
                color
            );

        } else {

            dibujarLinea(
                x, y,
                x + tamano * 2,
                y + tamano,
                color
            );

        }

    }

    // Crear ondas concéntricas
    for (let i = 0; i < 5; i++) {

        ctx.beginPath();

        ctx.arc(
            450, 300,
            65 + i * 22,
            0, Math.PI * 2
        );

        ctx.strokeStyle = paletaActual[
            1 + (i % 4)
        ];

        ctx.lineWidth = 2;

        ctx.stroke();

    }

    // Dibujar textos
    dibujarTextos();

    variacion++;

}


// ======================================
// EVENTOS DE LOS BOTONES
// ======================================

// Seleccionar paleta 1
botonPaleta1.addEventListener("click", function() {

    paletaActual = paletas[0];

    generarComposicion();

});


// Seleccionar paleta 2
botonPaleta2.addEventListener("click", function() {

    paletaActual = paletas[1];

    generarComposicion();

});


// Generar una nueva composición
botonGenerar.addEventListener("click", function() {

    generarComposicion();

});


// Descargar composición como PNG
botonGuardar.addEventListener("click", function() {

    const enlace = document.createElement("a");

    enlace.download = "ritmo-visual-allison.png";

    enlace.href = canvas.toDataURL("image/png");

    enlace.click();

});

generarComposicion();
