class Sword extends Pawn {
  constructor(x, y, type, id, dx, dy) {
    super(x, y, type, id, dx, dy);
    this.blockedTerrain = [""];
    this.direccion = { x: dx, y: dy };
  }

  move() {
    this.x += this.direccion.x;
    this.y += this.direccion.y;
  }
}
