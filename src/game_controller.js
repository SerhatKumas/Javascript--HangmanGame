let guess_count = 0 ;
let game_winner_count = 0;
let randomNumber = 0 ;

word = ["car", "bus", "ferry", "train", "metro"];
word_explanation = ["special transportation vehicle", "public transportation vehicle", "public transportation used in sea", "public transportation used between cities", "public transportation used in city"];

function initiateGame(){
document.getElementById("reset-btn").disabled = true;
randomNumber = getRandomInt(word.length);
let p = document.createElement("p");
p.innerHTML = word_explanation[randomNumber].toUpperCase();
p.id = "announcement"
document.getElementById("word-explanation").appendChild(p);
for(let i = 0; i<word[randomNumber].length; i++){
    let letterDiv = document.createElement('div');
    letterDiv.innerHTML = " _ ";
    letterDiv.setAttribute("class", "col-1 letters");
    letterDiv.setAttribute("id", "letter-"+i);
    document.getElementById("game-plot").appendChild(letterDiv);
}
}

function guessLetter(){
    letter_guess = document.getElementById("letter-guess").value.toLowerCase();
    document.getElementById("letter-guess").value = "";
    placeTheLetters(letter_guess);
}

function placeTheLetters(guess){
    if(word[randomNumber].split('').indexOf(guess) > -1){
        let letter_array = letterChecker(guess);
        letter_array.forEach(element => {
            document.getElementById("letter-"+element).innerHTML = guess.toUpperCase();
            game_winner_count++;
        });
        checkGameStatus();
    }
    else{
        guess_count++;
        hangmanPictureChanger()
        checkGameStatus();
    }
}

function checkGameStatus(){
if(guess_count < 10){
    //win implementation
    if(game_winner_count == word[randomNumber].length){
    document.getElementById("vh30").style.backgroundColor = "green";
    freezeGameAssets();
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "game-result");
    h1.innerHTML = "Heyyy, you won the game"
    document.getElementById("word-explanation").appendChild(h1);
    }
}
else{
    document.getElementById("vh30").style.backgroundColor = "red";
    freezeGameAssets();
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "game-result");
    h1.innerHTML = "Sorry, you lost the game, the word was '" + word[randomNumber].toUpperCase()+ "'"
    document.getElementById("word-explanation").appendChild(h1);
}
}

function freezeGameAssets(){
    document.getElementById("try-btn").disabled = true;
    document.getElementById("letter-guess").disabled = true;
    document.getElementById("announcement").remove()
    document.getElementById("reset-btn").disabled = false;
}

function hangmanPictureChanger(){
    document.getElementById("hangman-pic").src = "../game-status-images/" + guess_count+".jpg"
}

function resetGame(){
    document.getElementById("try-btn").disabled = false;
    document.getElementById("letter-guess").disabled = false;
    document.getElementById("reset-btn").disabled = true;
    document.getElementById("game-result").remove();
    let parent = document.getElementById("game-plot");
    document.getElementById("vh30").style.backgroundColor = "white";
    document.getElementById("hangman-pic").src = "../game-status-images/0.jpg"
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    guess_count = 0 ;
    game_winner_count = 0;
    randomNumber = 0 ;
    initiateGame();
}

function letterChecker(guess){
let number_counter = []
let word_array = word[randomNumber].split("");
for(let i =0; i<word_array.length; i++){
    if(word_array[i]==guess){
        number_counter.push(i)
    }
}
return number_counter
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  