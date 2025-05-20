import { positionsScenesTravelingMap } from "./positionsScenesTravelingMap.js";

function switchSceneByCollision(self) {
  const sceneManager = self.scene.scene;
  const currentKey = self.scene.key;

  let positionSwpawnInScene;
  const sceneEntry = Object.values(positionsScenesTravelingMap).find(
    (entry) => entry.sceneKey === currentKey
  );
  if (sceneEntry) {
    positionSwpawnInScene = sceneEntry.positionSwpawnInScene;
  } else {
    console.error("Objeto no encontrado para la escena:", currentKey);
  }

  self.player.sprite.setPosition(
    positionSwpawnInScene.x,
    positionSwpawnInScene.y
  );

  sceneManager.game.config.previousScene = currentKey;
  console.log(
    "Esta es la escena anterior",
    sceneManager.game.config.previousScene
  );

  self.scene.switch("TravelingMapScene");
  console.log("cambiando mapa");
  const nextKey =
    currentKey !== "TravelingMapScene"
      ? "TravelingMapScene"
      : sceneManager.game.config.previousScene;

  const nextScene = self.scene.get(nextKey);
  if (nextScene?.desiredSize) {
    sceneManager.scale.resize(
      nextScene.desiredSize.width,
      nextScene.desiredSize.height
    );
  }
}

function switchSceneByKeyboard(self) {
  const sceneManager = self.scene.scene;
  const currentKey = sceneManager.key;

  if (currentKey !== "TravelingMapScene") {
    self.scene.game.config.previousScene = currentKey;
    console.log(
      "Esta es la escena anterior",
      self.scene.game.config.previousScene
    );
    sceneManager.switch("TravelingMapScene");
    console.log("cambiando mapa");
  } else {
    const previousKey = self.scene.game.config.previousScene;

    if (previousKey) {
      console.log("Dentro");
      sceneManager.switch(previousKey);
      console.log("volviendo al mapa anterior");
    }
  }

  //siempre hacer resize de la escena de destino si tiene desiredSize
  const nextKey =
    currentKey !== "TravelingMapScene"
      ? "TravelingMapScene"
      : self.scene.game.config.previousScene;

  const nextScene = sceneManager.get(nextKey);
  if (nextScene?.desiredSize) {
    self.scene.scale.resize(
      nextScene.desiredSize.width,
      nextScene.desiredSize.height
    );
  }
}

function switchSceneByLocationInteraction(self, locationData) {
  // resetear varibale data del botón 'cerrar inventario', para poder añadirle el evento más tarte
  document.getElementById("close-inventory").dataset.eventAdded = "false";

  self.scene.scene.stop();
  self.scene.cache.tilemap.remove("mapa");
  self.scene.scene.start(locationData.sceneKey);
}

export { switchSceneByCollision, switchSceneByKeyboard, switchSceneByLocationInteraction };
