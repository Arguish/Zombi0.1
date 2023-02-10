class Vagabond extends Pawn {
  constructor(x, y, type, id) {
    super(x, y, type, id);
    this.blockedTerrain = ["hunter", "vagabond", "wall"];
  }

  move() {
    this.whatAround();
    this.canGo();

    if (this.go) {
      let a = RandomRange(1, 4);
      if (a === 1 && this.canMove.left) {
        this.x--;
      } else if (a === 2 && this.canMove.rigth) {
        this.x++;
      } else if (a === 3 && this.canMove.up) {
        this.y--;
      } else if (a === 4 && this.canMove.down) {
        this.y++;
      }
      this.go = false;
    } else {
      this.go = true;
    }
  }
}
