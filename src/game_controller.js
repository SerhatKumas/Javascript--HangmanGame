// User wrong guess count for hangman draw steps
let guess_count = 0;

// User right letter guess counter
let game_winner_count = 0;

// Random number for guess selection
let random_number = 0;

// Hangman words array -> can be added more and more words
game_words = ["car", "bus", "ferry", "train", "metro"];

// Hangman words explanation array -> can be added more and more but it has to be with same index of its word
game_words_explanation = ["special transportation vehicle", "public transportation vehicle", "public transportation used in sea", "public transportation used between cities", "public transportation used in city"];

// Game initializing method that is revoked everytime game window is loaded and its called
function gameInitializer() {
   // Reset bar is disabled in the beginning of the game
   document.getElementById("reset-btn").disabled = true;
   // Getting random number for hangman word selection
   random_number = getRandomInt(game_words.length);

   // Creation of pragraph for putting explanation of word in it
   let word_explanation_p = document.createElement("p");
   word_explanation_p.innerHTML = game_words_explanation[random_number].toUpperCase();
   word_explanation_p.id = "explanation"
   document.getElementById("word-explanation").appendChild(word_explanation_p);
   // Creation of pragraph for putting explanation of word in it

   // Creating blank spaces ( _ ) equal to number of letter in word
   for (let i = 0; i < game_words[random_number].length; i++) {
      let letter_div = document.createElement('div');
      letter_div.innerHTML = " _ ";
      letter_div.setAttribute("class", "col-1 letters");
      letter_div.setAttribute("id", "letter-" + i);
      document.getElementById("game-plot").appendChild(letter_div);
   }
}

// Trigger for try letter button that takes letter guess of user
function guessLetter() {
   // Getting user input 
   letter_guess = document.getElementById("letter-guess").value.toLowerCase();
   // Cleaning the user letter guess area for next guess
   document.getElementById("letter-guess").value = "";
   placeTheLetters(letter_guess);
}

// Placing the letter guess of user, in blank space ( _ )
function placeTheLetters(guess) {
   // Checking whether word contains user guess letter or not
   if (game_words[random_number].split('').indexOf(guess) > -1) {
      // Taking letter positions in a word, it can return more than one position
      let letter_array = letterPlaceFinder(guess);
      // Placing all the guess letters in a word
      letter_array.forEach(element => {
         document.getElementById("letter-" + element).innerHTML = guess.toUpperCase();
         game_winner_count++;
      });
      // After placing letter check whether game is finished or not
      checkGameStatus();
   } else {
      // Incrementing user wrong guess count
      guess_count++;
      // Due to wrong guess we are changing hangman picture
      hangmanPictureChanger()
      // After wrong guess check whether game is finished or not
      checkGameStatus();
   }
}

// Function that checks whether win or lose cases are achieved
function checkGameStatus() {
   // Due to having 10 steps of hangman, as long as wrong guess counter less than 10 we will be able to win the game
   if (guess_count < 10) {
      // Besides having wrong number counter less than 10, we have to guess all letters right
      if (game_winner_count == game_words[random_number].length) {
         // If we won the game, letter placement div will turn into green
         document.getElementById("vh30").style.backgroundColor = "green";
         // Freezing buttons that are used for guessing letter and revoking reset button
         freezeGameAssets();
         // H1 tag creation for game win announcement
         let h1 = document.createElement("h1");
         h1.setAttribute("id", "game-result");
         h1.innerHTML = "Heyyy, you won the game"
         document.getElementById("word-explanation").appendChild(h1);
         // H1 tag creation for game win announcement
      }
   }
   // Due to having 10 steps of hangman, as long as wrong guess counter more than 10 we lose the game
    else {
      // If we lost the game, letter placement div will turn into red
      document.getElementById("vh30").style.backgroundColor = "red";
      // Freezing buttons that are used for guessing letter and revoking reset button
      freezeGameAssets();
      // H1 tag creation for game lose announcement
      let h1 = document.createElement("h1");
      h1.setAttribute("id", "game-result");
      h1.innerHTML = "Sorry, you lost the game, the word was '" + game_words[random_number].toUpperCase() + "'"
      document.getElementById("word-explanation").appendChild(h1);
      // H1 tag creation for game lose announcement
   }
}

// Methods that freezes buttons that are used for guessing letter and revoking reset button
function freezeGameAssets() {
   // Guessing letter button freezing
   document.getElementById("try-btn").disabled = true;
   // Guessing letter area freezing
   document.getElementById("letter-guess").disabled = true;
   // Deleting word explanation for replacing game announcement
   document.getElementById("explanation").remove()
   // Enabling reset button for restarting the game
   document.getElementById("reset-btn").disabled = false;
}

// Setting hangman picture according to users wrong letter guess counter
function hangmanPictureChanger() {
   // Changing src of image
   document.getElementById("hangman-pic").src = "../game-status-images/" + guess_count + ".jpg"
}

// Function of reseting the game and creating new game
function resetGame() {
   // Guessing letter button enabling
   document.getElementById("try-btn").disabled = false;
   // Guessing letter area enabling
   document.getElementById("letter-guess").disabled = false;
   // Disabling reset button for restarting the game
   document.getElementById("reset-btn").disabled = true;
   // Removing game result div
   document.getElementById("game-result").remove();
   // Letter placement div will reseted into white background
   document.getElementById("vh30").style.backgroundColor = "white";
   // Reseting hangman picture into step 0
   document.getElementById("hangman-pic").src = "../game-status-images/0.jpg"
   // Clearing blank spaces for the word in new game
   let parent = document.getElementById("game-plot");
   while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
   }
   // Clearing blank spaces for the word in new game
   // All counter reseting
   guess_count = 0;
   game_winner_count = 0;
   random_number = 0;
   // All counter reseting
   // Creation of the new game
   gameInitializer();
}

//Method that returns places of letter guesses in a word
function letterPlaceFinder(guess) {
   let letter_places = []
   // Spliting word into array
   let word_array = game_words[random_number].split("");
   // Comparision of the array elements of with guess
   for (let i = 0; i < word_array.length; i++) {
      if (word_array[i] == guess) {
         letter_places.push(i)
      }
   }
   return letter_places
}

// Getting random number for word selection
function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}