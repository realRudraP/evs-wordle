const apiURL="http://127.0.0.1:8000/"
const words=["Waste","Reuse","Reduce","Recycle","Landfill","Mercury","Battery","Toxic"]
let indeces=[]
let lengths=[]
let generated=0
let guessesRemaining=6
let nextLetter=0
let currentGuess=[]
let startTime=0,endTime;
let elapsedTime
let wordNumber=0;
let wins=0
let timeCont=1
let timeFun
let usedGuesses=0
let loggedin=localStorage.getItem("firstTime")

if(loggedin!="false"){
  window.location.replace("/index.html")
}

document.getElementById("username").innerHTML=localStorage.getItem("username")

if(!generated){
  let count=0
  while(count<3){
  let rn=Math.floor(Math.random()*7)
  if(indeces.includes(rn)){
    continue;
  }else{
    indeces.push(rn)
    lengths.push(words[rn].length)
    count++;
  }
  }
  generated=1;
  startBoard(words[indeces[0]].length)
}



function updateTime(){
    if(!timeCont){
     return -1   
    }
    currentTime=Date.now()
    elapsed=currentTime-startTime;
    const minutes = Math.floor(elapsed / (1000 * 60)); // Convert to minutes
    const seconds = elapsed % (1000 * 60) / 1000; 
    document.getElementById("mins").innerHTML=minutes.toString().padStart(2,"0");
    document.getElementById("sec").innerHTML=seconds.toFixed().padStart(2,"0");
}

function startBoard(WORD_LENGTH){
    guessesRemaining=6
    nextLetter=0
    currentGuess=[]
    let board= document.getElementById("game-board");
    for(let i=0;i<6;i++){
        let row=document.createElement("div")
        row.className="letter-row"
        for(let j=0;j<WORD_LENGTH;j++){
            let box= document.createElement("div")
            box.className="letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}

function generateBoard(length){
    startBoard(length)
}

document.addEventListener("keyup",(e)=>{
    handleButton(e)
})
const buttons= document.querySelectorAll('.keyboard-button');
buttons.forEach(button=>{
    button.addEventListener('click',handleButton)
})

function clearAndResetBoard() {
    const rows = document.querySelectorAll(".letter-row");
    rows.forEach(row => {
      row.parentNode.removeChild(row);
    });
    nextLetter = 0;
    guessesRemaining = 6;
    currentGuess = [];
  }

function handleButton(event){
    if(!startTime){
        startTime=Date.now()
        updateTime()
        timeFun=setInterval(updateTime,1000)
        console.log(startTime)
    }
    let enteredKey
    if(event.type==="click"){
        const clickedButton=event.target;
        enteredKey=clickedButton.textContent;
    }else{
        enteredKey=String(event.key)
    }
    
    if(guessesRemaining===0){
        return
    }
    if((enteredKey==="Backspace"||enteredKey==="Del")&&nextLetter!=0){
        deleteLetter()
        return
    }
    if(enteredKey==="Enter"){
        checkGuess()
        return
    }
    let found=enteredKey.match(/[a-z]/gi)
    if(!found||enteredKey.length>1)
        return
    else{

        insertLetter(enteredKey)
    }
}

    /*function checkGuess() {
        let guess = "";
        const currentRow = document.getElementsByClassName("letter-row")[6-guessesRemaining];
        for (let i = 0; i < lengths[wordNumber]; i++) {
          const box = currentRow.children[i];
          const letter = box.textContent;
          guess += letter;
        }
        const data = { id: indeces[wordNumber], u_guess: guess };
        fetch(apiURL + "checkguess", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            let res = data.result;
            for (let i = 0; i < res.length; i++) {
              let letter = document.getElementsByClassName("letter-row")[6- guessesRemaining].children[i];
              if (res[i] === 'a') {
                letter.style.backgroundColor = "green";
                letter.style.color = "white";
              } else if (res[i] === 'b') {
                letter.style.backgroundColor = "#ff9900";
                letter.style.color = "white";
              } else {
                letter.style.backgroundColor = "grey";
                letter.style.color = "white";
              }
            }
            if (data.correct) {
              wins++;
              toastr["success"]("Congratulations!","Correct answer!")
              if(wordNumber<3){
              clearAndResetBoard();
              wordNumber++;
              generateBoard(lengths[wordNumber])
                }else{
                wordNumber++;
                }
            } else {

              guessesRemaining--;
              nextLetter=0
              if(guessesRemaining<=0){
                toastr["info"]("You ran out of guesses! Try next time", "Guesses finished!")
              }
            }
            document.getElementById("score").innerHTML=wins;
            if(wordNumber===3){
                alert("Thanks for playing! Check your score on the next screen")
            }
          })

      }
      */

function checkGuess(){
  usedGuesses++;
  let guess = "";
  const currentRow = document.getElementsByClassName("letter-row")[6-guessesRemaining];
  for (let i = 0; i < lengths[wordNumber]; i++) {
    const box = currentRow.children[i];
    const letter = box.textContent;
    if(letter==""){
      toastr["error"]("Please do not leave any blank spaces","Blank space found!")
      return -1
    }
    guess+= letter;
  }
  let out=""
  let answer=words[indeces[wordNumber]].toLowerCase()
  guess=guess.toLowerCase()
  let correct=1
  for (let i = 0; i < lengths[wordNumber]; i++) {
      if(guess[i]==answer[i]){
        out+="a"
      }
      else if(answer.includes(guess[i])){
        out+="b"
        correct=0
      }else{
        out+="c"
        correct=0
      }
  }
  console.log(out)
  for (let i = 0; i < lengths[wordNumber]; i++) {
    let letter = document.getElementsByClassName("letter-row")[6- guessesRemaining].children[i];
    if (out[i] === 'a') {
      letter.style.backgroundColor = "green";
      letter.style.color = "white";
    } else if (out[i] === 'b') {
      letter.style.backgroundColor = "#ff9900";
      letter.style.color = "white";
    } else {
      letter.style.backgroundColor = "grey";
      letter.style.color = "white";
    }
  }
  if (correct) {
    wins++;
    toastr["success"]("Congratulations!","Correct answer!")
    if(wordNumber<3){
    clearAndResetBoard();
    wordNumber++;
    generateBoard(lengths[wordNumber])
      }else{
      wordNumber++;
      }
  } else {

    guessesRemaining--;
    nextLetter=0
    if(guessesRemaining<=0){
      toastr["info"]("You ran out of guesses! Try next time", "Guesses finished!")
    }
  }
  document.getElementById("score").innerHTML=wins;
  if(wordNumber===3){
      timeCont=0
      clearInterval(timeFun)
      endTime=Date.now()
      let elapsed=endTime-startTime
      elapsedTime=Math.floor(elapsed / (1000));
      elapsedSecs=elapsedTime.toString()
      localStorage.setItem("seconds",elapsedSecs)
      const stats={playerName:localStorage.getItem("username"),wins:wins,time_taken:parseFloat(localStorage.getItem("seconds")),guesses:usedGuesses}
      fetch(apiURL + "postscore", {
        method: "POST",
        body: JSON.stringify(stats),
      })
      alert("Thanks for playing! Check your score on the next screen")
  }
}
  


      
  


function insertLetter(enteredKey){
    if(nextLetter===(lengths[wordNumber]+1)){
        return
    }
    enteredKey = enteredKey.toLowerCase()
    let row=document.getElementsByClassName("letter-row")[6-guessesRemaining]
    let box= row.children[nextLetter]
    box.textContent=enteredKey
    box.classList.add("filled-box")
    currentGuess.push(enteredKey)
    nextLetter+=1
}
function deleteLetter(){
    let row= document.getElementsByClassName("letter-row")[6-guessesRemaining]
    let box= row.children[nextLetter-1]
    box.textContent=""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter-=1
}


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
