playGameButton.addEventListener("click", gameStart);
mainMusic.play();

function gameStart() {
  mainMusic.pause();
  loopMusic.play();
  gameMap = new Map(20, 20);
  gameMap.gameStart();

  window.addEventListener("keydown", (e) => {
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
