let input1 = document.getElementById("input");

let arr_list = [
    "but1", "but2", "but3", "but4", "but5", "but6", "but7", "but8", "but9",
    "but10", "but11", "but12", "but13", "but14", "but15", "but16", "but17"
];

let result = [];
let currentNumber = "";

function updateDisplay() {
    input1.textContent = result.join(" ") + (currentNumber ? " " + currentNumber : "");
}

for (let i = 0; i < arr_list.length; i++) {
    let btn = document.getElementById(arr_list[i]);

    btn.addEventListener("click", () => {
        let value = btn.textContent.trim();

        // All Clear
        if (value === "AC") {
            result = [];
            currentNumber = "";
            input1.textContent = "0";
            return;
        }

        // Delete
        if (value === "del") {
            if (currentNumber) {
                currentNumber = currentNumber.slice(0, -1);
            } else if (result.length > 0) {
                result.pop();
            }
            updateDisplay();
            return;
        }

        // Equals
        if (value === "=") {
            if (currentNumber !== "") {
                result.push(parseFloat(currentNumber));
                currentNumber = "";
            }

            if (result.length === 3) {
                let [num1, operator, num2] = result;
                let res;

                switch (operator) {
                    case "+":
                        res = num1 + num2;
                        break;
                    case "-":
                        res = num1 - num2;
                        break;
                    case "*":
                        res = num1 * num2;
                        break;
                    case "/":
                        res = num2 === 0 ? "Error" : num1 / num2;
                        break;
                    case "%":
                        res = num1 % num2;
                        break;
                    default:
                        res = "Invalid";
                }

                input1.textContent = res;
                result = [];
                currentNumber = "";
            }
            return;
        }

        if (["+", "-", "*", "/", "%"].includes(value)) {
            if (currentNumber !== "") {
                result.push(parseFloat(currentNumber));
                currentNumber = "";
            }

            if (result.length === 1 && typeof result[0] === "number") {
                result.push(value);
            }

            updateDisplay();
            return;
        }

       
        if (!isNaN(value)) {
            currentNumber += value;
            updateDisplay();
        }
    });
}
