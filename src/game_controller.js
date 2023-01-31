letter_guess_count = 0 ;

word = ["car", "bus", "ferry", "train", "metro"];
word_explanation = ["Special transportation vehicle", "Public transportation vehicle", "Public transportation used in sea", "Public transportation used between cities", "Public transportation used in city"];

function initiateGame(){
let randomNumber = getRandomInt(word.length);
let p = document.createElement("p");
p.innerHTML = word_explanation[randomNumber].toUpperCase();
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
    letter_guess = document.getElementById("letter-guess").value;
    document.getElementById("letter-guess").value = "";
    chechkGame(letter_guess);
}

function chechkGame(guess){
    console.log(guess);
    //Guessing letter and placing in the word game
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  