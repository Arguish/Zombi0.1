//////////////////
//OBJETO personaje
///////////////////

/* Este es el objeto padre, como tal nno llega a instannciarse nunca, pero nnos dara la base para crear mecanicas jugables de una forma mas sencilla. Si todo se comporta igual, solo hay que darles reglas de comportamiennto y gestionar varias entidades en el mapa se vuelve super sencillo, pudiendo ademas crear interacciones nuevas con unn par de ajustes */

class Pawn {
  constructor(x, y, type, id) {
    this.x = x;
    this.y =
      y; /* coordenadas x e y, se utilizzan para localizar a la entidad */
    this.type =
      type; /* le da una tipologia a la entidad, esto sirve tanto para clasificarla en las demas funciones como para añadirle unna clase de css que le de un aspecto */
    this.id =
      id; /* es el id unico que obtenndra al ser instannciado, permitienndo trazarlo por todo el codigo */
    this.canMove = {
      /* a la hora de clacular colisionnes, en unn ennntorno tan sencillo como una cuadricula, se podria entender que un muro, mas que nno dejarte pasar, "desactiva" tu capacidad de moverte en esa direccion, eso significa que si conntrolamos la posibilidad desplazarse o no en una direccionn, podemos conntrolar las colisiones */
      up: true,
      left: true,
      rigth: true,
      down: true,
    };
    this.seeAround = {
      /*  pero claro, para ello, la entidad tiene que saber que hay ahi fuera, asi que en esta variable almacennamos lo que enncuentra al "ehcar un vistazo" a su alreddedor, mas adelante hay unna funncion que controla esta capacidad de "ver" */
      up: "",
      left: "",
      rigth: "",
      down: "",
    };
    this.blockedTerrain =
      []; /* y claro, hay cosas que las entidades podrann atravesar o no, y esto no tiene por que ser de doble sentido, podemos querer que los zombies se echenn encima del jugador, pero que el jugador nno se pueda inmolar tan facilmente, este array almacenará todos los "tipos" de elemenntos sobre los que no podra caminnar, incluso otros como el mismo, nno es plato de buenn gusto ver a dos zombies cabalgando unno a lomos de otro... o puede que en una futura iteracion tenngamos un posible enemigo nnuevo! */
  }

  move() {
    /* si, esta funcion no hace nnada, pero me gusta tenerla para recordar que tenngo que crear una funncion para mover a la enntidad y que este y no otro es el nnombre que tendra, de esta forma, cuando haga unn map para mover a todas las enntidades, se que con .move() se moveran, sea la logica que sea */
    //console.log("Empty function, define by children");
  }

  whatAround() {
    /* la funncionn para echar unn vistazo y saber que hay alrededor, usamos nuestro getCell y mieramos dentro, como es un array, solo tomaremos el primer valor, por si ha habido algunn fallo o hay unna superposicion indeseada */
    this.seeAround.up = gameMap.getCell(this.x, this.y - 1).inside[0];
    this.seeAround.left = gameMap.getCell(this.x - 1, this.y).inside[0];
    this.seeAround.down = gameMap.getCell(this.x, this.y + 1).inside[0];
    this.seeAround.rigth = gameMap.getCell(this.x + 1, this.y).inside[0];
  }

  canGo() {
    this.whatAround(); /* aqui echamos el vistazo, mirar antes de cruzar, tienne senntido nno? */
    this.canMove.up = true;
    this.canMove.left = true;
    this.canMove.down = true;
    this.canMove.rigth = true; /* asumimos que podemnos cruzar, pero claro, tennemos que comprobar nuestros limites, asi que, ahora hay que revisar el array con las clases intraspasables y aplicar si podemos o nno movernnos en esa direccion, como entidades, nnosotros como peronnas no, claramennte */
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
