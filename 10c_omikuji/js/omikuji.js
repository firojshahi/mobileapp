"use strict";
let n = "";
let nBefore = "";
let soundEndflag = "0";
let w_sound;
let music;

window.addEventListener("DOMContentLoaded", function () {
    // ヘッダーの文字をアニメーション表示
    $("header").textillate({
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 2000,
        autoStart: true,
        in: {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: true
        }
    });

    // おみくじボタンをふわっと表示
    $(function () {
        ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

    // 5秒後にアラート表示
    setTimeout(function () {
        let popMessage = "いらっしゃい！おみくじ引いてみてって!";
        window.alert(popMessage);
    }, 5000);
}, false);

// ボタンと画像要素の取得
const btn1 = document.getElementById("btn1");
const omikujiTextImage = document.getElementById("omikujiTextImage");

btn1.addEventListener("click", function () {
    btn1.style.opacity = 0;

    if (soundEndflag === "1") {
        soundControl("end", "");
    }

    let resultText = [
        "img/daikichi.png",   // index 0 = Daikichi
        "img/chukichi.png",
        "img/syokichi.png",
        "img/suekichi.png",
        "img/daikyo.png"
    ];

    let resultMaxSpeed = [10, 10, 8, 5, 5];
    let resultMaxSize = [30, 30, 30, 40, 30];
    let resultImage = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/water1.png",
        "img/redLeaves4.png",
        "img/snowflakes.png"
    ];
    let resultSound = [
        "sound/omikuji_sound1.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound3.mp3",
        "sound/omikuji_sound4.mp3",
        "sound/omikuji_sound5.mp3"
    ];

    while (n === nBefore) {
        n = Math.floor(Math.random() * resultText.length);
    }
    nBefore = n;

    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");

    omikujiTextImage.addEventListener("animationend", function () {
        omikujiTextImage.classList.remove("omikujiPaper");
    }, false);

    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";

    // 雪を止めて新しいエフェクトを開始
    $(document).snowfall("clear");
    $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: 1,
        maxSize: resultMaxSize[n],
        minSize: 1,
        image: resultImage[n]
    });

    btn1.style.opacity = 1;

    // 🎉 Confetti only if Daikichi (index 0)
    if (n === 0) {
        confetti({
            particleCount: 120,
            startVelocity: 40,
            spread: 360,
            origin: getButtonOrigin(btn1),
            colors: ['#bb0000', '#ffffff', '#00bb00']
        });
        confetti({
            particleCount: 120,
            angle: 90,
            spread: 90,
            origin: { y: 1 },
            colors: ['#bb0000', '#ffffff', '#00bb00']
          });
          
    }
}, false);

function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}

// 🔧 Get button center position for confetti
function getButtonOrigin(button) {
    const rect = button.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    return { x: x, y: y };
}
