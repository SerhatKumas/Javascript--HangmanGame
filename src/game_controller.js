let guess_count = 0 ;
let game_winner_count = 0;
let randomNumber = 0 ;

word = ["car", "bus", "ferry", "train", "metro"];
word_explanation = ["Special transportation vehicle", "Public transportation vehicle", "Public transportation used in sea", "Public transportation used between cities", "Public transportation used in city"];

function initiateGame(){
randomNumber = getRandomInt(word.length);
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
    placeTheLetters(letter_guess);
}

function placeTheLetters(guess){
    if(word[randomNumber].split('').indexOf(guess) > -1){
        let letter_array = letterChecker(guess);
        letter_array.forEach(element => {
            document.getElementById("letter-"+element).innerHTML = guess.toUpperCase();
            game_winner_count++;
        });

    }
    else{
        
    }
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
  