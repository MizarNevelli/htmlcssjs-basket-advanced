function getRandom(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomChar() {

  var rndInt = getRandom(65, 90);
  var rndChar = String.fromCharCode(rndInt);

  return rndChar;

   // var ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   //
   // var rndInd = getRandom(0, ALPH.length);
   // var rndChar = ALPH[rndInd];
   //
   // return rndChar;


}

function getRandomId() {

  var rndChars = "";
  var rndVals = "";

  for (var i=0;i<3;i++) {

    rndChars += getRandomChar();
    rndVals += getRandom(0,9);
  }

  var rndId = rndChars + rndVals;

  return rndId;
}

function getRandomPlayer(){

  var twoPerc = getRandom(0,100);
  var threePerc = 100 - twoPerc;

  var player = {
    "id" : getRandomId(),
    "points": getRandom(0, 100),
    "bounce": getRandom(0, 500),
    "mistake": getRandom(0, 50),
    "twoPerc": twoPerc,
    "threePerc": threePerc,
  };
  return player;
}


function checkId(player, players){

  var finded = false;

  for (var i = 0; i < players.length; i++) {
    if (player.id == players[i].id) {
      finded = true;
    }
  }

  return finded;
}

function getRandomPlayers(){

  var players = [];

  for (var i = 0; i < 10; i++) {
    var player = getRandomPlayer();

    if (!checkId(player, players)) {
      players.push(player);
    } else {
      i--;

    }
  }
  return players;
}

function updateUI(players){

  for (var i = 0; i < players.length; i++) {

    var player = players[i];
    var option = document.createElement("option");
    option.value = player.id;

    var datalist = $("datalist");
    datalist.append(option);

  }
}

function clearClick(){
  $("#usr-input").val("");
}

function playerSelector(players){

  var me = $("this");
  var selectedPlayer = $("#usr-input").val();

  var player = getPlayerById(selectedPlayer, players);

  var idDOM = $("#id > span.content");
  var pointsDOM = $("#points > span.content");
  var bounceDOM = $("#bounce > span.content");
  var mistakeDOM = $("#mistake > span.content");
  var twoPercDOM = $("#twoPerc > span.content");
  var threePercDOM = $("#threePerc > span.content");
  idDOM.text(player.id);
  pointsDOM.text(player.points);
  bounceDOM.text(player.bounce);
  mistakeDOM.text(player.mistake);
  twoPercDOM.text(player.twoPerc + "%");
  threePercDOM.text(player.threePerc + "%");

  console.log(player);
}

function getPlayerById(id, players){
  var player;
  for (var i = 0; i < players.length; i++) {
    if (players[i].id = id) {
      player = players[i];
    }
  }
  return player;
}


function init(){

  var players = getRandomPlayers()
  console.log(getRandomPlayer());
  console.log(players);
  updateUI(players);

  var clearBtn = $("#clear-btn");
  clearBtn.on("click", clearClick);

  var input = $("#usr-input");
  input.on("change", function(){
    playerSelector(players);
  });

}

$(document).ready(init);
