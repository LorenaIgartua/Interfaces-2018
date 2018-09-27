
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let jugador1 = new Jugador ("Lorena", '#F0F000',60,1);
jugador1.asignarFichas();
let ficha1 = jugador1.presentarFicha();

let jugador2 = new Jugador ("Pepe", '#FF0000',910,2);
jugador2.asignarFichas();
let ficha2 = jugador2.presentarFicha();

let tablero = new Tablero(220,80);
tablero.armarTablero();

let arrastrar = false;
let turno = 1;
dibujarUnaEstrella(80,370);
let fichaActual = null;

let juego = true;

let image = new Image();
image.src = "images/user.png";
image.onload = function() {
  ctx.drawImage(image, 20, 120, 120, 160);
  ctx.drawImage(image, 865, 120, 120, 160);
}

actualizarPanel();
dibujarUnaEstrella(80,370);

function cargarImagenUsuario() {
    ctx.drawImage(image, 20, 120, 120, 160);
    ctx.drawImage(image, 865, 120, 120, 160);
}

document.getElementById("nuevo").addEventListener("click", function() {
    jugador1.asignarFichas();
    jugador2.asignarFichas();
    tablero.armarTablero();
    arrastrar = false;
    turno = 1;
    juego = true;
    document.getElementById("resultados").innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarPanel();
    dibujarUnaEstrella(80,370);
});

function dibujarUnaEstrella(X, Y) {
    ctx.fillStyle = "#e8e0cd";
    let estrella = 2.50;
    let rad = (2 * Math.PI) / estrella;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      x = X + 80 * Math.cos(rad * i);
      y = Y + 80 * Math.sin(rad * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}

function actualizarPanel() {
    tablero.dibujarTablero();
    cargarImagenUsuario();
    document.getElementById("fichas1").innerHTML = jugador1.fichas.length;
    document.getElementById("fichas2").innerHTML = jugador2.fichas.length;
    ficha1.dibujar();
    ficha2.dibujar();
}

function posicionMouse(canvas, event) {
  let posicion = canvas.getBoundingClientRect();
  return { // devuelve un objeto
    x: Math.round(event.clientX - posicion.left),
    y: Math.round(event.clientY - posicion.top)
  };
}

function cambiarTurno() {
  if (turno == 1) {
    turno = 2;
    dibujarUnaEstrella(920,370);
  }
  else {
    turno = 1;
    dibujarUnaEstrella(80,370);
  }
}

canvas.addEventListener("mousedown", function(event) {
  let mousePos = posicionMouse(canvas, event);
  if (juego == true) {
    if (turno == 1 && ficha1.detectarToque(mousePos.x,mousePos.y)){
        fichaActual = jugador1.jugarFicha();
        arrastrar = true;
    }
    if (turno == 2 && ficha2.detectarToque(mousePos.x,mousePos.y)) {
        fichaActual = jugador2.jugarFicha();
        arrastrar = true;
    }
  }
}, false);

canvas.addEventListener("mousemove", function(event) {
  let mousePos = posicionMouse(canvas, event);
  if (arrastrar) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fichaActual.posX = mousePos.x;
    fichaActual.posY = mousePos.y;
    fichaActual.dibujar();
    actualizarPanel();
  }
}, false);

function jugarTurno (mousePos,turno, jugador, mensaje){
      tablero.recibirFicha(mousePos.x, turno);
      fichaActual = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualizarPanel();
}

function analizarPartida (jugador, mensaje) {
  if(tablero.informarGanador(jugador)) {
    document.getElementById("resultados").innerHTML = mensaje;
    juego = false;
  }
  if (jugador.fichas.length == 0 ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarPanel();
    document.getElementById("resultados").innerHTML = "comience un nuevo juego";
    juego = false;
  }
}

canvas.addEventListener("mouseup", function(event) {
  arrastrar = false;
  let mousePos = posicionMouse(canvas, event);
    if (turno == 1 && fichaActual!=null) {
      jugarTurno (mousePos,1);
      analizarPartida(jugador1, "Ganador JUGADOR 1");
      }
  if ( turno == 2 && fichaActual!=null) {
    jugarTurno (mousePos,2);
    analizarPartida(jugador2, "Ganador JUGADOR 2");
    }
      cambiarTurno();
}, false);
