var imgNames = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];
var imgObjects = [];

function Product(name) {
  this.name = name;
  this.url = "img/" + name + ".jpg";
  this.votes = 0;
};

var Tracker = {
  imgLeft: null,
  imgCenter: null,
  imgRight: null,
  roundCounter: 0,

  elLeft: document.getElementById("imgLeft"),
  elCenter: document.getElementById("imgCenter"),
  elRight: document.getElementById("imgRight"),
  elImages: document.getElementById("images"),
  elButton: document.getElementById("button"),

  indexRandom: function() {
    return Math.floor(Math.random() * imgNames.length);
  },

  renderImages: function() {
    Tracker.imgLeft = imgObjects[Tracker.indexRandom()];
    Tracker.imgCenter = imgObjects[Tracker.indexRandom()];
    Tracker.imgRight = imgObjects[Tracker.indexRandom()];


    if (Tracker.imgLeft === Tracker.imgCenter || Tracker.imgRight === Tracker.imgCenter || Tracker.imgRight === Tracker.imgLeft) {
      Tracker.renderImages();
    };

    Tracker.elLeft.src = Tracker.imgLeft.url;
    Tracker.elCenter.src = Tracker.imgCenter.url;
    Tracker.elRight.src = Tracker.imgRight.url;

    Tracker.elLeft.id = Tracker.imgLeft.name;
    Tracker.elCenter.id = Tracker.imgCenter.name;
    Tracker.elRight.id = Tracker.imgRight.name;
  },

  clickOnImages: function() {
    if (event.target.id === Tracker.imgLeft.name || event.target.id === Tracker.imgCenter.name || event.target.id === Tracker.imgRight.name) {
      Tracker.voteCounter(event.target.id);
      //console.log(event.target.id + " has been clicked.");
      if (Tracker.roundCounter === 15) {
        Tracker.elImages.removeEventListener("click", Tracker.clickOnImages);
        Tracker.buttonReveal();
      }
      Tracker.renderImages();
    }
  },

  voteCounter: function(productName) {
    // console.log(imgObjects);
    for (var i = 0; i < imgObjects.length; i++) {
      if (imgObjects[i].name === productName) {
        imgObjects[i].votes++;
        Tracker.roundCounter++;
        console.log("Votes for " + imgObjects[i].name + " are: " + imgObjects[i].votes + ". roundCounter is now " + Tracker.roundCounter);
      };
    };
  },

  buttonReveal: function() {
    Tracker.elButton.hidden = false;
  }
}

window.onload = function() {
  for (var i = 0; i < imgNames.length; i++) {
    imgObjects.push(new Product(imgNames[i]));
  }
  Tracker.renderImages();
  Tracker.elImages.addEventListener("click", Tracker.clickOnImages);
}
