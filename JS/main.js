
var question = document.querySelector(".Question-box");
var home = document.querySelector(".main-box");
var resultBox = document.querySelector(".result-box");
var currentQuestion = document.querySelector(".currentQuestion");
var accountbox = document.querySelector(".account-box");

// button on the finish card
var finish = document.querySelector(".finish")

// Global varibles that need to change throughout the program
var countCorrect = 0;
var quesNum;
var grade;

// ------------------------------------------
var operation;
chooseOperation();
var level = 1;

var operArr = [[false, true, true, true, true], [false, true, true, true, true], [false, true, true, true, true], [false, true, true, true, true]];
var AddIndex = 0;
var MultIndex = 0;
var MinusIndex = 0;
var DivIndex = 0;
// -----------------------------------------
var Actualanswer;

// numbers
var firstNum;
var secondNum;


document.querySelector(".Begin").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(level)
    // Sets up for new start
    // Remove Button that is there 
    removeCurrentButton()
    // Add new Button
    AddandCreateButton("Next")
    // clears the input feild
    document.querySelector(".result > input").value = " ";
    // reset Question counter
    quesNum = 1;
    // removes the home card
    home.classList.add("hidden")

    getlevel()


    // handle displaying numbers in the cards
    ShowNumberOnCard();
    // displys the question card
    question.classList.remove("hidden")
})

function checkAnswer() {
    // gets the answer to the question
    var answer = Actualanswer;


    // Collect the user's input
    var UserAnswer = document.querySelector(".result > input").value;

    // check the answer
    if (UserAnswer == answer) {
        // increment counter for correct ansers
        countCorrect++;
    }
    quesNum++;

    // Check the amount of questions asked
    if (quesNum == 15) {
        // accumulate student result
        answerReport()
        // Remove Button that is there 
        removeCurrentButton()
        // Add new Button
        AddandCreateButton("Get Result", 1)
    }
}

// removes the check button from the page
function removeCurrentButton() {
    var CheckButton = document.querySelector(".hidebtn");
    CheckButton.parentNode.removeChild(CheckButton)
}

// adds new button to finish the test
function AddandCreateButton(buttonName, btnType = 0) {

    // creates new element
    var newButton = document.createElement('button');

    // adds a class to the element
    newButton.classList.add("answer-check");
    newButton.classList.add("hidebtn");

    // changes the text in the element
    newButton.innerHTML = buttonName

    // Puts it on the page
    document.querySelector(".buttonSection").appendChild(newButton);

    if (btnType == 1) {
        // adds functionality to button
        newButton.addEventListener("click", () => {
            checkAnswer();
            question.classList.add("hidden");
            resultBox.classList.remove("hidden");
        })
    } else {
        // adds functionality to button
        newButton.addEventListener("click", (e) => {
            e.preventDefault();
            checkAnswer();
            document.querySelector(".result > input").value = " ";
            if (quesNum < 16) {
                ShowNumberOnCard();
            }
        })
    }
}



function answerReport() {
    if (countCorrect == 0) {
        grade = 0
    } else {
        grade = Math.floor(Math.round(countCorrect / quesNum));
    }

    if (grade > 80) {
        updateLevel(operation)
        document.querySelector(".message").innerHTML = `Congrats you passed <i class="fas fa-star animated rubberBand" style="color: gold;font-size: 40px"></i>`
    }
    // displays the percentage on the finish page
    document.querySelector(".bigNumber > span").innerHTML = grade;
}


function chooseOperation() {
    var arr = document.querySelectorAll(".operation");
    for (let index = 0; index < arr.length; index++) {
        var element = arr[index];
        if (element.checked) {
            operation = index;
            break;
        }
    }
}

function getlevel() {
    var listLevels = document.querySelector(".levelSelect");
    level = listLevels.options[listLevels.selectedIndex].value;
}


document.querySelector(".levelSelect").addEventListener("click", () => {
    getlevel()
})


function ShowNumberOnCard() {


    // get all the things on the page that needs to change
    // get the values that should change
    firstNum = document.querySelector(".fNum > span");
    secondNum = document.querySelector(".sNum > span");
    oper = document.querySelector(".oper > span");

    // show the current question
    currentQuestion.innerHTML = quesNum;

    // change them
    var val = CalculationsAndAnswer();
    firstNum.innerHTML = val.firstNumber;
    secondNum.innerHTML = val.secondNumber;

    // console.log("num 1: " + val.firstNumber);
    // console.log("num 2: " + val.secondNumber);


    // change the sign
    if (operation == 0) {
        oper.innerHTML = "+";
    }
    else if (operation == 1) {
        oper.innerHTML = "-";
    }
    else if (operation == 2) {
        oper.innerHTML = "X";
    }
    else {
        oper.innerHTML = "/";
    }
}

// Whern the finish button is clicked
finish.addEventListener("click", () => {
    resultBox.classList.add("hidden")
    home.classList.remove("hidden")
})

document.querySelector(".home").addEventListener("click", () => {
    accountbox.classList.add("hidden")
    home.classList.remove("hidden")
})



function CalculationsAndAnswer() {
    console.log("here")
    switch (level) {
        case '1':
            while (true) {
                var num1 = Math.floor((Math.random() * 9) + 1);
                var num2 = Math.floor((Math.random() * 9) + 1);
                if (Number.isInteger(num1 / num2)) {
                    break;
                }
            }
            break;
        case '2':
            while (true) {
                var num1 = Math.floor((Math.random() * 9) + 1);
                var num2 = Math.floor((Math.random() * 99) + 10);
                if (Number.isInteger(num2 / num1)) {
                    break;
                }
            }
            break
        case '3':
            while (true) {
                var num1 = Math.floor((Math.random() * 90) + 10);
                var num2 = Math.floor((Math.random() * 99) + 10);
                if (Number.isInteger(num2 / num1)) {
                    break;
                }
            }

            break;
        case '4':
            while (true) {
                var num1 = Math.floor((Math.random() * 99) + 10);
                var num2 = Math.floor((Math.random() * 999) + 100);
                if (Number.isInteger(num2 / num1)) {
                    break;
                }
            }

            break;

        case '5':
            while (true) {
                var num1 = Math.floor((Math.random() * 999) + 100);
                var num2 = Math.floor((Math.random() * 999) + 100);
                if (Number.isInteger(num2 / num1)) {
                    break;
                }
            }

            break
    }


    switch (operation) {
        case 0:
            Actualanswer = num1 + num2;
            break;
        case 1:
            Actualanswer = num1 - num2;
            break;
        case 2:
            Actualanswer = num1 * num2;
            break;
        case 3:
            Actualanswer = num1 / num2;
            break;
    }

    return { firstNumber: num1, secondNumber: num2 }
}


function updateLevel(opCode) {
    var getOperationVal = operArr[operation];
    switch (opCode) {
        case 0:
            if (AddIndex <= 5) {
                for (let x = AddIndex; x < getOperationVal.length; x++) {
                    // console.log(getOperationVal[x])
                    if (getOperationVal[x] == false) {
                        getOperationVal[x] = true
                        getOperationVal[x + 1] = false;
                        AddIndex = x + 1;
                        break;
                    };
                }
            }
            break;
        case 1:
            for (let x = MinusIndex; x < getOperationVal.length; x++) {
                // console.log(getOperationVal[x])
                if (getOperationVal[x] == false) {
                    getOperationVal[x] = true
                    getOperationVal[x + 1] = false;
                    MinusIndex = x + 1;
                    break;
                };
            }
            break;

        case 2:
            for (let x = MultIndex; x < getOperationVal.length; x++) {
                // console.log(getOperationVal[x])
                if (getOperationVal[x] == false) {
                    getOperationVal[x] = true
                    getOperationVal[x + 1] = false;
                    MultIndex = x + 1;
                    break;
                };
            }
            break;
        case 3:
            for (let x = DivIndex; x < getOperationVal.length; x++) {
                // console.log(getOperationVal[x])
                if (getOperationVal[x] == false) {
                    getOperationVal[x] = true
                    getOperationVal[x + 1] = false;
                    DivIndex = x + 1;
                    break;
                };
            }
            break
    }

    changeLevel()
}

function changeLevel(operChoice) {

    chooseOperation();

    var levelSelection = document.querySelector(".levelSelect");
    levelSelection.parentNode.removeChild(levelSelection)


    var selection = document.querySelector(".selectionDiv");

    var newSelect = document.createElement("select");
    newSelect.classList.add("levelSelect")

    var operationSelect = operArr[operation]




    for (let x = 0; x < operationSelect.length; x++) {
        var option = document.createElement("option");
        option.value = x + 1;
        option.text = "level " + (x + 1);
        option.disabled = operationSelect[x];
        // console.log(operationSelect[x])
        option.addEventListener("click", () => {
            getlevel()
        })
        newSelect.add(option)
    }

    if (newSelect.length > 5) {
        newSelect[5].parentNode.removeChild(newSelect[5])
        document.querySelector(".operation").disabled = true;
    }

    selection.appendChild(newSelect)
}