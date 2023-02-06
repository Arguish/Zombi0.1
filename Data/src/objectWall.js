function Wall(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.type = "wall";
}
/* Pues es un muro, es una entidad, lo cual lo convierte en unno de los muros con mas personalidad que hayas conocido, aunque tampoco es que los muros sean muy sociables por naturaleza, enn realidad, nno deberian serlo... no? */
