"use strict";

window.addEventListener("DOMContentLoaded", function () {
    // ヘッダーの文字をアニメーション表示
    $("header").textillate({
        loop: false, // ループのオンオフ
        minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
        initialDelay: 2000, // 遅延時間
        autoStart: true, // アニメーションを自動的にスタート
        in: {
            effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
            delayScale: 1.5, // 遅延時間の指数
            delay: 50, // 文字ごとの遅延時間
            sync: false, // 全ての文字を同時にアニメーションさせるかどうか
            shuffle: true // 文字をランダムにアニメーションするか
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

let soundEndflag ="0";
// おみくじボタンのクリックイベント
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");

btn1.addEventListener("click", function () {
    btn1.style.opacity = 0;
    if(soundEndflag === "1"){
        soundControl("end","");
    }

    // おみくじの結果（配列）
    btn1.style.transition = "1s";
    let resultText = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉!", "凶。。"];
    let resultColor = ["#ff0000", "#c71585", "#ff1493", "#ff69b4", "#ff8c00", "#1e90ff"];
    let resultFontSize = ["90px", "80px", "70px", "60px", "50px", "40px"];
    let resultMaxSpeed = [10, 10, 8, 5, 5, 5];
    let resultMaxSize = [30, 30, 20, 15, 20, 20];
    let resultImage = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/sakura_hanabira.png",
        "img/sakura_hanabira.png",
        "img/leaf.png",
        "img/snowflakes.png"
    ];
    let resultSound = [
        "sound/omikuji_sound1.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound3.mp3",
    ];

    // ランダムなインデックスを取得
    const n = Math.floor(Math.random() * resultText.length);

    // ボタンのテキスト・スタイルを設定
    omikujiText.textContent = resultText[n];
    omikujiText.style.color = resultColor[n];
    omikujiText.style.fontSize = resultFontSize[n];

    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";

    // snowfallをクリアしてから新しく開始
    $(document).snowfall("clear");

    $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: 1,
        maxSize: resultMaxSize[n],
        minSize: 1,
        image: resultImage[n]
    });

    btn1.style.opacity = 1;
}, false);
let w_sound
let music
function soundControl(status, w_sound){
    if(status === "start"){
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    }
    else if(status === "end"){
        music.pause();
        music.currentTime = 0;
    }
}