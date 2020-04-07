import { Calculator } from "./Calculator.js"

window.Calculator = Calculator;

let numpad = document.querySelector(".numpad");
let outputCalculation = document.querySelector("#calculation");
let outputSolution = document.querySelector("#solution");

window.calc = new Calculator(numpad, outputCalculation, outputSolution);