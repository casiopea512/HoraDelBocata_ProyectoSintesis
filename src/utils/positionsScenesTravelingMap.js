export const positionsScenesTravelingMap = {

  TreeHouse: {
    sceneKey: "TreeHouseScene",
    x: 650,
    y: 250,
    spawnPosition :{x: 650, y: 350},
    name: "Casa del árbol",
    imgPath: "/assets/images/objects/treeHouse.png",
  },

  Lake: {
    sceneKey: "LakeScene",
    x: 750, 
    y: 250,
    spawnPosition :{x: 750, y: 350},
    name: "Lago de la casa del árbol",
    imgPath: "/assets/images/objects/lake.png",
  },

  BubblegumLab: {
    sceneKey: "BubblegumLabScene",
    x: 200, 
    y: 100,
    spawnPosition :{x: 200, y: 200},
    name: "Chuchelandia",
    imgPath: "/assets/images/objects/candyKingdom.png",
  },

  TrompiHouse: {
    sceneKey: "TrompiHouseScene",
    x: 120, 
    y: 470,
    spawnPosition :{x: 220, y: 490},
    name: "La casa de trompi y jamon",
    imgPath: "/assets/images/objects/trompiHouse.png",
  },

  MarcelineHouse: {
    sceneKey: "MarcelineHouseScene",
    x: 550, 
    y: 700,
    spawnPosition :{x: 650, y: 710},
    name: "La casa de Marcy",
    imgPath: "/assets/images/objects/marcelineHouse.png",
  },

  Cube: {
    sceneKey: "PrismoCubeScene",
    x: 1380,
    y: 650,
    name: "Cubo de prismo",
    spawnPosition :{x: 1280, y: 660},
    imgPath: "/assets/images/objects/cube.png",
  },

  MountainTp_toPrismo: {
    x: 1350,
    y: 70,
    name: "Montaña tp a prismo",
    imgPath: "/assets/images/objects/mountainTP.png",
    targetPosition: { x: 1160, y: 660 },
  },
  MountainTp_toOo: {
    x: 1060,
    y: 660,
    name: "Montaña tp a Oo",
    imgPath: "/assets/images/objects/mountainTP.png",
    targetPosition: { x: 1350, y: 160 },
  },

};

export default positionsScenesTravelingMap;
