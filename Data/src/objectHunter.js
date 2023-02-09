// ZOMBIE

/* La cazadora, nno es tan rapida como el herrante, pero sabe donde estas y tiene un Kahoot para ti */

class Hunter extends Pawn {
  constructor(x, y, type, id) {
    super(x, y, type, id);
    this.go = true;
    this.blockedTerrain = ["hunter", "vagabond", "wall"];
  }

  move() {
    /* aqui se encuentra la logica del movimiennto, avanza unn turno si y unno no */
    this.whatAround();
    this.canGo();

    if (this.go) {
      let a =
        Math.abs(this.x - gameMap.getPlayer().x) <=
        Math.abs(
          this.y - gameMap.getPlayer().y
        ); /* originalmente el movimiennto era unn poco ortopedico, esto sucedia, porque inntentaba recortar la distancia con el jugador, pero de cualquier forma, por lo que se podian dar casos enn los que si el jugador volvia sobre sus pasos, las cazadoras se movian en paralelo, que aunqnue esten recortanndo distancia total, no pegaba con el comportamiento de unn ser que quiere increparte con preguntas sobre bucles for y objetros de JS */
      if (!a && this.x > gameMap.getPlayer().x && this.canMove.left) {
        this.x--;
      } else if (!a && this.x < gameMap.getPlayer().x && this.canMove.rigth) {
        this.x++;
      } else if (a && this.y > gameMap.getPlayer().y && this.canMove.up) {
        this.y--;
      } else if (a && this.y < gameMap.getPlayer().y && this.canMove.down) {
        this.y++;
      }
      this.go = false;
    } else {
      this.go = true;
    }
  }
}
