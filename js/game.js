import scenes from '../src/scenes/scenes.js';
import { startTimer } from "../src/utils/gameTimer.js";

const config = {
    type: Phaser.CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: scenes,
    scale: {
        parent: "game",
        width: 1440,
        height: 870,
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NONE,
        pixelArt: true,
    },
    transparent: true,
    renderer: {
        antialias: false
    }
};

startTimer();


const game = new Phaser.Game(config);


//MUSICA
const music = document.getElementById("bg-music");
const victorySound = document.getElementById("victory-sound");
const muteBtn = document.getElementById("mute-button");
localStorage.setItem("soundMuted", false); //POR DEFECTO NO MUTEADO

// Intenta reproducir la música al cargar
window.addEventListener("load", () => {
    music.play().catch(err => {
    console.log("Autoplay bloqueado:", err);
    });
});

// Botón de silenciar
muteBtn.addEventListener("click", () => {
    music.muted = !music.muted;
    victorySound.muted = !victorySound.muted;
    if (muteBtn.classList.contains("soundOn")) {
        muteBtn.classList.remove("soundOn");
        muteBtn.classList.add("soundOff");
    } else {
        muteBtn.classList.remove("soundOff");
        muteBtn.classList.add("soundOn");
    }
    localStorage.setItem("soundMuted", music.muted);
});