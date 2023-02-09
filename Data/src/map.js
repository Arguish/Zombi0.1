/* Aqui se encuenntra el objeto mapa, en el se almacena la gestion del tablero, la innteraccion entre personnajes y demas */

function Map(width = 10, height = 10) {
  /* el objeto se inicializza conn unnos vvalores de alto y ancho por defecto, si se llama al objeto con valores diferenntes, tomara los declarados, antes que los que tiene por defecto. Enn este caso, se llama al objeto con los valores 30 y 20 mas adelante */
  this.width = width; /* anncho del tablero de juego */
  this.height = height; /* alto del tablero de juego */
  this.entities =
    []; /* este array almacenara todos los objetos o entidades que pueblenn el tablero, hay que recordar que como todos los elemenntos heredan de la clase peon, tannto espadas, como muros, como cualquier cosa que nno sea unna baldosa vacia es unna entidad asi que sera almacennada aqui */
  this.matrix =
    []; /* en este arrya se almacenan los objetos Cell, hablaremos en profunndidad mas adelante, pero por ahora basta saber que contenndran toda la informacionn de cada celda, tanto su hubicacion, como su referenncia HTML, como un array de los elemenntos que se encuenntrann denntro de ella */
  this.bloodMoon = 0; /* Esta variable de nnombre tann fancy es el contador de cuando aparecera unna oleada de zombies, se compoarte entre todas las tumbas que puedan haber enn el tablero, en un futuro reducir el valor de reinicio de este contador asi como aumenntar la canntidad de lapidas podria aumenntar la dificultad */
}

Map.prototype.mapGenerator = function () {
  /* esta es la funcionn basica que genra el tablero de juego */
  let table =
    document.createElement(
      "table"
    ); /* se crea un elemennto tabla de HTML y se almacena en una variable local */
  table.setAttribute(
    "id",
    "gameTable"
  ); /* se le establece un ID para mejorar su localizacion */
  gameWindow.appendChild(
    table
  ); /* se añade como hijo del elemento div que habiamos declarado previamennte en lets.js */
  let tempTr;
  let tempTd; /* se declarann dos variables temporales */
  for (let i = 0; i < this.width; i++) {
    tempTr =
      document.createElement("tr"); /* en este bucle se crea un elemento row */
    tempTr.setAttribute(
      "id",
      `row${i}`
    ); /* se añade unna id conn una nnomenclatrura descriptiva y se queda a la espera del segundo bucle */
    for (let j = 0; j < this.height; j++) {
      tempTd = document.createElement("td"); /* se crea unna celda de html */
      tempTd.setAttribute(
        "id",
        `col${j}`
      ); /* se le añade unna id descriptiva */
      tempTr.appendChild(tempTd); /* se añade al elemento temporal row */
      this.matrix.push(
        new Cell(j, i, tempTd)
      ); /* se crea dentro de la matrix un objeto celda con la misma x,y de la celda y se añade su referenncia. De esta forma, emparejamos la celda de HTML conn su equivalente en la memoria de JS */
    }
    table.appendChild(
      tempTr
    ); /* se añade a la tabla la fila temporal y se repite el proceso hasta que el tablero este llenno */
  }
};

Map.prototype.putWall = function () {
  /* Esta funcionn se encarda de ponner muros enn el borde del tablero */
  this.matrix.map((a) => {
    if (a.x === 0 || a.y === 0) {
      /* hay que tener en cuennta que todos los bordes tendran una de sus coordenadas en un valor maximo o minnimo, asi que si uno de sus valores es 0 o el maximo del tablero, es un borde */
      this.entities.push(new Wall(a.x, a.y, "wall", uniqueId()));
      /* como los muros tambien son connsiderados entidades se almacenana en el array de enntidades, con sus coordenadas y su clase, de esta forma cunado el metodo update repase el array de entidades sabra donnde debe dibujar un muro, ademas de impedir el paso al resto de elementos */
    }
    if (a.x === this.width - 1 || a.y === this.height - 1) {
      this.entities.push(new Wall(a.x, a.y, "wall", uniqueId()));
    }
  });
};

Map.prototype.getCell = function (x, y) {
  /* como vimos en unna funncionn annnterior, todas las celdas del html estan emparejadas conn una celda de la matrix, esta funcion nos permite acceder a dicha celda prporcionnando su coordennadas */
  let a;
  for (let i = 0; i < this.matrix.length; i++) {
    if (this.matrix[i].x === x && this.matrix[i].y === y) {
      a = this.matrix[i];
    }
  }
  return a;
};

Map.prototype.clean = function (x, y) {
  /* esta funcionn se encarga de limpiar un objeto del array dentro de cada objeto celda, como cada vez que hay que actualizar el mapa hay que quitar lo que estuviera antes ahi, convertir esto en unna funcnion nnos limpia bastannte el codigo */
  this.getCell(x, y).inside.pop();
};

Map.prototype.newPlayer = function (x, y) {
  /* esta funncion crea unn objeto jugador (soldier), y lo añade al array de enntidades */
  this.entities.push(new Soldier(x, y, "soldier", uniqueId()));
};

Map.prototype.getPlayer = function () {
  /* a lo largo del codigo necesitaremos muchos datos del jugador, esta funcion nnos permite acceder a el si nnecesidad de preocuparnnos donnde esta exactamente */
  return this.entities.find((a) => a.type === "soldier");
};

Map.prototype.newEnemy = function (x, y) {
  /* esta funcion conntrola la genneracionn de zombies, al haber dos tipos diferenntes, una funncionn random, genera numeros aleatorios, segunn lo que salga en este nnumero aleatorio se gennerará unn tipo de zombie u otro */
  let a = RandomRange(1, 4);
  if (a === 1) {
    this.entities.push(
      new Hunter(x, y, "hunter", uniqueId())
    ); /* dado que la cazadora es mas peligrosa tenderann a generarse mennos */
  }
  if (a > 1) {
    /* la fuerza del errante reside en su numero y enn lo erratico de sus movimientos, por eso deben gennerarse mas de este tipo, solos nno sonn muy peligrosos, pero en lo que se juntan muchos empiezann los problemas */
    this.entities.push(new Vagabond(x, y, "vagabond", uniqueId()));
  }
};

Map.prototype.moveAllEnemies = function () {
  /* esta funncion recorre el array de entidades en busca de zombies y si los enncuentra les da la ordenn de moverse, como se muevann dpendera del objeto zombie que conntiene su propia logica, hablaremos de esto en profundidad mas adelante */
  this.entities.map((a) => {
    if (a.type === "hunter" || a.type === "vagabond") {
      a.move();
    }
  });
};

Map.prototype.shoot = function (keyInput, shootSword = false) {
  /* esta funcion controla donde debe aparecer unna espada y que direccion debe tomar, con unnos calculos basicos de coordenadas, eso le dará al objeto espada unna vez creado su comportamiennto final */
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
      /* tambienn es connveniente controlar que se haya o nno activado unna tecla de disparo, para evitar que se genneren espadas accidenntales */
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
};

Map.prototype.moveProyectiles = function (shooting) {
  /* esta funncion conntrola que se muevan todas las espadas en mapa siempre y cuanndo nno se este disparanndo, antes nno se valoraba que estuvieras o nno disparanndo, pero esto hacia que la espada se moviera doble, al comprobarlo, las espadas solo empiezann a avanzar al moverse despues de disparar, pero esto permitió crear la mecannica de las trampas, las espadas, al dispararse y nno desplazarse, puedes apilar dos espadas enn la misma direccion. si esto sucede, la funncion de superpocision que esta descrita mas adelannte connvertira este solapamiennto de espadas enn una trampa. De fallo a feature! */
  if (!shooting) {
    this.entities.map((a) => {
      if (a.type === "sword") {
        a.move();
      }
    });
  }
};

Map.prototype.landTrap = function (x, y) {
  /* tneienndo en cuennta lo que pasaba enn la funcion anterior, hacia falta una funncion que creara comodamennte trampas y las añadiera al mapa como enntidades, esta es esa funncionn */
  this.entities.push(new Trap(x, y, "trap", uniqueId()));
};

Map.prototype.spawnGrave = function (num) {
  /* las lapidas sirven como referenncia a los zombies para aparece, se le da unnas coordenadas aleatorias dentro del mapa para establecerse y ahi aparece, no tiene mucha mas logica esta funcionn, a todos los demas efgectos, es unn muro que los zombiews pueden atravesar */
  for (let index = 0; index < num; index++) {
    this.entities.push(
      new Spawn(RandomRange(1, 18), RandomRange(1, 18), "spawn", uniqueId())
    );
  }
};

Map.prototype.spawnEnemy = function () {
  /* esta funncion controla cuanndo y donde se genneran los enemigos, al finn podemos utilizar nuestra variable de nnombre fancy. CUANDO LA LUNA DE SANGRE SE ALZA, LA PARCA PERMITE A LOS MUERTOS ATORMENNTAR A LOS MORTALES. O lo que es lo mismo, recorre el array de entidades en busca de enntidades "spawn", que es como hemos denominado a nuestras lapidas, toma sus coordennadas y crea un zombie sobre esta*/
  if (this.bloodMoon <= 0) {
    this.entities.map((a) => {
      if (a.type === "spawn") {
        aSpawn.play();
        this.newEnemy(a.x, a.y);
      }
    });
    this.bloodMoon = 20;
  } else {
    this
      .bloodMoon--; /* SI LA LUNNA DE SANGRE NO SE HA ALZADO, reducimos en unno su contador y comprobaremos la variable el proximo turno */
  }
};

Map.prototype.updateMap = function () {
  /* esta funcion esta muy guay, porque solucionna de una forma bastante comoda el tema de quitar y poner clases a las casillas. El tema es que... */
  this.matrix.map((a) => {
    a.ref.setAttribute(
      "class",
      ""
    ); /* primero limpiamos todas las casillas del mapa y para evitar unndefineds reiniciamos el array "inside", recordemos que cada celda contenia dentro una rray con todos los elementos en su interior, asi que lo vaciamos y pasamos a la segunnda parte de la funcion... */
    a.inside = [""];
  });
  this.entities.map((a) => {
    /* ...El retorno del setAttribute, ahora es personnal 2 */
    this.getCell(a.x, a.y).ref.setAttribute(
      "class",
      a.type
    ); /* aqui, repasamos con un .map el array de entidades y le preguntamos a cada uno donnde esta y al obtener su clase conn la funcion para obetener celdas facilmente que definnimos antes, cambiamos su estilo, asi cuando la funcionn update salte, leerá la clase nnueva y con el estilo de css veremos que hay ahi */
    this.getCell(a.x, a.y).inside.pop();
    this.getCell(a.x, a.y).add(a);
  });
};

Map.prototype.searchAndDestroy = function (id) {
  /* esta funcionn ahora nno parece muy fancy, pero durante la funcionn overlap nos sera extraordinariamennte util, simplemennte dandole un ID, buscara todo rastro de esa entidad y los uprimirá */
  let num = this.entities.findIndex((a) => a.id === id);
  this.entities.splice(num, 1);
}; /* Si fuera mas fann de Metallica hubiera puesto bienn el nnombre de la cancionn, pero es tarde, que los dioses del rock me perdonnenn */

Map.prototype.overlap = function () {
  /* Esta es la funcion conntrola todas las superpocisionnes y que pasa cuanndo suceden */
  for (let i = 0; i < this.entities.length; i++) {
    for (let j = 0; j < this.entities.length; j++) {
      if (this.entities[i].id !== this.entities[j].id) {
        if (
          this.entities[i].x === this.entities[j].x &&
          this.entities[i].y === this.entities[j].y
        ) {
          if (
            this.entities[i].type === "wall" &&
            this.entities[j].type ===
              "wall" /* Reconozco que esta regla es un poco meh, pero en las esquinas, al gennerar muros, se superponiann muros, porque en la primer apasada ponia el de 0 y enn la segunda el del maximo valor del tablero, nno se nnos ocurrio unn mejor algoritmo para aquella funncionn, y como esto se ejecutaba sobre la marcha... buenno, es un placer culpable, funciona, nno es bonnito, pero funcionna  */
          ) {
            this.searchAndDestroy(this.entities[j].id); /* fuera muro */
          }
          if (
            (this.entities[i].type === "vagabond" ||
              this.entities[i].type === "hunter") &&
            this.entities[j].type ===
              "soldier" /* aqui comprobamos si algun zombie a alcannzado al jugaor, en tal caso, malas nnoticias, has perdido */
          ) {
            aDie.play();
            window.alert("GAME OVER");
            location.reload();
          }
          if (
            this.entities[i].type === "sword" &&
            this.entities[j].type ===
              "vagabond" /* anntes ahblamos de que habia dos tipos de zombies, el errannte es el unnico al que puedes maatar a distanncia, porque el hunter te esquiva las espadas, esto se traduce enn que solo comprobamos la colision con el errante */
          ) {
            this.searchAndDestroy(this.entities[j].id);
          }
          if (
            this.entities[i].type === "wall" &&
            this.entities[j].type ===
              "sword" /* ´lo mas normal es que fallemos tiros, asi que hay que comprobar que esas espadas perdidas no viajen hasta el infinnito, en el momennto que unna espada y unn muro coincida, la espada se eliminna */
          ) {
            this.searchAndDestroy(this.entities[j].id);
          }
          if (
            this.entities[i].type === "sword" &&
            this.entities[j].type ===
              "sword" /* la tarea fallada con exito, esto conntrola que si dos epsadas se superpone se connviertann en una trampa, por lo que...  */
          ) {
            this.landTrap(
              this.entities[i].x,
              this.entities[i].y
            ); /* ...instannciamos una trampa y... */
            let tempI = this.entities[i].id;
            let tempJ = this.entities[j].id;
            this.searchAndDestroy(tempI);
            this.searchAndDestroy(tempJ); /* hay que destruir ambas espadas*/
            aTrap.play();
          }
          if (
            this.entities[i].type === "trap" &&
            (this.entities[j].type === "vagabond" ||
              this.entities[j].type ===
                "hunter") /* para que la trampa nno sea mas que unn adornno que eljugador nno puede atravesar hay que calcular que pasa si un zombie la pisa... */
          ) {
            aHit.play();
            let tempI = this.entities[i].id;
            let tempJ = this.entities[j].id;
            this.searchAndDestroy(tempI);
            this.searchAndDestroy(
              tempJ
            ); /* malas noticias para el gremio de los nno-muertos, has sido destruido... */
          }
        }
      }
    }
  }
};

Map.prototype.loop = function (innput, isShootinng) {
  /*  esta funcion controla el bucle de juego, el ordenn en el que se ejecutann las cosas y que hay que pasar a que variables. En este caso, los inputs que ha tocado el jugador y si esos inputs son para disparar */
  aStep.play();
  this.overlap();
  this.updateMap();
  this.shoot(innput, isShootinng);
  this.moveProyectiles(isShootinng);
  this.getPlayer().move(innput);
  this.spawnEnemy();
  this.moveAllEnemies();
  this.updateMap();
};
