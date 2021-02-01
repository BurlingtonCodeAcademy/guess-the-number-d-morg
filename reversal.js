const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
start();

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}//function to allow computer to pick a random number

let game2 = async function start() {
  let computerNumber = randomInteger(0, 100);
  console.log(computerNumber);
  console.log(
    "lets play a game where I (computer) come up with a number and you (human) try to guess it!"
  );

  let humanGuess = await ask("Okay I'm ready, try to guess my number!\n");
  humanGuess = parseInt(humanGuess);

  while (humanGuess !== computerNumber) {
    humanGuess = parseInt(humanGuess); //reassigning variable so it needs to be converted again
    if (humanGuess > computerNumber) {
      humanGuess = await ask(
        "Nope! Guess again silly meat bag! Lower this time.\n"
      );
    } else if (humanGuess < computerNumber) {
      humanGuess = await ask("Nope! guess higher you fool\n");
    }
  }
  if (humanGuess === computerNumber) {
    console.log(`Correct! My number was ${humanGuess}`);
    process.exit();
  } //while loop to reiterate the asking process until the user guesses the correct number.
}
