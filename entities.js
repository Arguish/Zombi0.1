class Entities {
  constructor() {
    this.entities = [];
  }

  newPlayer(x, y) {
    this.entities.push(new Soldier(x, y, "soldier", uniqueId()));
  }

  getPlayer = function () {
    return this.entities.find((a) => a.type === "soldier");
  };

  newEnemy(x, y) {
    let a = RandomRange(1, 4);
    if (a === 1) {
      this.entities.push(new Hunter(x, y, "hunter", uniqueId()));
    }
    if (a > 1) {
      this.entities.push(new Vagabond(x, y, "vagabond", uniqueId()));
    }
  }

  moveAllEnemies() {
    this.entities.map((a) => {
      if (a.type === "hunter" || a.type === "vagabond") {
        a.move();
      }
    });
  }

  shoot(keyInput, shootSword = false) {
    let spawnPoint = { x: 0, y: 0 };
    let direction = { x: 0, y: 0 };
    if (keyInput === "ArrowUp") {
      direction = { x: 0, y: -1 };
      spawnPoint.x = this.getPlayer().x;
      spawnPoint.y = this.getPlayer().y - 1;
    } else if (keyInput === "ArrowLeft") {
      direction = { x: -1, y: 0 };
      spawnPoint.x = this.getPlayer().x - 1;
      spawnPoint.y = this.getPlayer().y;
    } else if (keyInput === "ArrowDown") {
      direction = { x: 0, y: 1 };
      spawnPoint.x = this.getPlayer().x;
      spawnPoint.y = this.getPlayer().y + 1;
    } else if (keyInput === "ArrowRight") {
      direction = { x: 1, y: 0 };
      spawnPoint.x = this.getPlayer().x + 1;
      spawnPoint.y = this.getPlayer().y;
    }
    if (shootSword) {
      this.entities.push(
        new Sword(
          spawnPoint.x,
          spawnPoint.y,
          "sword",
          uniqueId(),
          direction.x,
          direction.y
        )
      );
    }
  }

  moveProyectiles(shooting) {
    if (!shooting) {
      this.entities.map((a) => {
        if (a.type === "sword") {
          a.move();
        }
      });
    }
  }

  landTrap(x, y) {
    this.entities.push(new Trap(x, y, "trap", uniqueId()));
  }

  spawnGrave = function (num) {
    for (let index = 0; index < num; index++) {
      this.entities.push(
        new Spawn(RandomRange(1, 18), RandomRange(1, 18), "spawn", uniqueId())
      );
    }
  };

  spawnEnemy() {
    if (this.bloodMoon <= 0) {
      this.entities.map((a) => {
        if (a.type === "spawn") {
          aSpawn.play();
          this.newEnemy(a.x, a.y);
        }
      });
      this.bloodMoon = 20;
    } else {
      this.bloodMoon--;
    }
  }

  seekAndDestroy(id) {
    let num = this.entities.findIndex((a) => a.id === id);
    this.entities.splice(num, 1);
  }

  overlap() {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = 0; j < this.entities.length; j++) {
        if (this.entities[i].id !== this.entities[j].id) {
          if (
            this.entities[i].x === this.entities[j].x &&
            this.entities[i].y === this.entities[j].y
          ) {
            if (
              this.entities[i].type === "wall" &&
              this.entities[j].type === "wall"
            ) {
              this.seekAndDestroy(this.entities[j].id);
            }
            if (
              (this.entities[i].type === "vagabond" ||
                this.entities[i].type === "hunter") &&
              this.entities[j].type === "soldier"
            ) {
              aDie.play();
              window.alert("GAME OVER");
              location.reload();
            }
            if (
              this.entities[i].type === "sword" &&
              this.entities[j].type === "vagabond"
            ) {
              this.seekAndDestroy(this.entities[j].id);
            }
            if (
              this.entities[i].type === "wall" &&
              this.entities[j].type === "sword"
            ) {
              this.seekAndDestroy(this.entities[j].id);
            }
            if (
              this.entities[i].type === "sword" &&
              this.entities[j].type === "sword"
            ) {
              this.landTrap(this.entities[i].x, this.entities[i].y);
              let tempI = this.entities[i].id;
              let tempJ = this.entities[j].id;
              this.seekAndDestroy(tempI);
              this.seekAndDestroy(tempJ);
              aTrap.play();
            }
            if (
              this.entities[i].type === "trap" &&
              (this.entities[j].type === "vagabond" ||
                this.entities[j].type === "hunter")
            ) {
              aHit.play();
              let tempI = this.entities[i].id;
              let tempJ = this.entities[j].id;
              this.seekAndDestroy(tempI);
              this.seekAndDestroy(tempJ);
            }
          }
        }
      }
    }
  }

  gameStart() {
    this.mapGenerator();
    this.putWall();
    this.newPlayer(1, 1);
    this.spawnGrave(1);
  }

  loop(innput, isShootinng) {
    aStep.play();
    this.overlap();
    this.shoot(innput, isShootinng);
    this.moveProyectiles(isShootinng);
    this.getPlayer().move(innput);
    this.spawnEnemy();
    this.moveAllEnemies();
  }
}
