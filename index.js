const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
start();

let min = 1;
let max = undefined; //leaving undefined in order to allow user input

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

async function start() {
  console.log("Hello, would you want to do the guessing or shall I?\n");
  let gameSelection = await ask(
    "Type 'you' for computer.\nOr type 'me' for yourself!\n"
  );
  gameSelection = gameSelection.toUpperCase();
  if (gameSelection === "ME") {
    let computerNumber = randomInteger(0, 100);

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
      if (humanGuess === computerNumber) {
        console.log(`Correct! My number was ${humanGuess}`);
        start();
      } //while loop to reiterate the asking process until the user guesses the correct number.
    }
  } else if (gameSelection === "YOU") {
    console.log(
      "Let's play a game where you (human) make up a number and I (computer) try to guess it."
    );
    max = await ask(
      "What do you want the high range to be? You can chose anything above 1!\n"
    );
    max = parseInt(max); //assigns max to user input and turns that input into a number
    let secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );
    console.log("You entered: " + secretNumber);
    number = educatedGuess(min, max);
    let guess = await ask(`Was your number ${number}? Y or N \n`);

    while (guess === "n" || guess === "N") {
      let nextQuestion = await ask("Higher or lower? H or L \n");
      nextQuestion = nextQuestion.toUpperCase();
      if (nextQuestion === "L" && number <= min) {
        console.log("Nice try buster! I'm on to you. lets try this again...");

        let finalGuess = await ask(`Was your number ${number}?\n`);
        if (finalGuess === "n" || finalGuess === "N") {
          console.log("You are no fun..");
          process.exit();
        } else if (finalGuess === "y" || finalGuess === "Y") {
          console.log(
            "Ha! You cheat and I still win! Best bot in the verse. Now g'day!"
          );
          process.exit();
        }
        //Cheat detection for when the user tries to go lower than the min range
      } else if (nextQuestion === "H" && number >= max) {
        console.log("Nice try buster! I'm on to you. lets try this again...");

        let finalGuess = await ask(`Was your number ${number}? \n`);
        if (finalGuess === "n" || finalGuess === "N") {
          console.log("You are a sore loser..");
          process.exit();
        } else if (finalGuess === "y" || finalGuess === "Y") {
          console.log(
            "Ha! You cheat and I still win! Best bot in the verse. Now G'day!"
          );
          process.exit();
        }
        //cheat detection for when the user tries to go higher than the max range
      } else if (nextQuestion === "h" || nextQuestion === "H") {
        min = number + 1;
        number = educatedGuess(min, max);
        guess = await ask(`Was your number ${number}? Y or N \n`);
      } else if (nextQuestion === "l" || nextQuestion === "L") {
        max = number - 1;
        number = educatedGuess(min, max);
        guess = await ask(`Was your number ${number}? Y or N \n`);
      }
    }
    //while loop to reiterate through the question process with modified variables based on user input
    if (guess === "y" || guess === "Y") {
      console.log(
        "I win silly human!! Ha! I am the greatest bot in the multiverse"
      );
      start();
    } //final if statement for when the correct number is guessed. computer gloats and quits.
  } else {
    console.log("hmm this doesn't look quite right...");
    start();
  }
}
