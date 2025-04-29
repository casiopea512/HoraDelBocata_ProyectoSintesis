export const positionsScenesTravelingMap = {

  TreeHouse: {
    sceneKey: "TreeHouseScene",
    x: 650,
    y: 250,
    spawnPosition :{x: 650, y: 350},
    name: "Casa del árbol",
    imgPath: "/assets/images/maplocations/treeHouse.png",
  },

  Lake: {
    sceneKey: "LakeScene",
    x: 800, 
    y: 250,
    spawnPosition :{x: 750, y: 350},
    name: "Lago de la casa del árbol",
    imgPath: "/assets/images/maplocations/lake.png",
  },

  BubblegumLab: {
    sceneKey: "BubblegumLabScene",
    x: 200, 
    y: 100,
    spawnPosition :{x: 200, y: 200},
    name: "Chuchelandia",
    imgPath: "/assets/images/maplocations/candyKingdom.png",
  },

  TrompiHouse: {
    sceneKey: "TrompiHouseScene",
    x: 120, 
    y: 470,
    spawnPosition :{x: 220, y: 490},
    name: "La casa de trompi y jamon",
    imgPath: "/assets/images/maplocations/trompiHouse.png",
  },

  MarcelineHouse: {
    sceneKey: "MarcelineHouseScene",
    x: 550, 
    y: 700,
    spawnPosition :{x: 650, y: 710},
    name: "La casa de Marcy",
    imgPath: "/assets/images/maplocations/marcelineHouse.png",
  },

  Cube: {
    sceneKey: "PrismoCubeScene",
    x: 1380,
    y: 650,
    name: "Cubo de prismo",
    spawnPosition :{x: 1280, y: 660},
    imgPath: "/assets/images/maplocations/cube.png",
  },

  Portal_toPrismo: {
    x: 1350,
    y: 70,
    name: "Portal a prismo",
    imgPath: "/assets/images/maplocations/portalRight.png",
    targetPosition: { x: 1160, y: 660 },
  },
  Portal_toOo: {
    x: 1060,
    y: 660,
    name: "Portal a Oo",
    imgPath: "/assets/images/maplocations/portalLeft.png",
    targetPosition: { x: 1250, y: 70 },
  },

};

export default positionsScenesTravelingMap;
