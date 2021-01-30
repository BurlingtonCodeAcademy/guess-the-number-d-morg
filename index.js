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

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  max = await ask("What do you want the high range to be? You can chose anything above 1!\n");
  max = parseInt(max); //assigns max to user input and turns that input into a number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  number = educatedGuess(min, max);
  let guess = await ask(`Was your number ${number}? Y or N \n`);

  while (guess === "n" || guess === "N") {
    let nextQuestion = await ask("Higher or lower? H or L \n");
    nextQuestion = nextQuestion.toUpperCase()
    if (nextQuestion === "L" && number <= min) {
      console.log("Nice try buster! I'm on to you. lets try this again...");
      let finalGuess = await ask(`Was your number ${number}?\n`);
      if (finalGuess === "n" || finalGuess === "N") {
        console.log("You are no fun..");
        process.exit();
      } else if (finalGuess === "y"|| finalGuess === "Y"){
          console.log("Ha! You cheat and I still win! Best bot in the verse. Now g'day!")
          process.exit();
        } //Cheat detection for when the user trys to go lower than the min range
    } else if (nextQuestion === "H" && number >= max) {
        console.log("Nice try buster! I'm on to you. lets try this again...");
        let finalGuess = await ask(`Was your number ${number}? \n`);
        if (finalGuess === "n" || finalGuess === "N") {
          console.log("You are a sore loser..");
          process.exit();
        }else if (finalGuess === "y"|| finalGuess === "Y"){
          console.log("Ha! You cheat and I still win! Best bot in the verse. Now G'day!")
          process.exit();
        }//cheat detection for when the user trys to go higher than the max range
      }

    else if (nextQuestion === "h" || nextQuestion === "H") {
      min = number + 1;
      number = educatedGuess(min, max);
      guess = await ask(`Was your number ${number}? Y or N \n`);
    } else if (nextQuestion === "l" || nextQuestion === "L") {
      max = number - 1;
      number = educatedGuess(min, max);
      guess = await ask(`Was your number ${number}? Y or N \n`);
    }
    
  } //while loop to reiterate through the question process with modified variables based on user input
  if (guess === "y" || guess === "Y") {
    console.log(
      "I win silly human!! Ha! I am the greatest bot in the multiverse"
    );
    process.exit();
  } //final if statement for when the correct number is guessed. computer gloats and quits.
}