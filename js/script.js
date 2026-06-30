/*==================================================
                ELEMENTS
==================================================*/

const loading = document.getElementById("loading");
const music = document.getElementById("music");

const pages = document.querySelectorAll(".page");

const startBtn = document.getElementById("startBtn");
const openEnvelope = document.getElementById("openEnvelope");
const wishPageBtn = document.getElementById("wishPageBtn");
const cakePageBtn = document.getElementById("cakePageBtn");
const blowBtn = document.getElementById("blowBtn");
const galleryBtn = document.getElementById("galleryBtn");
const thankBtn = document.getElementById("thankBtn");
const finalBtn = document.getElementById("finalBtn");
const replayBtn = document.getElementById("replayBtn");

/*==================================================
                PAGES
==================================================*/

const welcome = document.getElementById("welcome");
const envelopePage = document.getElementById("envelopePage");
const letterPage = document.getElementById("letterPage");
const wishPage = document.getElementById("wishPage");
const cakePage = document.getElementById("cakePage");
const galleryPage = document.getElementById("galleryPage");
const thankPage = document.getElementById("thankPage");
const finalPage = document.getElementById("finalPage");

/*==================================================
                SHOW PAGE
==================================================*/

function showPage(page){

    pages.forEach(p=>{

        p.classList.remove("active");

    });

    page.classList.add("active");

}

/*==================================================
                LOADING
==================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loading.style.opacity="0";

        setTimeout(()=>{

            loading.style.display="none";

            showPage(welcome);

        },1000);

    },3000);

});

/*==================================================
                MUSIC
==================================================*/

function playMusic(){

    music.volume=0.35;

    music.play().catch(()=>{});

}

/*==================================================
                START
==================================================*/

startBtn.addEventListener("click",()=>{

    playMusic();

    showPage(envelopePage);

});

/*==================================================
                ENVELOPE
==================================================*/

openEnvelope.addEventListener("click",()=>{

    const flap=document.querySelector(".flap");

    flap.style.transform="rotateX(180deg)";

    setTimeout(()=>{

        showPage(letterPage);

    },800);

});

/*==================================================
                LETTER
==================================================*/

wishPageBtn.addEventListener("click",()=>{

    showPage(wishPage);

    startTyping();

});

/*==================================================
                TYPEWRITER
==================================================*/

const typing=document.querySelector(".typing");

const fullText=typing.textContent.trim();

typing.textContent="";

let i=0;

function startTyping(){

    typing.textContent="";

    i=0;

    type();

}

function type(){

    if(i<fullText.length){

        typing.textContent+=fullText.charAt(i);

        i++;

        setTimeout(type,35);

    }

}

/*==================================================
                CAKE
==================================================*/

cakePageBtn.addEventListener("click",()=>{

    showPage(cakePage);

});

/*==================================================
                BLOW CANDLE
==================================================*/

const cake = document.querySelector(".cake");

blowBtn.addEventListener("click",()=>{

    blowBtn.disabled=true;

    blowBtn.innerHTML="✨ Wish Made!";

    cake.style.transform="scale(1.05)";
    cake.style.filter="brightness(.85)";

    setTimeout(()=>{

        galleryBtn.style.display="inline-block";

    },1200);

});

/*==================================================
                GALLERY
==================================================*/

galleryBtn.addEventListener("click",()=>{

    showPage(galleryPage);

});

/*==================================================
                THANK YOU
==================================================*/

thankBtn.addEventListener("click",()=>{

    showPage(thankPage);

});

/*==================================================
                FINAL PAGE
==================================================*/

finalBtn.addEventListener("click",()=>{

    showPage(finalPage);

    startFireworks();

});

/*==================================================
                FIREWORKS
==================================================*/

const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function random(min,max){

    return Math.random()*(max-min)+min;

}

function createFirework(){

    const x=random(100,canvas.width-100);
    const y=random(80,canvas.height/2);

    for(let i=0;i<80;i++){

        particles.push({

            x:x,
            y:y,

            dx:random(-4,4),

            dy:random(-4,4),

            life:100,

            size:random(2,5),

            color:`hsl(${Math.random()*360},100%,65%)`

        });

    }

}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{

        p.x+=p.dx;
        p.y+=p.dy;

        p.dy+=0.02;

        p.life--;

        ctx.globalAlpha=p.life/100;

        ctx.fillStyle=p.color;

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);

        ctx.fill();

        if(p.life<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

function startFireworks(){

    canvas.style.display="block";

    createFirework();

    let count=0;

    const timer=setInterval(()=>{

        createFirework();

        count++;

        if(count>8){

            clearInterval(timer);

            setTimeout(()=>{

                canvas.style.display="none";

            },3000);

        }

    },700);

}

/*==================================================
                RESIZE
==================================================*/

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

});

/*==================================================
                REPLAY
==================================================*/

replayBtn.addEventListener("click",()=>{

    location.reload();

});

/*==================================================
                KEYBOARD
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="m" || e.key==="M"){

        if(music.paused){

            music.play();

        }else{

            music.pause();

        }

    }

});

/*==================================================
                END
==================================================*/