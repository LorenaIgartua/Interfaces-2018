function Ficha ()  {
  this.posX = 40;
  this.posY = 40;
  this.radio = 45;
  this.color = '#000000';
  this.jugada = false;
};

function Ficha (x,y,r,c)  {
  this.posX = x;
  this.posY = y;
  this.radio = r;
  this.color = c;
}

Ficha.prototype.dibujar = function () {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.posX+10, this.posY+10, this.radio,0,Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  let image = new Image();
  image.src = "images/ficha.png";
  let x = this.posX - this.radio + 5;
  let y = this.posY - this.radio + 5;
  image.onload = function() {
    ctx.drawImage(image, x, y, 80, 80);
  }
}

Ficha.prototype.detectarToque = function(mouseX,mouseY) {
        let x = mouseX - this.posX;
        let y = mouseY - this.posY;
        return Math.sqrt(x*x + y*y) < this.radio ? true : false;
}
