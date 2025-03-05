export default class Player {
    constructor(scene, x, y, cursors) {
        this.scene = scene;
        this.cursors = cursors;
        this.sprite = scene.physics.add.sprite(x, y, 'assetMovimiento', 12)
            .setOrigin(0.5, 0.5)
            .setScale(4)
            .refreshBody();
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.sprite.setCollideWorldBounds(true);

        this.createAnimations();
    }

    // createAnimations() {
    //     this.scene.anims.create({
    //         key: 'up',
    //         frames: [{ key: 'assetMovimiento', frame: 7 }, { key: 'assetMovimiento', frame: 2 }],
    //         frameRate: 4,
    //         repeat: -1
    //     });

    //     this.scene.anims.create({
    //         key: 'left',
    //         frames: [{ key: 'assetMovimiento', frame: 11 }, { key: 'assetMovimiento', frame: 10 }],
    //         frameRate: 4,
    //         repeat: -1
    //     });

    //     this.scene.anims.create({
    //         key: 'motionless',
    //         frames: [{ key: 'assetMovimiento', frame: 12 }],
    //         frameRate: 20
    //     });

    //     this.scene.anims.create({
    //         key: 'right',
    //         frames: [{ key: 'assetMovimiento', frame: 13 }, { key: 'assetMovimiento', frame: 14 }],
    //         frameRate: 4,
    //         repeat: -1
    //     });

    //     this.scene.anims.create({
    //         key: 'down',
    //         frames: [{ key: 'assetMovimiento', frame: 17 }, { key: 'assetMovimiento', frame: 22 }],
    //         frameRate: 4,
    //         repeat: -1
    //     });
    // }
    
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
                    frames: frames.map(frame => ({ key: 'assetMovimiento', frame })),
                    frameRate,
                    repeat
                });
            }
        });
    }

    update() {
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
            let touchingObject = null;
            this.scene.npcs.forEach(npc => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), npc.sprite.getBounds())) {
                    touchingObject = npc;
                }
            });

            if (Phaser.Input.Keyboard.JustDown(this.cursors.interact)) {
                if (touchingObject) {
                    console.log("Interacción con NPC:", touchingObject.name);
                    touchingObject.interact();
                } else {
                    console.log("No hay objeto para interactuar.");
                }
            }
        }

        // Detectar el uso del mapa !D - cambio de mapa
        if (Phaser.Input.Keyboard.JustDown(this.cursors.showMap)) {
            console.log("mapa");
            this.scene.scene.switch("TravelingMapScene");
        }
    }
}