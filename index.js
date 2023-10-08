document.getElementById("inputTextarea").focus();

// mobile menu
// -------------------------------------------------------
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener('click', () =>{
  navbarMenu.classList.toggle('is-active');
  event.preventDefault()
})


// ============================================================================
document.getElementById('qaForm').addEventListener('submit', (evt) => {
  evt.preventDefault();
  let InputStr = document.getElementById("inputTextarea").value;
  if(InputStr.trim() === '') return;
  createCiteDisplay(evt);
  
})

// ============================================================================
document.getElementById('submitRandom').addEventListener('click', (evt) => {
  evt.preventDefault();
  createCiteDisplay(evt);
  
})

// ============================================================================
document.getElementById('resetButton').addEventListener('click', (evt) => {
  evt.preventDefault();
  document.getElementById("qa-block").replaceChildren();
  document.getElementById("inputTextarea").focus();
  
})


// ============================================================================
  function createCiteDisplay(evt) {

  let InputStr = document.getElementById("inputTextarea").value;

  if (InputStr.trim() === '') InputStr = '* Random Cite *';

  const newArticleElem = document.createElement('article');
  newArticleElem.classList.add("message");
  newArticleElem.classList.add("is-primary");

  const newMessageHeaderElem = document.createElement('div');
  newMessageHeaderElem.classList.add("message-header");

  const newMessageHeaderElemContainer = document.createElement('p');

  newMessageHeaderElemContainer.innerText = GetCurrentDateTime() +'\n'+ InputStr;
  
  const newMessageHeaderDelButton = document.createElement('button');
  newMessageHeaderDelButton.classList.add("delete");
  newMessageHeaderDelButton.addEventListener("click", delCiteRow);

  
  const newMessageBodyElem = document.createElement('div');
  newMessageBodyElem.classList.add("message-body");
  let arrAns = getAnswer(InputStr, citeArr);

  newMessageBodyElem.innerHTML = `${arrAns[0]} <p style="text-align: right"> 
  <cite>${arrAns[1]}</cite></p>` ;
    
  newMessageHeaderElem.appendChild(newMessageHeaderElemContainer);
  newMessageHeaderElem.appendChild(newMessageHeaderDelButton);

  newArticleElem.appendChild(newMessageHeaderElem);
  newArticleElem.appendChild(newMessageBodyElem);

  let qaBlock = document.getElementById("qa-block");
  qaBlock.insertBefore(newArticleElem, qaBlock.firstChild);

  document.getElementById("inputTextarea").value = '';
  // document.getElementById("inputTextarea").focus();
}

// -------------------------------------------------------
const readStringFromFileAtPath = (pathOfFileToReadFrom) => {
  var request = new XMLHttpRequest();
  request.open("GET", pathOfFileToReadFrom, false);
  request.send(null);
  var returnValue = request.responseText;

  return returnValue;
}

// -------------------------------------------------------
let textFromFile = readStringFromFileAtPath ( "./assets/cites.txt" );
let citeArr = textFromFile.split(/\d{1,3}.\s/);
citeArr.shift();



// -------------------------------------------------------
function getCiteRandom(){
  let lenArr = citeArr.length
  let index = Math.floor(Math.random()*(lenArr+1));

  let arrResponse = citeArr[index].split(/\n/);
  arrResponse.pop();
  return arrResponse;
}


// -------------------------------------------------------
function GetCurrentDateTime(){
  let currentdate = new Date(); 

  let currDate = '' + currentdate.getDate();
  currDate = currDate.length < 2 ? '0'+currDate : currDate;

  let curMonth = '' + (currentdate.getMonth()+1);
  curMonth = curMonth.length < 2 ? '0'+curMonth : curMonth;

  let curHours = ''+ currentdate.getHours();
  curHours = curHours.length < 2 ? '0'+curHours: curHours;

  let curMinutes = '' + currentdate.getMinutes();
  curMinutes = curMinutes.length < 2 ? '0' + curMinutes: curMinutes;

  let curSeconds = '' + currentdate.getSeconds();
  curSeconds = curSeconds.length < 2? '0' + curSeconds: curSeconds;

  let curMilSeconds = '' + currentdate.getMilliseconds;
  curMilSeconds = curMilSeconds.length === 1? '00' + curSeconds: curSeconds;
  curMilSeconds = curMilSeconds.length === 2? '0' + curSeconds: curSeconds;

  let datetime =    currDate + "."
                  + curMonth  + "." 
                  +  currentdate.getFullYear() + " @ "  
                  +  curHours + ":"  
                  +  curMinutes + ":" 
                  +  curSeconds + "." 
                  +  curMilSeconds;

  return datetime;
}

// -------------------------------------------------------
function delCiteRow(event) {
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

  // document.getElementById("inputTextarea").focus();
}

// -------------------------------------------------------
function getAnswer(question, arrAnswers){
  let rez='';
  let minWordLength = 3;
  
  let arrQue = question.split(/[\w.,!"'\/$ ]+/).filter( (el) => {
    if (el.length >= minWordLength) {
      return el
    }
  });
  
  let arr_1 = Array.from(new Set(arrQue));
  let arr_2 = arr_1.sort((a, b) => b.length - a.length);
  
  for(let i=0; i < arr_2.length; i++){
    
    for(let j=0; j < arrAnswers.length; j++){
      if (arrAnswers[j].includes(arr_2[i])) {
        let arrResp = arrAnswers[j].split(/\n/);
        arrResp.pop();
        return arrResp;
     
      }
    }
    
  }
  
  return getCiteRandom();
}
