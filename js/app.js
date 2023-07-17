let btns = document.querySelectorAll(".btn");
let stringToEval = "0";
let answered = false;

// handle clicks
for (let btn of btns) {
  btn.addEventListener("click", () => {
    let btnVal = btn.attributes[0].value;
    if (btnVal == "CE" && !answered) {
      stringToEval = stringToEval.slice(0, -1);
      calcDisplay.innerHTML = calcDisplay.innerHTML.slice(0, -1);
    } else if (btnVal == "CE" && answered) {
      stringToEval = "";
      calcDisplay.innerHTML = "";
    }
    if (btnVal !== "=" && btnVal !== "CE" && btnVal !== "AC") {
      if (btnVal !== "%") {
        stringToEval += btnVal;
      }
      calcDisplay.innerHTML += btn.innerHTML;
      answered = false;
    }
    if (btnVal == "=") {
      stringToEval = eval(stringToEval).toFixed(3);
      if (stringToEval !== undefined) {
        calcDisplay.innerHTML = stringToEval;
      }
      answered = true;
    }
    if (btnVal == "AC") {
      stringToEval = "";
      calcDisplay.innerHTML = "";
    }
  });
}

// handle keypress
window.addEventListener("keydown", (evt) => {
  for (let btn of btns) {
    btn.blur();
  }
  if (evt.key == "Enter") {
    stringToEval = eval(stringToEval).toFixed(3);
    calcDisplay.innerHTML = stringToEval;
    answered = true;
  }
  if (evt.key == "Backspace" && !answered) {
    stringToEval = stringToEval.slice(0, -1);
    calcDisplay.innerHTML = calcDisplay.innerHTML.slice(0, -1);
  } else if (evt.key == "Backspace" && answered) {
    stringToEval = "";
    calcDisplay.innerHTML = "";
  }
  if (
    (eval(evt.key >= 0) && eval(evt.key <= 9)) ||
    evt.key == "-" ||
    evt.key == "*" ||
    evt.key == "/" ||
    evt.key == "+" ||
    evt.key == "(" ||
    evt.key == ")"
  ) {
    if (evt.key == "*") {
      calcDisplay.innerHTML += "&times;";
    } else if (evt.key == "/") {
      calcDisplay.innerHTML += "&divide;";
    } else {
      calcDisplay.innerHTML += evt.key;
    }
    stringToEval += evt.key;
    answered = false;
  }
});
