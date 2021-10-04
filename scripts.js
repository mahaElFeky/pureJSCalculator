let currentValues = ["", ""];
let currentOp = ["", "", "", ""];
let parentheses = [];
let parenthesesEquation = "";
let outputString = "";
let result;
let memory = [];
let zeros = false;

let lastValue;
let togglemenu = false;
let historyP = [];
let saveInMemoryArr = [];
let activeTab;
let standardWidth = document.getElementById("calculatorBody").offsetWidth;
console.log(standardWidth);

function menuToggle() {
    togglemenu = !togglemenu;


    if (togglemenu === true) {
        let newWidth = standardWidth + 100;
        document.getElementById("menuHeader").innerHTML = "Scientific";
        document.getElementById("calculatorBody").style.width = newWidth + `px`;
        document.getElementById("screen").style.width = newWidth - 53 + `px`;
        document.getElementById("scientific1").style.display = "block";
        document.getElementById("scientific2").style.display = "block";
        document.getElementById("historyIcon").style.left = newWidth - 78 + `px`;
        document.getElementById("memoryBody").style.width = newWidth + `px`;
    } else {
        document.getElementById("menuHeader").innerHTML = "Standard";
        document.getElementById("calculatorBody").style.width = standardWidth + `px`;
        document.getElementById("screen").style.width = standardWidth - 40 + `px`;
        document.getElementById("scientific1").style.display = "none";
        document.getElementById("scientific2").style.display = "none";
        document.getElementById("historyIcon").style.left = standardWidth - 65 + `px`;
    }

}

function showMemorybody() {
    document.getElementById("memoryBody").style.display = "block";
}

function hideMemorybody() {
    document.getElementById("memoryBody").style.display = "none";
}

function openTab(evt, tabname) {
    activeTab = tabname;
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        // tablinks.offsetWidth = standardWidth / 2 + `px`;
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}


function showValue(value) {
    if (value === "(") {
        parentheses.push(value);
        document.getElementById("equation").innerHTML += value;
    } else if (value === ")") {
        parentheses.push(value);
        document.getElementById("equation").innerHTML += value;
    } else
    if (value === "zeros") {
        value = "00";
        zeros = true;
        document.getElementById("equation").innerHTML += value;
    } else if (value === "delete") {
        lastValue = outputString.substr(outputString.length - 1, 1);
        document.getElementById("equation").innerHTML = outputString.slice(0, -1);
    } else if (value === "sqr") {
        document.getElementById("equation").innerHTML = "sqr" + "(" + currentValues[0] + ")";
    } else if (value === "denominator") {
        document.getElementById("equation").innerHTML = 1 + `/ ` + currentValues[0];
    } else if (value === "sqroot") {
        document.getElementById("equation").innerHTML = `√` + currentValues[0];
    } else if (value === "log") {
        document.getElementById("equation").innerHTML = "log" + "(" + currentValues[0] + ")";
    } else if (value === "π") {
        document.getElementById("equation").innerHTML += value;
        document.getElementById("constant").innerHTML = "(π = 3.14159)";
    } else if (value === "e") {
        document.getElementById("equation").innerHTML += value;
        document.getElementById("constant").innerHTML = "(e = 2.7182818284590452353602874713527)";
    } else if (value === "exp") {
        document.getElementById("equation").innerHTML = "E" + "(" + currentValues[0] + ")";
        document.getElementById("constant").innerHTML = "(e = 2.7182818284590452353602874713527)";
    } else if (value === "ve") {
        value = -1;
        document.getElementById("equation").innerHTML += `(-1 )`;
    } else if (value === "xpower") {
        document.getElementById("equation").innerHTML = currentValues[0].sub() + currentValues[1];
    } else if (value === "10power") {
        document.getElementById("equation").innerHTML = `10`.sub() + currentValues[0];
    } else if (value === "2powerN") {
        document.getElementById("equation").innerHTML = currentValues[0].sub() + 4;
    } else if (value === "mod") {
        document.getElementById("equation").innerHTML += value;
        value = "%";
    } else {
        document.getElementById("equation").innerHTML += value;
    }
    outputString = document.getElementById("equation").innerHTML;
    if (outputString.substr(outputString.length - 2, 1) === "=") {
        clearAll();
        outputString = outputString.substr(outputString.length - 1, 1);
        document.getElementById("equation").innerHTML = outputString;
    }

    if (parentheses.length === 2) {
        parenthesesEquation = outputString.substr(outputString.indexOf("("), outputString.indexOf(")") + 1);
        console.log(parentheses);
        subParameters(parenthesesEquation);
        console.log(parenthesesEquation);
    }
    subParameters(value);

}

function subParameters(value) {
    let i;
    let j;
    let k;
    let a;
    let b;
    let op;
    if (value === "delete") {
        for (i = 0; i < currentOp.length; i++) {
            if (lastValue === currentOp[i]) {
                currentOp[i] = "";
                break;
            }
        }
        for (k = 0; k < currentValues.length; k++) {
            for (j = 0; j < currentValues[k].length; j++) {
                if (lastValue === currentValues[k][j]) {
                    currentValues[k] = currentValues[k].slice(0, -1)
                    break;
                }
            }
        }
        if (lastValue === "=") {
            document.getElementById("equation").innerHTML = "";
        }
    }
    if (typeof value !== "number" && value !== "00" && value !== "." &&
        value !== "delete" && value !== "π" && value !== "e" &&
        value !== "(" && value !== ")" && value !== parenthesesEquation) {
        if (currentOp[0] === "" && value === outputString.substr(0, 1)) {
            currentOp[0] = outputString.substr(0, 1);
        } else
        if (currentOp[1] === "") {
            currentOp[1] = value;
        } else if (currentOp[1] !== "" && currentOp[2] === "") {
            currentOp[2] = value;
        } else if (currentOp[2] !== "") {
            currentOp[3] = value;
        }
    } else if (typeof value === "number" || zeros === true || value === "." ||
        value === "π" || value === "e" || value === parenthesesEquation) {
        if (currentOp[1] === "") {
            value === "π" ?
                currentValues[0] !== "" ?
                currentValues[0] *= 3.14159 :
                currentValues[0] = 3.14159 :
                value === "e" ?
                currentValues[0] !== "" ?
                currentValues[0] *= 2.7182818284590452353602874713527 :
                currentValues[0] = 2.7182818284590452353602874713527 :
                value === -1 ?
                currentValues[0] !== "" ?
                currentValues[0] *= -1 :
                currentValues[0] = -1 :
                value === parenthesesEquation ?
                currentValues[0] = value :
                currentValues[0] += value;
        } else {
            value === "π" ?
                currentValues[1] !== "" ?
                currentValues[1] *= 3.14159 :
                currentValues[1] = 3.14159 :
                value === "e" ?
                currentValues[1] !== "" ?
                currentValues[1] *= 2.7182818284590452353602874713527 :
                currentValues[1] = 2.7182818284590452353602874713527 :
                value === -1 ?
                currentValues[1] !== "" ?
                currentValues[1] *= -1 :
                currentValues[1] = -1 :
                value === parenthesesEquation ?
                currentValues[1] = value :
                currentValues[1] += value;
        }
        zeros = false;
    }
    currentValues[0] === "" || currentValues[0] === "0" ? a = 0 : a = parseFloat(currentValues[0]);
    currentValues[1] === "" || currentValues[1] === "0" ? b = 0 : b = parseFloat(currentValues[1]);
    let bNum = parenthesesEquation.slice(parenthesesEquation.indexOf(currentOp[2]) + 1, -1);
    if (currentValues[1] === parenthesesEquation) {
        // a = parseFloat(parenthesesEquation[1]);
        a = parseFloat(parenthesesEquation.slice(1, parenthesesEquation.indexOf(currentOp[2])));
        op = currentOp[2];
        b = parseFloat(parenthesesEquation.slice(parenthesesEquation.indexOf(currentOp[2]) + 1, -1));

        equation(a, b, op);
        if (currentOp[3] !== "") {
            a = result;
            op = currentOp[3];
            b = parseFloat(parenthesesEquation.slice(parenthesesEquation.indexOf(bNum) + 2, -1));
            console.log(b);
            equation(a, b, op);
        }
        currentValues[1] = result;
        parentheses = [];
    } else if (currentOp[2] !== "" && parentheses.length === 0) {
        op = currentOp[1];

        equation(a, b, op);
    }
    console.log(parenthesesEquation);
    console.log(currentValues);
    console.log(currentOp);
    console.log(outputString);
}

function equation(a, b, op) {
    currentOp[0] === "-" ?
        a *= -1 :
        a = a;
    currentOp[2] === "-" && currentOp[1] === "-" ?
        b *= -1 :
        b = b;
    op === "-" ?
        result = a - b :
        op === "+" ?
        result = a + b :
        op === "*" ?
        result = a * b :
        op === "/" ?
        result = a / b :
        op === "%" ?
        result = a % b :
        op === "=" ?
        result = a :
        op === "sqr" ?
        result = Math.pow(a, 2) :
        op === "denominator" ?
        result = 1 / a :
        op === "sqroot" ?
        a !== 0 ?
        result = Math.sqrt(a) :
        result = Math.sqrt(b) :
        op === "xpower" ?
        result = a ** b :
        op === "10power" ?
        result = 10 ** a :
        op === "2powerN" ?
        result = a ** 4 :
        op === "ln" ?
        result = Math.log(a) :
        op === "exp" ?
        result = 2.7182818284590452353602874713527 ** a :
        op === "log" ?
        result = log10(a) :
        result = " ";
    if (op === "!") {
        result = a;
        for (let i = (a - 1); i > 0; i--) {
            result *= i;
        }
    }
    showResult(result);
}

function log10(val) {
    return Math.log(val) / Math.LN10;
    // same as: return Math.log(val) / Math.log(10);
}

function showResult(rslt) {
    if (currentValues[1] === parenthesesEquation) {
        currentValues[1] = rslt;
        if (currentOp[3] !== "=") {
            currentValues[1] = rslt;
        }
        currentOp[2] = "";
    } else {
        if (currentOp[2] !== "=" && currentOp[2] !== "") {
            currentValues[0] = rslt;
            currentOp[1] = currentOp[2];
            currentOp[2] = "";
            document.getElementById("equation").innerHTML = currentValues[0] + currentOp[1];

        } else if (currentOp[2] === "=") {
            document.getElementById("result").innerHTML = rslt;
            memory.push(rslt);
            historyP = outputString + rslt;
            document.getElementById("history").innerHTML += `<br>` + historyP;
            currentOp[0] = currentOp[1] = currentOp[2] = currentOp[3] = "";
        }


    }

}



function clearAll() {
    document.getElementById("equation").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("constant").innerHTML = "";
    currentOp[0] = currentOp[1] = currentOp[2] = currentOp[3] = "";
    currentValues[0] = currentValues[1] = "";
}

function clearTabContent() {
    activeTab === "history" ?
        document.getElementById("history").innerHTML = "" :
        document.getElementById("memory").innerHTML = "";
}

function saveInMemory() {
    saveInMemoryArr.push(memory[memory.length - 1]);
    document.getElementById("memory").innerHTML += `<br>` + saveInMemoryArr[saveInMemoryArr.length - 1];
}

function deleteLastSaved() {
    saveInMemoryArr.shift(saveInMemoryArr[saveInMemoryArr.length - 1]);
    document.getElementById("memory").innerHTML = "";
    document.getElementById("memory").innerHTML += saveInMemoryArr;
}