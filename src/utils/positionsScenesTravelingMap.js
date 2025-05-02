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
    x: 230, 
    y: 150,
    spawnPosition :{x: 230, y: 250},
    name: "Chuchelandia",
    imgPath: "/assets/images/maplocations/candyKingdom.png",
  },

  TrompiHouse: {
    sceneKey: "TrompiHouseScene",
    x: 150, 
    y: 480,
    spawnPosition :{x: 250, y: 500},
    name: "La casa de trompi y jamon",
    imgPath: "/assets/images/maplocations/trompiHouse.png",
  },

  MarcelineHouse: {
    sceneKey: "MarcelineHouseScene",
    x: 480, 
    y: 670,
    spawnPosition :{x: 580, y: 680},
    name: "La casa de Marcy",
    imgPath: "/assets/images/maplocations/marcelineHouse.png",
  },

  Cube: {
    sceneKey: "PrismoCubeScene",
    x: 1350,
    y: 610,
    name: "Cubo de prismo",
    spawnPosition :{x: 1250, y: 615},
    imgPath: "/assets/images/maplocations/cube.png",
  },

  Portal_toPrismo: {
    x: 1310,
    y: 100,
    name: "Portal a prismo",
    imgPath: "/assets/images/maplocations/portalRight.png",
    targetPosition: { x: 1060, y: 610 },
  },
  Portal_toOoo: {
    x: 960,
    y: 610,
    name: "Portal a Oo",
    imgPath: "/assets/images/maplocations/portalLeft.png",
    targetPosition: { x: 1210, y: 100 },
  },

};

export default positionsScenesTravelingMap;
