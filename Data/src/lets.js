let gameWindow =
  document.querySelector(
    "#gameWindow"
  ); /* almacena este div en una variable, mas adelante se utilizará como padre para insertar dentro toda la cuadricula y la representacion grafica del juego */
let playGameButton =
  document.querySelector(
    "#playGame"
  ); /* almacena la referencia de este boton enn una variable, mas adelante se le insertara un event listener para saber cuando el jugador ha clicado para empezzar la partida */

let gameMap; /* se declara esta variable para darle valor mas adelannte, sera la que almacene el objeto mapo */
let timerId; /* se declara esta variable para darle valor mas adelante, sera la que almacene el ID del timer que se enncarga de actualizar los graficos en pantalla */
////////////////////////

const mainMusic = new Audio(
  "./Data/assests/music/CHIPTUNE_The_Bards_Tale.mp3"
); /* almacena la musica del menú principal */
const loopMusic = new Audio(
  "./Data/assests/music/The Crypt Loop.wav"
); /* almacena la musica del juego */

const aTrap = new Audio("./Data/assests/sound/trap.wav");
const aHit = new Audio("./Data/assests/sound/hit.wav");
const aSpawn = new Audio("./Data/assests/sound/spawn.wav");
const aStep = new Audio("./Data/assests/sound/step.wav");
const aDie = new Audio("./Data/assests/sound/die.wav");
/* todas las delcaraciones anteriores son efectos de sonido, de declarann para poder ser usados mas taarde con el metodo .play() */
///////////

function RandomRange(a, b) {
  /* dado que la funcion para generar nuemros aleatorios en JS es esteticamente fea, hemos decidido crear unna funncion menos hostil a la vista :D */
  return Math.floor(Math.random() * (b - a + 1) + a);
}
function uniqueId() {
  /* esta funcion gennera unna id unica para cada elemennto creado, no siempre es necesaria, pero enn caso de nnecesitarlo, hay forma de idenntificar si dos elementos de identicas caracteristicas sonn en si elemenntos distinntos y de donnde sale, nos da, por asi decirlo una trazzabilidad. LA funcion lo que hace es conatennar la fecha del momentno de llamada con dias, horas, minutos y segundos junnto a un numero aleatorio, se le quitan todos los punntos y caracteres especiales para dejar una string sin demaciadas compljidades */
  return (
    Date().slice(0, 24).replaceAll(":", "").replaceAll(" ", "") +
    Math.random().toString().replace(".", "")
  );
}
