/* La espada como cosa especial es que recibe ademas de donde debe aparecer, una direccionn. Añadiendo esta direccion a su movimiento nnos da un movimiento recto hasta llegar a unn muro */

function Sword(x, y, type, id, dx, dy) {
  Pawn.call(this, x, y, type, id);
  this.blockedTerrain = [""];
  this.direccion = { x: dx, y: dy };
}

Sword.prototype = Object.create(Pawn.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.move = function () {
  this.x += this.direccion.x;
  this.y += this.direccion.y;
};

/* La teoria es que la parte que pincha va enn el otro, pero como nno se como girar un css aun, pues... la parte que no tienens en tu mano va en el otro, y si lo piennsas, si la lanzas con suficiente fuerza, el mango tambien hace daño... */
