buttonList = document.getElementsByClassName("calc-button");
screenTag = document.getElementsByClassName("screen")[0];
numHolder = "";
trackedSign = "";
prevClicked = "";
signDictionary = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b
};
signKeys = Object.keys(signDictionary);

for (var i = 0; i < buttonList.length; i++) {
  var buttonValue = buttonList[i].innerHTML;
  buttonList[i].addEventListener("click", replaceScreenValue);
}

function replaceScreenValue(evt) {
  var newValue;
  var currValue = screenTag.innerHTML;
  var button = evt.target;
  buttonValue = button.innerHTML;
  if (isNaN(parseFloat(buttonValue))) {
    handleSymbol(button, currValue);
  } else if (buttonValue >= 0 && buttonValue < 10) {
    if (currValue == "0" || signKeys.includes(prevClicked)) {
      screenTag.innerHTML = buttonValue;
      prevClicked = buttonValue;
      return;
    }   
    newValue = currValue + buttonValue;
    screenTag.innerHTML = newValue;
  }
  prevClicked = buttonValue;
}

function handleSymbol(button, currValue) {
  buttonValue = button.innerHTML;
  if (buttonValue == "C") {
    screenTag.innerHTML = 0;
    numHolder = "";
    trackedSign = "";
    prevClicked = "";
  } else if (buttonValue == "&lt;--") {
    if (currValue.length == 1) {
      newValue = 0;
    } else {
      newValue = currValue.slice(0, -1);
    }
    screenTag.innerHTML = newValue;
  } 
  else if (buttonValue == "+/-"){
    let floatForm = -parseFloat(currValue);
    screenTag.innerHTML = floatForm.toString();
  }

  else if (buttonValue == ".") {
    if (!currValue.includes(".")) {
      newValue = currValue + buttonValue;
      screenTag.innerHTML = newValue;
    }
  } else {
    arithHelper(buttonValue);
    trackedSign = button;
  }
  numHolder = screenTag.innerHTML;
}

function arithHelper(sign) {
    if (signKeys.includes(prevClicked)) {
        trackedSign = button;
        return;
    }
  if (numHolder == "" && screenTag.innerHTML == 0) {
    return;
  }
  if (numHolder == "") {
    numHolder = screenTag.innerHTML;
    // if (signKeys.includes(sign)) {
    //   screenTag.innerHTML = 0;
    // }
    return;
  }
  if (sign == "=") {
    // if (rightNum != ""){
    //     leftNum = rightNum;
    // }
    // rightNum = screenTag.innerHTML;
    if (signKeys.includes(trackedSign.innerHTML)) {
      screenTag.innerHTML = signDictionary[trackedSign.innerHTML](
        parseFloat(numHolder),
        parseFloat(screenTag.innerHTML)
      );
    }
  }
  if (screenTag.innerHTML != "0" && signKeys.includes(trackedSign.innerHTML)) {
    numHolder = screenTag.innerHTML;
  }
//   if (signKeys.includes(sign)) {
//     screenTag.innerHTML = 0;
//   }
}
