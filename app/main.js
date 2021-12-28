// Las funciones que tienes que rellenar están más abajo
// Mucha suerte :)



// Contenedor de instancia del juego y de swiper (no tocar nada)
let game;
let swiper;

// Valores constantes para tamaños, imágenes de caracteres del juego, opciones de juego (tocar lo necesario)
const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/img/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/img/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/img/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/img/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/img/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/img/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/img/shot2.png",
    SHOT_WIDTH = 1.5;

// Selectores DOM para las diferentes funcionalidades
const GAME_UI = {
    app: document.querySelector(".layout"),
    gameBoard: document.querySelector(".game_container .game_holder"),
    pauseButton: document.querySelector(".pause .btn_link"),
    cancelButton: document.querySelector(".btn_secondary"),
    modalWindow: document.querySelector(".modal_window"),
    bigScores: document.querySelector(".big_scores"),
    leaderBoardItems: document.querySelectorAll(".leaderboard_item"),
};

// Lanzamiento de funciones basadas en la página en la que nos encontremos (no tocar nada)
window.addEventListener("load", () => {
    const isGamePage = document
        .querySelector(".layout")
        .classList.contains("game");
    const isHomePage = document
        .querySelector(".layout")
        .classList.contains("home");
    const isHighScores = document
        .querySelector(".layout")
        .classList.contains("highscores");

    if (isGamePage) {
        startGame();
        startEvents();
        makePlayerDraggable();
    }
    if (isHomePage) {
        animateHomePage();
    }
    if (isHighScores) {
        animateStaggerScores();
        initScoreSwiper();
    }
});

// Algunos eventos necesarios de nuestro proyecto
function startEvents() {
    GAME_UI.pauseButton.addEventListener("click", () => {
        game.pauseOrResume();
        if (game.paused) {
            openModalWindow();
        } else {
            closeModalWindow();
        }
    });
    GAME_UI.cancelButton.addEventListener("click", () => {
        game.pauseOrResume();
        if (!game.paused) {
            closeModalWindow();
        }
    });
}

// ======================================================================
// ======================================================================
// ENUNCIADOS
// ======================================================================
// ======================================================================

// Fase 4 – Animación de entrada en la página home con AnimeJS.
function animateHomePage() {
    anime
         .timeline({
             duration: 700,
             easing: "easeInSine",
         })
         .add(
             {
                targets: [document.querySelector(".home header"),document.querySelector(".home main"),
                          document.querySelector(".home .main_navigation"),document.querySelector(".home .secondary_navigation")],
                translateY: [-15, 0],
                opacity: [0,1],
                delay:anime.stagger(200)
             }
         )
    // .....
}

// Fase 5 - Animaciones más complejas en highscores.html y game.html.
function openModalWindow() {
    anime({
        targets: GAME_UI.modalWindow,
        // algunas propiedades puedes animar!!
        translateY: [-150, 0],
        opacity: [0,1],
        duration:1500,
        begin() {
            GAME_UI.modalWindow.classList.add("opened");
        },
    });
}
function closeModalWindow() {
    anime({
        targets: GAME_UI.modalWindow,
        translateY: [0, -150],
        opacity: [1,0],
        duration:300, // mejor que dure algo más....
        easing:"linear",
        // algunas propiedades puedes animar!!
        complete() {
            GAME_UI.modalWindow.classList.remove("opened");
        },
    });
}
function animateStaggerScores() {
    anime({
        targets: GAME_UI.leaderBoardItems,
        translateY: [-10, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
    // .....
    })
}

// Fase 6 - Practiquemos Swiper
function initScoreSwiper() {
    swiper = new Swiper(GAME_UI.bigScores, {
         pagination: {
            el: ".swiper-pagination",
            type: "bullets",
        },
        loop: true,
        autoplay: {
            delay: 1500,
        }
    // .....
    })
}

// Fase 7 - Hacer el jugador en game.html draggable con interact
function makePlayerDraggable(player) {
    if (typeof player != "undefined") {
        
        // empieza aquí con interact
        // player es la instancia del jugador, tiene algunas propiedades como player.dragging o player.x que te pueden ayudar
        
        interact(player.myImageContainer).draggable({
            intertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: false,
                }),
            ],
            listeners: {
                start: (ev) => {
                    player.dragging = true;
                },
                move: (ev) => {
                    player.x += ev.delta.x;
                },
                end: (ev) => {
                    player.dragging = false;
                },
            }
            // .....
        });
    }
}
