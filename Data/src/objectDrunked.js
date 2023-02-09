// Drunked

/* Este objueto enn realidad lo he reaprovechado de otra funcion que queriamos hacer, unn algoritmo para generar mapas, enn internnet deciann de crear unna sala con muros y poner unn Hulk borracho a tirar paredes, en unn futuro tal vez... PERO nno queria dejar esto fuera y de aqui nace el Errante. Se mueve mas rapido que la cazadora, y su movimiento erratico, aunqnue innofensivo en distancias largas hace que apunntarle de lejos sea mas dificil y acercarte puede ser peligroso si hay demasiados... Es curioso como algo tann sencillo como unn algoritmo asi, pueda explicar tan claramente porque los zombiers puedenn llegar a ser peligrosos */

class Vagabond extends Pawn {
  constructor(x, y, type, id) {
    super(x, y, type, id);
    this.blockedTerrain = ["hunter", "vagabond", "wall"];
  }

  move() {
    this.whatAround();
    this.canGo();

    if (this.go) {
      let a = RandomRange(
        1,
        4
      ); /* se genera unn numero aleatorio y se mueve enn la direccion asociada */
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
