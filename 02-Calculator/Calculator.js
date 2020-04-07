import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numpad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution

        this.setupNumPad();
    }

    setupNumPad() { 
        for(let i = 0; i < this.numpad.children.length; i++)
        {
            let buttonText = this.numpad.children[i];
            buttonText.addEventListener('click', this.onButtonClick.bind(buttonText));
        }
    }

    onButtonClick(symbol) {
        console.log(symbol.target.innerText);
    }

    print(string) {

    }

    printSolution(string) {

    }

    clear() {

    }

}
