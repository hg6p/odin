let counter = 0;
let antiwin = 0;
getImages = () => {
  return document.querySelectorAll("img");
};
getDiv = () => {
  return document.getElementsByTagName("div")[0];
};
window.onload = addFunction = () => {
  let img = getImages();
  for (let i in img) {
    img[i].onclick = function () {
      let game = rules(img[i].id, computerPlay());
      if (game.result) {
        counter++;
        document.querySelector("p").style.border = "1px solid blue";
      } else if (game.result == false) {
        antiwin++;
        document.querySelector("p").style.border = "1px solid red";
      }
      console.log(game.msg);
      document.getElementsByTagName(
        "p"
      )[0].textContent = ` ${counter} -- ${antiwin} `;
    };
  }
};
const computerPlay = () => {
  let arr = ["rock", "paper", "scissor"];
  return arr[getRand()];
};
getRand = () => {
  return Math.round(Math.random() * 2);
};
playerSelection = () => {
  let user = prompt().toLowerCase();
  return user;
};
rules = (playerSelection, computerPlay) => {
  let win;
  console.log(playerSelection + " " + computerPlay);
  if (playerSelection == computerPlay) return { msg: "draw" };
  else {
    switch (playerSelection) {
      case "rock": {
        if (computerPlay == "scissor") {
          win = true;
        }
        break;
      }
      case "paper": {
        if (computerPlay == "rock") {
          win = true;
        }
        break;
      }
      case "scissor": {
        if (computerPlay == "paper") {
          win = true;
        }
        break;
      }
    }
    if (win) {
      return { msg: "you won", result: true };
    } else {
      return { msg: "you lost", result: false };
    }
  }
};

const images = document.querySelectorAll("img");
