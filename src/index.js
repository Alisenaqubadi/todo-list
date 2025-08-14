import "./style.css";
import "./list.css";
import { Create, Write, sleep } from "./function.js";

const add_button = document.getElementsByClassName("img")[0];
const input = document.querySelector("input");
let tasks = 0;

add_button.addEventListener("click", () => {
    main(input, input.value);
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        main(input, input.value);
    }
});

function main(inputElement, inputValue) {
    if (inputValue.trim() !== "") {
        tasks++;
        Create("div", ".list", `row list-${tasks}`);
        Create("div", `.list-${tasks}`, `cell a1${tasks}`);
        Create("div", `.list-${tasks}`, `cell a2${tasks}`);
     
        const date = document.createElement("input");
        date.type = "date";
        date.className = `date cell a3${tasks}`;
        document.querySelector(`.list-${tasks}`).appendChild(date);

        Create("div", `.list-${tasks}`, `cell a4${tasks}` , `cell-${tasks}`);

        document.getElementById(`cell-${tasks}`).contentEditable = "true";

        Create("div", `.list-${tasks}`, `cell a5${tasks}`);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "box";
        document.querySelector(`.a1${tasks}`).appendChild(checkbox);

        Write(`.a2${tasks}`, inputValue);

        Create("div", `.a5${tasks}`, "priority");
        const newPriority = document.querySelector(`.a5${tasks} .priority`);
        newPriority.textContent = "Medium";
        newPriority.style.backgroundColor = "green"; // set initial background color

        newPriority.addEventListener("click", () => {
            ColorChanging(newPriority);
        });

        const boxContainer = document.querySelector(`.a1${tasks}`)
        const newBox = boxContainer.querySelector(`.box`);
        newBox.addEventListener("change", () => {
            removeTask(newBox, boxContainer);
        });

        inputElement.value = "";
    }
}

function ColorChanging(element) {
    const bg = getComputedStyle(element).backgroundColor;

    if (bg === "rgb(0, 128, 0)") {
        element.style.backgroundColor = "red";
        element.textContent = "High";
    } else if (bg === "rgb(255, 0, 0)") {
        element.style.backgroundColor = "black";
        element.textContent = "Low";
    } else {
        element.style.backgroundColor = "green";
        element.textContent = "Medium";
    }
}

async function removeTask(newBox,boxContainer) {
    if (newBox.checked) {
    await sleep(2000);
    boxContainer.parentElement.remove();
}
}