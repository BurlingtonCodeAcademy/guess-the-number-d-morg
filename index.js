const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
start();

let min = 1;
let max = undefined; //leaving undefined in order to allow user input
let guessCounter = 1;
let userGuessCounter = 0; //added counter variables to count inputs.

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function educatedGuess(min, max) {
  let range = (max + min) / 2;
  return Math.floor(range);
} //function to guess the middle of the range every time

function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
} //function to allow computer to pick a random number

let game2 = async function () {
  console.log(
    "\nLet's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  max = await ask(
    "What do you want the high end of the range to be? You can chose anything above 1!\n"
  );
  console.log(`You set the high range to be: ${max}\n`);
  max = parseInt(max); //assigns max to user input and turns that input into a number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log(`You entered: ${secretNumber} \n`);
  number = educatedGuess(min, max);
  let guess = await ask(`Was your number ${number}? Y or N \n`);

  while (guess === "n" || guess === "N") {
    guessCounter++;
    let nextQuestion = await ask("Higher or lower? H or L \n");
    nextQuestion = nextQuestion.toUpperCase();
    if (nextQuestion === "L" && number <= min) {
      console.log("Nice try buster! I'm on to you. lets try this again...");

      let finalGuess = await ask(`Was your number ${number}? 'Y' or 'N'\n`);
      if (finalGuess === "n" || finalGuess === "N") {
        console.log("You are no fun..");
        process.exit();
      } else if (finalGuess === "y" || finalGuess === "Y") {
        console.log(
          "Ha! You cheat and I still win! Best bot in the verse. Now g'day!"
        );
        process.exit();
      }
      //^Cheat detection for when the user tries to go lower than the min range^
    } else if (nextQuestion === "H" && number >= max) {
      console.log("Nice try buster! I'm on to you. lets try this again...");

      let finalGuess = await ask(`Was your number ${number}? 'Y' or 'N' \n`);
      if (finalGuess === "n" || finalGuess === "N") {
        console.log("You are a sore loser..");
        process.exit();
      } else if (finalGuess === "y" || finalGuess === "Y") {
        console.log(
          "Ha! You cheat and I still win! Best bot in the verse. Now G'day!"
        );
        process.exit();
      }
      //^cheat detection for when the user tries to go higher than the max range^
    } else if (nextQuestion === "h" || nextQuestion === "H") {
      min = number + 1;
      number = educatedGuess(min, max);
      guess = await ask(`Was your number ${number}? Y or N \n`);
    } else if (nextQuestion === "l" || nextQuestion === "L") {
      max = number - 1;
      number = educatedGuess(min, max);
      guess = await ask(`Was your number ${number}? Y or N \n`);
    } //Asking user high or lower to reassign ends of the range.
  }
  //^while loop to reiterate through the question process with modified variables based on user input^
  if (guess === "y" || guess === "Y") {
    let playAgain = await ask(
      `\nI win silly human!! Ha! I am the greatest bot in the multiverse!\n\nIt only took me ${guessCounter} tries!\n\nPlay again? 'Y' or 'N'\n`
    );
    playAgain = playAgain.toUpperCase();
    if (playAgain === "Y") {
      max = undefined;
      min = 1;
      guessCounter = 1; //reassigning variables so it starts fresh at beginning of program
      start();
    } else process.exit();
  } //^final if statement with another else for when the correct number is guessed. computer gloats and inquires for another round.^
  else {
    console.log("hmm this doesn't look quite right...");
    start(); //^a catch all for if an unrecognized input is entered. program will restart. ^
  }
}; //game function for letting user choose the number and computer tries to guess it.

let game1 = async function () {
  let computerNumber = randomInteger(1, 100);

  console.log(
    "\nlets play a game where I (computer) come up with a number between 1 - 100 and you (human) try to guess it!"
  );

  let humanGuess = await ask("Okay I'm ready, try to guess my number!\n");
  humanGuess = parseInt(humanGuess);

  while (humanGuess !== computerNumber) {
    userGuessCounter++;
    humanGuess = parseInt(humanGuess); //reassigning variable so it needs to be converted again
    if (humanGuess > computerNumber) {
      humanGuess = await ask(
        "Nope! Guess again silly meat bag! Lower this time.\n"
      );
    } else if (humanGuess < computerNumber) {
      humanGuess = await ask("Nope! guess higher you fool\n");
    }
    if (humanGuess === computerNumber) {
      let playAgain = await ask(
        `\nCorrect! My number was ${humanGuess}\n\nIt took you ${userGuessCounter} tries!\n\nPlay again? 'Y' or 'N'\n`
      );
      playAgain = playAgain.toUpperCase();
      if (playAgain === "Y") {
        userGuessCounter = 0;
        start();
      } else process.exit();
    } //while loop to reiterate the asking process until the user guesses the correct number.
  }
}; //game function for letting user guess computers number

async function start() {
  console.log("\n\nHello, would you want to do the guessing or shall I?\n");
  let gameSelection = await ask(
    "Type 'you' for computer.\nOr type 'me' for yourself!\n"
  );
  gameSelection = gameSelection.toUpperCase();
  if (gameSelection === "ME") {
    game1();
  } else if (gameSelection === "YOU") {
    game2();
  } else {
    console.log("hmm this doesn't look quite right...");
    start(); //^a catch all for if an unrecognized input is entered. program will restart. ^
  }
}
