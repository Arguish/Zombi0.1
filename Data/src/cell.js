class Cell {
  constructor(x, y, ref) {
    this.x = x;
    this.y = y;
    this.ref = ref;
    this.inside = [];
  }

  add(entity) {
    this.inside.push(entity);
  }
  remove(id) {
    this.inside.splice(
      this.inside.findIndex((e) => {
        e.id === id;
      })
    );
  }
}
