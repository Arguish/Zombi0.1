class Pawn {
  constructor(x, y, type, id) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = id;
    this.canMove = {
      up: true,
      left: true,
      rigth: true,
      down: true,
    };
    this.seeAround = {
      up: "",
      left: "",
      rigth: "",
      down: "",
    };
    this.blockedTerrain = [];
  }

  move() {}

  whatAround() {
    this.seeAround.up = gameMap.getCell(this.x, this.y - 1).inside[0];
    this.seeAround.left = gameMap.getCell(this.x - 1, this.y).inside[0];
    this.seeAround.down = gameMap.getCell(this.x, this.y + 1).inside[0];
    this.seeAround.rigth = gameMap.getCell(this.x + 1, this.y).inside[0];
  }

  canGo() {
    this.whatAround();
    this.canMove.up = true;
    this.canMove.left = true;
    this.canMove.down = true;
    this.canMove.rigth = true;
    for (let index = 0; index < this.blockedTerrain.length; index++) {
      if (this.seeAround.up.type === this.blockedTerrain[index]) {
        this.canMove.up = false;
      }
      if (this.seeAround.left.type === this.blockedTerrain[index]) {
        this.canMove.left = false;
      }
      if (this.seeAround.down.type === this.blockedTerrain[index]) {
        this.canMove.down = false;
      }
      if (this.seeAround.rigth.type === this.blockedTerrain[index]) {
        this.canMove.rigth = false;
      }
    }
  }
}
