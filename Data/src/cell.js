///////
//GESTION DE CELDA
//////
function Cell(x, y, ref) {
  /* este es el objeto celda, en el se almacenann las referenncias al html, gracias a este objeto y sus metodos podemos enlazar el aspecto del css conn lo que hay en los datos del js que esta funncionando de fondo */
  this.x = x;
  this.y = y;
  this.ref = ref;
  this.inside = [];
}

Cell.prototype.add = function (entity) {
  this.inside.push(entity);
};
Cell.prototype.remove = function (id) {
  this.inside.splice(
    this.inside.findIndex((e) => {
      e.id === id;
    })
  );
};
