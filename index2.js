bird1 = { scr: "white.gif", score: 5 };
bird2 = { scr: "black.gif", score: 10 };
bird3 = { scr: "blue.gif", score: -10 };
let birdsarray = [bird1, bird2, bird3];
let scoregame = 0;
let killedbirds = 0;
let endgame = false;
window.addEventListener("load", function () {
  document.querySelector(".title h2").textContent += `${localStorage.getItem(
    "name"
  )}`;
  document.querySelector(".content h3").textContent += `${localStorage.getItem(
    "name"
  )}`;
  //selectors
  let startgame = document.querySelector(".startgame");
  let content = document.querySelector(".content");
  let timescore = document.querySelector(".time span");

  startgame.addEventListener("click", function () {
    content.remove();
    createbomb();
    //fallbomb(bombimg,0);
    // ImageGenerator();
    //  image(number);
    image();
    //timer
    let counter,
      ms = 60;
    counter = setInterval(function () {
      if (ms > 0) {
        ms--;
        timescore.textContent = ms;
      } else {
        clearInterval(counter);
        ms = 60;
        timescore.textContent = ms;
        timeout();
      }
    }, 300);
  });
});

//bomb
const fallbomb = (bombimg, top) => {
  bombimg.style.visibility = "visible";
  let rand = Math.random() * (window.innerWidth - bombimg.width);
  let timerId = setInterval(() => {
    top += 10;
    if (top < innerHeight - bombimg.height) {
      bombimg.style.top = top + "px";
      bombimg.style.left = rand + "px";
    } else {
      clearInterval(timerId);
      fallbomb(bombimg, 0);
    }
    if (endgame) {
      clearInterval(timerId);
      document.body.removeChild(bombimg);
    }
  }, 80);
};
function timeout() {
  let divelm = document.createElement("div");
  let h3elem = document.createElement("h3");
  let bttnelm = document.createElement("button");
  if(scoregame>=50)
    {
        h3elem.textContent="You Win!" 
    }
    else{
        h3elem.textContent = "You Lose!";
    }
  bttnelm.textContent = "Play Again";
  bttnelm.classList.add("playagain");
  divelm.append(h3elem);
  divelm.append(bttnelm);
  divelm.classList.add("content");
  document.body.append(divelm);
  endgame = true;
  bttnelm.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/index.html";
  });
}

function ImageGenerator() {
  let arrayofbirds = ["black.gif", "blue.gif", "white.gif"];
  // var number = Math.floor(Math.random()*arrayofbirds.length);
  for (let i = 0; i < arrayofbirds.length; i++) {
    let img = document.createElement("img");
    //img.setAttribute("scr", arrayofbirds[number]);
    img.setAttribute("src", arrayofbirds[i]);
    img.classList.add("img");
    document.body.append(img);
    fallrandom(img, 0);
  }
}

/*function score()
{
for(let index=0 ;i<birds.length;index++ )
{
   switch(arraybirds[i])
   {
    case "white.gif":
        scoregame+=5;
        score.textContent=scoregame;

    break;
    case "black.gif":
        scoregame+=10;
        score.textContent=scoregame;
    break;
    case "blue.gif" :
        scoregame-=10;
        score.textContent=scoregame;
    break;     
   }
}
}*/

function image() {
  let timerId = setInterval(() => {
    let number = Math.floor(Math.random() * birdsarray.length);
    let img = document.createElement("img");
    img.setAttribute("src", birdsarray[number].scr);
    img.classList.add("img");
    document.body.append(img);
    fallrandom(img, 0);
    if (endgame) {
      clearInterval(timerId);
    }
  }, 1500);
}
const fallrandom = (img, left) => {
  let rand = Math.random() * (window.innerHeight - img.height);
  let timerId = setInterval(() => {
    left += 10;
    if (left < innerWidth - img.width) {
      document.body.append(img);
      img.style.top = rand + "px";
      img.style.left = left + "px";
    } else {
      img.remove();
      clearInterval(timerId);
      //fallrandom(img,0);
    }
  }, 50);
};
function createbomb() {
  let bombimg = document.createElement("img");
  bombimg.setAttribute("src", "bomb.png");
  bombimg.classList.add("bomb");
  document.body.append(bombimg);
  fallbomb(bombimg, 0);

  bombimg.addEventListener("click", function (e) {
    bombimg.setAttribute("src", "explosedbomb.gif");
    setTimeout(() => {
      document.body.removeChild(bombimg);
      createbomb();
    }, 500);
  });
  bombimg.addEventListener("click", function (e) {
    //  console.log(e.x+bombimg.width);
    //console.log(e.y+bombimg.height);
    //console.log(document.elementFromPoint(e.x, e.y));

    /*for(let top=0 , left=0 ; top<bombimg.offsetTop && left<bombimg.offsetLeft;top++,left++)
        {
            console.log("hey");
        var imgs = this.parentNode.querySelectorAll(".img");
       // let test=document.elementFromPoint(top, left);

        //console.log(document.elementFromPoint(top, left));
       // console.log(imgs);
        }
*/
    var list = document.getElementsByClassName("img");
    var rect = bombimg.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    let arraybirds = [];

    for (var i = 0; i < list.length; i++) {
      arraybirds.push({ top: list[i].offsetTop, left: list[i].offsetLeft });
    }
    for (let i = 0; i < arraybirds.length; i++) {
      let score = document.querySelector(".score span");
      let birdskilled = document.querySelector(".birdskilled span");
      console.log(
        Math.abs(arraybirds[i].top - rect.top),
        Math.abs(arraybirds[i].top - rect.top) < 150
      );
      console.log(
        Math.abs(arraybirds[i].left - rect.left),
        Math.abs(arraybirds[i].left - rect.left) < 150
      );
      if (
        Math.abs(arraybirds[i].left - rect.left) < 200 &&
        Math.abs(arraybirds[i].top - rect.top) < 200
      ) {
        console.log("hey");

        //  if(list[i].currentSrc="http://127.0.0.1:5500/white.gif")
        // s=s+5;
        let birdtypes = list[i].getAttribute("src");
        // let deadbird =document.querySelectorAll("img");
        switch (birdtypes) {
          case "white.gif":
            scoregame += 5;
            score.textContent = scoregame;
            killedbirds++;
            birdskilled.textContent = killedbirds;
            document.body.removeChild(list[i]);
            break;
          case "black.gif":
            scoregame += 10;
            score.textContent = scoregame;
            killedbirds++;
            birdskilled.textContent = killedbirds;
            document.body.removeChild(list[i]);

            break;
          case "blue.gif":
            scoregame -= 10;
            score.textContent = scoregame;
            killedbirds++;
            birdskilled.textContent = killedbirds;
            document.body.removeChild(list[i]);

            break;
        }
      }
    }
    //console.log(s);
  });
}

/*
localStorage.setItem(userName, JSON.stringify({
    name: userName,
    score: currentScore
}));
*/
