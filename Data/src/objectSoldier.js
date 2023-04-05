// Soldado
/* Despues de comentar el objeto padre, el objeto soldier parece mennos misterioso, lo unnico especial que tiene es que recibe los inputs del jugador */

function Soldier(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.blockedTerrain = ["wall", "hunter", "vagabond", "trap"];
}
Soldier.prototype = Object.create(Pawn.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.move = function (keyInput) {
  this.whatAround();
  this.canGo();
  if (keyInput === "a" && this.canMove.left) {
    this.x--;
  } else if (keyInput === "d" && this.canMove.rigth) {
    this.x++;
  } else if (keyInput === "w" && this.canMove.up) {
    this.y--;
  } else if (keyInput === "s" && this.canMove.down) {
    this.y++;
  }
};
