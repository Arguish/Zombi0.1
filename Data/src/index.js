/* Aqui vuelve a haber algo de chicha, no es que las lapidas seanna burridas, pero tampoco son muy complejas */

playGameButton.addEventListener(
  "click",
  gameStart
); /* RECUERDAS, ese boton que declaramos hace unn monntonn de archivos, pues ahora le vamos a dar una funncion y es arrancar el juego, fijate, tiene hasta su propia funncionn, nno como esos objeto comunistas compartienndo funncionnes entre ellos como unnos cualquiera... */
mainMusic.play(); /* y musica de menú, aunque hay navegadores que la corta, porque dicen que si el usuario nno ha interactuado con la paginna primero, no reproduce nada, a nosotros esa funncionnalidad nos ha hecho unnn poco la p++++ pero claro, si piensas en las paginnas spam de solter@s cerca de ti, en realidad se agradece */

function gameStart() {
  mainMusic.pause(); /* paramos la musica del menu */
  loopMusic.play(); /* le damos play  al musica del juego, como buennos DJ, mezclanndo temas */
  gameMap = new Map(
    20,
    20
  ); /* el mapa el mapa el mapa, CREAMOS EL MAPA (objeto) */
  gameMap.mapGenerator(); /* y aqui su representacion grafica */
  gameMap.putWall(); /* muros para que no se escape nada ni nnadie */
  gameMap.newPlayer(1, 1); /* soltamos al jugador */
  gameMap.spawnGrave(1); /* hacemos aparecer unna tumba rexulona */
  gameMap.updateMap(); /* y actualizamos todo el aspecto grafico, ahora es cuandno se ve todp */
  timerId = setInterval((e) => {
    gameMap.updateMap(); /* despues de actualizar el aspecto grafico, queremos olvidarnnos de hacerlo durante el resto del codigo, asi que nuestra amiga y vecina setInterval, se encargara de ello por nosotros */
  }, 333);

  window.addEventListener("keydown", (e) => {
    /* y por ultimo, detectar cuando alguien toca el teclado, ademas, hemos añadido unn filtro de teclas, para que el tiempo solo avannce cuando hagas algo, nno si tocas la tecla que no es... PUEDE y solo PUEDE que te hayas dado cuente que durante los comentarios del codigo hay letras repetidas, mi teclado tienne ghosting, asi que unn filtro de teclas vienne bienn, una cosa es que caminnes dos cuadros, pero otra distinta es que el zombie avance en tudireccionn 3 casillas mientras miras al innfinnito... */
    console.log(e.key);
    if ((e.key === "w") | (e.key === "a") | (e.key === "s") | (e.key === "d")) {
      gameMap.loop(e.key, false);
    }
    if (
      (e.key === "ArrowUp") |
      (e.key === "ArrowLeft") |
      (e.key === "ArrowDown") |
      (e.key === "ArrowRight")
    ) {
      gameMap.loop(e.key, true);
    }
  });
}
