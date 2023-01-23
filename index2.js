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
  let welcome = document.querySelectorAll(".content p")[1];
  //user saved data
  let userdata = document.createElement("p");
  userdata.textContent =
    "Your last visit :" +
    `${localStorage.getItem("dateandtime")}` +
    ", Your last score :" +
    `${localStorage.getItem("userscore")}`;
  welcome.append(userdata);

  startgame.addEventListener("click", function () {
    content.remove();
    createbomb();
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
    }, 1000);
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
      if (document.body.contains(bombimg)) {
        document.body.removeChild(bombimg);
      }
    }
  }, 80);
};
// time ended
function timeout() {
  let divelm = document.createElement("div");
  let h2elem = document.createElement("h2");
  let bttnelm = document.createElement("button");
  let yourscore = document.createElement("h3");
  if (scoregame >= 50) {
    h2elem.textContent = "You Win!";
    yourscore.textContent = "Your score  is " + scoregame;
  } else {
    h2elem.textContent = "You Lose!";
    yourscore.textContent = "Your score  is " + scoregame;
  }
  bttnelm.textContent = "Play Again";
  bttnelm.classList.add("playagain");
  divelm.append(h2elem);
  divelm.append(yourscore);
  divelm.append(bttnelm);
  divelm.classList.add("content");
  document.body.append(divelm);
  endgame = true;
  bttnelm.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/index.html";
  });
}
//creation of birds
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
// moving birds
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
    }
  }, 50);
};
//creation of bomb
function createbomb() {
  let bombimg = document.createElement("img");
  bombimg.setAttribute("src", "bomb.png");
  bombimg.classList.add("bomb");
  document.body.append(bombimg);
  fallbomb(bombimg, 0);
  //click on bomb to change image
  bombimg.addEventListener("click", function (e) {
    bombimg.setAttribute("src", "explosedbomb.gif");
    setTimeout(() => {
      if (document.body.contains(bombimg)) {
        document.body.removeChild(bombimg);
      }
      createbomb();
    }, 500);
  });
  //click on bomb to kill birds
  bombimg.addEventListener("click", function (e) {
    var list = document.getElementsByClassName("img");
    var rect = bombimg.getBoundingClientRect();
    let arraybirds = [];
    for (var i = 0; i < list.length; i++) {
      arraybirds.push({ top: list[i].offsetTop, left: list[i].offsetLeft });
    }
    for (let i = 0; i < arraybirds.length; i++) {
      let score = document.querySelector(".score span");
      let birdskilled = document.querySelector(".birdskilled span");

      if (
        Math.abs(arraybirds[i].left - rect.left) < 200 &&
        Math.abs(arraybirds[i].top - rect.top) < 200
      ) {
        if (list[i] != undefined) {
          let birdtypes = list[i].getAttribute("src");
          console.log("list", list[i]);
          list[i].style.visibility = "hidden";
          document.body.removeChild(list[i]);
          switch (birdtypes) {
            case "white.gif":
              //   list[i].remove();
              scoregame += 5;
              score.textContent = scoregame;
              killedbirds++;
              birdskilled.textContent = killedbirds;
              break;
            case "black.gif":
              //   list[i].remove();
              scoregame += 10;
              score.textContent = scoregame;
              killedbirds++;
              birdskilled.textContent = killedbirds;
              break;
            case "blue.gif":
              //  list[i].remove();
              scoregame -= 10;
              score.textContent = scoregame;
              killedbirds++;
              birdskilled.textContent = killedbirds;
              break;
          }
          localStorage.setItem("userscore", score.textContent);
          localStorage.setItem("dateandtime", getEventDate());
        }
      }
    }
  });
}

// function to get date and time
function getEventDate() {
  let d = new Date();
  return (
    `Date: ${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ` +
    ` Time:${d.getHours()}:${d.getMinutes()}`
  );
}
