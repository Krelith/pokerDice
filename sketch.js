class Die {
  constructor(x, y, value, locked, label){
    this.x = x;
    this.y = y;
    this.value = value;
    this.locked = locked;
    this.label = label;
  }
  
  display(){
    fill(255);
    rect(this.x, this.y, 50, 50);  
    if (this.locked){
      fill(0);
      rect(this.x, this.y + 35, 45, 10);  
    }
    fill(0);
    text(this.value, this.x, this.y + 5);
    text(this.label, this.x, this.y - 35);
  }
  
  update(){
    if (!this.locked){
      this.value = Math.floor(random(1,7));
    }
  }
}

let dice = [];
let turn;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  textAlign(CENTER);
  turn = 0;
  for (let i = 0; i < 5; i++){
    dice[i] = new Die(i * 50 + 100, 200, "0", false, String(i + 1));  
  }
}

function draw() {
  background(220);
  showText();
  dice.forEach(die => {
    die.display();
  });
  if (turn >= 3){
    let values = [];
    dice.forEach((die, i) => {
      values[i] = parseInt(die.value);
    });
    showResult(calculateResult(getTotals(values)));
  }
}

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    dice.forEach(die => {
      die.update();  
    });
    turn += 1;
  }
  
  if (key === "1" || key === "2" || key === "3" || key === "4" || key === "5"){
    if (dice[parseInt(key) - 1].value != "0"){
      dice[parseInt(key) - 1].locked = true; 
    }
  }
}

function showText(){
  text("Press DOWN_ARROW to roll the dice.", width/2, 30);
  text("You get three rolls.", width/2, 50);
  text("You can lock a die value by pressing the corresponding number key.", width/2, 70);
  text("When a die has been locked it cannot be unlocked.", width/2, 90);
  text("Try to score the best poker dice result.", width/2, 110);
  text("Rolls: " + String(turn), width/2, height - 20);  
}

function getTotals(results){
  this.results = results;
  let totals = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  };
  for (let i = 0; i < this.results.length; i++){
    totals[this.results[i]] += 1;
  }
  return totals;
}

function calculateResult(obj){
  this.obj = obj;
  let values = Object.values(this.obj);
  for (let i = 0; i < values.length; i++){
    if (values[i] === 5){
      return "Five of a kind";
    } else
    if (values[i] === 4){
      return "Four of a kind";
    } else
    if (values[i] === 3){
      for (let j = 0; j < values.length; j++){
        if (values[j] === 2){
          return "Full house";
        }
      }
      return "Three of a kind";   
    } else
    if (values[i] === 2){
      for (let j = 0; j < values.length; j++){
        if (values[j] === 3){
          return "Full house";
        } else
        if (values[j] === 2 && j != i){
          return "Two pairs";
        }
      }
      console.log(values);
      return "One pair";
    }
  }
  return "Bust";
}

function showResult(calculation){
  this.calculation = calculation;
  fill(255);
  stroke(0);
  rect(width/2, height - 105, 200, 50);
  fill(0);
  noStroke();
  text(this.calculation, width/2, height - 100);
  noLoop();
}
