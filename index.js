const inputMoney = document.querySelector(".dollar");
const btn = document.querySelectorAll(".btn");
const inputPerson = document.querySelector(".input_person");
const resultAmount = document.querySelector(".result--tip_amount");
const resultTotal = document.querySelector(".result--total");
const inputCustom = document.querySelector(".input_custom");
const resetBtn = document.querySelector(".btn--reset");
const error = document.querySelector(".error");

function calc(money, percent, persons) {
    return (money * percent / 100)  / persons;
}

function calcTotal(money, percent, persons) {
    return (money * percent / 100 + money) / persons;
}

let percent = 0; 

function updateResult() {
    const money = parseFloat(inputMoney.value);

    btn.forEach(btns => {
        if (btns.classList.contains("active")) {
            percent = parseFloat(btns.dataset.percent);
        }
    });

    const customPercent = parseFloat(inputCustom.value);
    if (!isNaN(customPercent)) {
        percent = customPercent;
    }

    const persons = parseFloat(inputPerson.value);

    if (!isNaN(money) && !isNaN(persons)) {
        const resultado = calcTotal(money, percent, persons)
        const tipAmount = calc(money, percent, persons);
        resultAmount.textContent = "$" + tipAmount.toFixed(2);
        resultTotal.textContent = "$" +  resultado.toFixed(2);
    }
}

btn.forEach(btns => {
    btns.addEventListener("click", () => {
        btn.forEach(btn => btn.classList.remove("active"));
        btns.classList.add("active");
        updateResult();
if ( inputPerson.value === ""){
    error.style.display = "block";
    inputPerson.style.outline = "2px solid red"
} 

    });
});
inputPerson.addEventListener("keyup", () =>{
    if (inputPerson.value !== ""){
        error.style.display = "none";
    inputPerson.style.outline= ""
    }
})

inputCustom.addEventListener("click", () => {
    btn.forEach(btn => btn.classList.remove("active"));
    updateResult();
});

resetBtn.addEventListener("click", () => {
    inputMoney.value = "";
    btn.forEach(btns => btns.classList.remove("active"));
    inputCustom.value = "";
    inputPerson.value = "";
    resultAmount.textContent = "$0.00";
    resultTotal.textContent = "$0.00";
    inputPerson.style.outline = ""
    error.style.display = "none"

});

inputMoney.addEventListener("input", updateResult); 
inputPerson.addEventListener("input", updateResult);

updateResult();