function Casillero ()  {
  this.ancho = 100;
  this.alto = 100;
  this.posX = 0;
  this.posY = 0;
  this.inicioDropZone = 0;
  this.finDropZone = 0;
  this.valor = 0;
};


function Casillero (x,y)  {
  this.ancho = 80;
  this.alto = 80;
  this.posX = x;
  this.posY = y;
  this.inicioDropZone = x;
  this.finDropZone = x + this.ancho;
  this.valor = 0;
};

Casillero.prototype.dibujar = function () {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(this.posX,this.posY,this.ancho,this.alto);
  if (this.valor == 0) {
      ctx.fillStyle = '#FFFFFF';
  }
  if (this.valor == 1) {
    ctx.fillStyle = '#F0F000';
  }
  if (this.valor == 2) {
    ctx.fillStyle = '#FF0000';
  }
  ctx.arc(this.posX + this.ancho/2, this.posY + this.alto/2, this.ancho/2 - 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}
