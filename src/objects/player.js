import { renderInventory } from "../utils/inventoryUI.js";

export default class Player {
    constructor(scene, x, y, cursors) {
        this.scene = scene;
        this.cursors = cursors;
        this.sprite = scene.physics.add.sprite(x, y, 'AssetMovimiento', 12)
            .setOrigin(0.5, 0.5)
            .setScale(4)
            .refreshBody();
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.sprite.setCollideWorldBounds(true);

        this.init();
    }

    init(){
        this.createAnimations();

        if (!this.scene.game.config.inventory) {
            this.scene.game.config.inventory = {};
        }
    }
    
    createAnimations() {
        const animations = [
            { key: 'up', frames: [7, 2], frameRate: 4, repeat: -1 },
            { key: 'left', frames: [11, 10], frameRate: 4, repeat: -1 },
            { key: 'motionless', frames: [12], frameRate: 20, repeat: 0 },
            { key: 'right', frames: [13, 14], frameRate: 4, repeat: -1 },
            { key: 'down', frames: [17, 22], frameRate: 4, repeat: -1 }
        ];
    
        animations.forEach(({ key, frames, frameRate, repeat }) => {
            if (!this.scene.anims.exists(key)) {
                this.scene.anims.create({
                    key,
                    frames: frames.map(frame => ({ key: 'AssetMovimiento', frame })),
                    frameRate,
                    repeat
                });
            }
        });

        // this.scene.anims.create({
        //     key: 'up',
        //     frames: [{ key: 'AssetMovimiento', frame: 7 }, { key: 'AssetMovimiento', frame: 2 }],
        //     frameRate: 4,
        //     repeat: -1
        // });
    }

    update() {
        let touchingObject = null;
        let touchingLocation = null;
        
        this.sprite.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-140);
            this.sprite.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(140);
            this.sprite.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-140);
            this.sprite.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(140);
            this.sprite.anims.play('down', true);
        } else {
            this.sprite.anims.play('motionless', true);
        }

        // Detectar interacción con NPCs, solo si hay npc en el mapa
        if (this.scene.npcs && Array.isArray(this.scene.npcs)) {
            this.scene.npcs.forEach(npc => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), npc.sprite.getBounds())) {
                    touchingObject = npc;
                }
            });
        }

        // Detectar interacción con Localizaciones, solo si hay localizaciones en el mapa
        if (this.scene.locations && Array.isArray(this.scene.locations)){
            this.scene.locations.forEach(location => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), location.sprite.getBounds())) {
                    touchingLocation = location;
                }
            });
        }

        // pulsar tecla 'e'
        if (Phaser.Input.Keyboard.JustDown(this.cursors.interact)) {
            if (touchingObject) {
                touchingObject.interact();
            } 
            
            else if(touchingLocation){
                touchingLocation.interact(this, touchingLocation);
            }

            else {
                console.log("No hay objeto para interactuar.");
            }
        }

        // Detectar el uso del mapa
        if (Phaser.Input.Keyboard.JustDown(this.cursors.showMap)) {

            if(this.scene.scene.key != "TravelingMapScene"){
                // Guardar la escena anterior globalmente en game.config
                this.scene.game.config.previousScene = this.scene.scene.key;
                console.log("Esta es la escena anterior",this.scene.game.config.previousScene)
                this.scene.scene.switch("TravelingMapScene");
                console.log("cambiando mapa");
            }

            else{
                if(this.scene.game.config.previousScene){
                    console.log("Dentro")
                    this.scene.scene.switch(this.scene.game.config.previousScene);
                    console.log("volviendo al mapa anterior");
                }
            }
           
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.lookInventory)) {
            console.log("estás mirando tu inventario");
            renderInventory(this.scene, this.scene.game.config.inventory);
        }
    }
}