import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numpad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution

        this.setupNumPad();
    }

    setupNumPad() { 
        for(let i = 0; i < 7; i=i+3) 
        {
            for(let j = 1; j < 4; j++)
            {
                let button = document.createElement("button");
                button.innerText = j+i;
                this.numpad.appendChild(button);
                button.addEventListener('click', this.onButtonClick.bind(this, button));
            }
            let jump = document.createElement("br");
            this.numpad.appendChild(jump);
        } // array besser
        let button = document.createElement("button");
        button.innerText = 0;
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        let jump = document.createElement("br");
        this.numpad.appendChild(jump);

        button = document.createElement("button");
        button.innerText = "+";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "-";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "*";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "/";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "^";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "!";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
        button = document.createElement("button");
        button.innerText = "AC";
        this.numpad.appendChild(button);
        button.addEventListener('click', this.onButtonClick.bind(this, button));
    }

    onButtonClick(symbol) {
        console.log(symbol.target.innerText);
    }

    onNumberClick(symbol) 
    {
        let number = new MyMath(symbol.target.innerText);
    }

    print(string) {

    }

    printSolution(string) {

    }

    clear() {

    }

}
