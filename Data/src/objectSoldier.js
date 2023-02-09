// Soldado
/* Despues de comentar el objeto padre, el objeto soldier parece mennos misterioso, lo unnico especial que tiene es que recibe los inputs del jugador */

class Soldier extends Pawn {
  constructor(x, y, type, id) {
    super(x, y, type, id);
    this.blockedTerrain = ["wall", "hunter", "vagabond", "trap"];
  }

  move(keyInput) {
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
  }
}
