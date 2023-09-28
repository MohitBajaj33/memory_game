const tilesContainer = document.querySelector(".tiles");
const  colors = ["red","Turquoise","Lavender","Coral","Crimson","gold","blue","green"];
const colorsPicklist = [...colors,...colors];
const tileCount = colorsPicklist.length;
const message = document.getElementById('message');
let lavel=0;
message.innerHTML = `<h2> Lavel ${lavel}</h2>`;

for (let i = 0; i < tileCount; i++) {
    const rendomIndex =Math.floor(Math.random()*colorsPicklist.length);
    const color = colorsPicklist[rendomIndex];
    const tile = buildMyTile(color);
    // jo index ki tile bn gyi , usko krdo remove from parent array
    colorsPicklist.splice(rendomIndex,1);
    tilesContainer.appendChild(tile);
}

let revealedCount =0;//litni tiles user ne shi answer kardi
let activeTile = null; // konsi opne kar rkhi hai tile 
let awaitingFinish = false;// iss duration mei user wait karega to reset tiles

function animatePress(element) {
    
    element.classList.add("pressed");

    setTimeout(() => {
        element.classList.remove("pressed");
    }, 200);
}

function buildMyTile(color){
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");


     
    element.addEventListener('click',()=>{
        var audio = new Audio("red.mp3");
        audio.play();
        animatePress(element);
        const revealed = element.getAttribute("data-revealed");
        if(awaitingFinish || revealed === "true" || element== activeTile){
            return;
        }
        element.style.backgroundColor=color;

        if(!activeTile){
            activeTile = element;
            return;
        }
        const colorTuMatch = activeTile.getAttribute("data-color");
        if(colorTuMatch === color){
            element.setAttribute("data-revealed","true");
            activeTile.setAttribute("data-revealed","true");
            activeTile=null;
            awaitingFinish = false;
            revealedCount +=2;
            lavel++;
            message.innerHTML = `<h2> Lavel ${lavel}</h2>`;
            if(revealedCount === tileCount){
                message.innerHTML = "<h2>Yay, You won the game, pls refresh</h2>"
                alert("Yay, You won the game, pls refresh");
            }
            return;
        }

        awaitingFinish = true;
        var audio = new Audio("wrong.mp3");
        audio.play();
        document.querySelector("body").classList.add("game-over");
        setTimeout(()=>{
            document.querySelector("body").classList.remove("game-over");
            activeTile.style.backgroundColor = null;
            element.style.backgroundColor = null;
            awaitingFinish = false;
            activeTile = null;
        },1000);
    });
    return element;
}