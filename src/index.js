import "./styles/style.css";
import "./styles/list.css";
import "./styles/right-panel.css"
import { Create, Write, sleep } from "./js/function.js";
import { testjs } from "./js/test.js";
import { savejs } from "./js/save.js";
import { switchList } from "./js/switch-list.js";
import { writedatas, getListId, setListId, getTaskCount, setTaskCount} from "./js/writedatas.js";
import { rightPanel } from "./js/right-panel.js"
import newListIcon from './imgs/new-list.svg';

export let list_detector = "Task";

const add_button = document.getElementsByClassName("img")[0];
const input = document.querySelector("input");

// Initialize tasks - will be set after writedatas runs
let tasks = 0;

add_button.addEventListener("click", () => {
    main(input, input.value);
    // Save after adding task
    setTimeout(() => {
        savePage();
    }, 100);
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        main(input, input.value);
        // Save after adding task
        setTimeout(() => {
            savePage();
        }, 100);
    }
});

// Function to manually save the page
function savePage() {
    const row = document.getElementsByClassName("row");
    if(row.length > 0){
        Array.from(row).forEach((el)=> {
            const title = el.getElementsByClassName("cell")[1]
            const dueDate = el.getElementsByClassName("cell")[2]
            const Description = el.getElementsByClassName("cell")[3]
            const PriorityCell = el.getElementsByClassName("cell")[4]
            let priority;

            let priorityClasses = [];
            if (PriorityCell) {
                priority = PriorityCell.querySelector(".priority")
                priorityClasses = PriorityCell.classList;
            }
            
            let titleClasses = [];
            if (title) {
                titleClasses = title.classList;
            }

            let dueDateClasses = [];
            if (dueDate) {
                dueDateClasses = dueDate.classList;
            }

            let DescriptionClasses = [];
            if (Description) {
                DescriptionClasses = Description.classList;
            }

            const titleSecondClass = titleClasses[1]     
            const dueDateSecondClass = dueDateClasses[2] 
            const DescriptionSecondClass = DescriptionClasses[1] 
            const prioritySecondClass = priorityClasses[1]     

            let titleTxt = '';
            if (title) {
                titleTxt = title.innerText;
            }
            
            let DescriptionTxt = '';
            if (Description) {
                DescriptionTxt = Description.innerText;
            }

            let priorityTxt = '';
            if (priority) {
                priorityTxt = priority.innerText;
            }

            if (titleSecondClass) {
                localStorage.setItem(`${titleSecondClass}${list_detector}`, `${titleTxt}`);
            }
            if (dueDate && dueDateSecondClass) {
                localStorage.setItem(`${dueDateSecondClass}${list_detector}`, `${dueDate.value}`);
            }
            if (DescriptionSecondClass) {
                localStorage.setItem(`${DescriptionSecondClass}${list_detector}`, `${DescriptionTxt}`);
            }
            if (prioritySecondClass) {
                localStorage.setItem(`${prioritySecondClass}${list_detector}`, `${priorityTxt}`);
            }
        })
    }
}

function main(inputElement, inputValue) {
    if (inputValue.trim() !== "") {
        console.log(`${tasks} is`)
        tasks++;
        setTaskCount(tasks); // Keep localStorage in sync
        
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
            localStorage.removeItem(`a2${tasks}${list_detector}`);
            localStorage.removeItem(`a3${tasks}${list_detector}`);
            localStorage.removeItem(`a4${tasks}${list_detector}`);
            localStorage.removeItem(`a5${tasks}${list_detector}`);
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

function removeTask(newBox, boxContainer) {
    if (newBox.checked) {
        boxContainer.parentElement.remove();
    }
}

// Function to handle list switching - single place for event handling
function handleListClick(listName) {
    switchList(listName);
}

const createListButton = document.getElementById("create-list")

createListButton.addEventListener("click", () => {
    let listId = getListId(); // Get the current value
    listId++;
    setListId(listId); // Update the value in writedatas.js

    Create("div", ".right-panel", `new-list right-list-${listId}`);

    let newlist = document.querySelector(`.right-list-${listId}`);
    newlist.innerHTML = `<img src="${newListIcon}" alt=""> <input type="text" class="new-input">`;
    let newInput = newlist.getElementsByClassName("new-input")[0];
    newInput.focus();

    newInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const newInputValue = newInput.value.trim();
            if (newInputValue !== "") {
                newlist.innerHTML = `<img src="${newListIcon}" alt=""> <h1>${newInputValue}</h1>`;
                // Store the list name in localStorage
                localStorage.setItem(`right-list-${listId}`, newInputValue);
                // Add event listener ONCE using the centralized handler
                newlist.addEventListener("click", () => handleListClick(newInputValue), { once: false });
                rightPanel();
            } else {
                newlist.remove(); // remove empty list
            }
        }
    });

    newInput.addEventListener("blur", async () => {
        await sleep(300); // small delay to let focus events settle
        const newInputValue = newInput.value.trim();

        if (newInputValue !== "") {
            // Reset innerHTML to remove any existing event listeners
            newlist.innerHTML = `<img src="${newListIcon}" alt=""> <h1>${newInputValue}</h1>`;
            // Store the list name in localStorage
            localStorage.setItem(`right-list-${listId}`, newInputValue);
            // Add the event listener ONCE using the centralized handler
            newlist.addEventListener("click", () => handleListClick(newInputValue), { once: false });
            rightPanel(newInputValue);
        } else {
            newlist.remove(); // delete if empty
        }
    });
})

function setNewList_detector(a){
    list_detector = a; 
    console.log(list_detector);   
}

// Initialize data and then set the correct task count
writedatas(list_detector);

tasks = getTaskCount(); // Get the correct count after restoration

savejs(list_detector);

testjs();

const hahahahaiamout = document.getElementsByClassName("my-tasks")[0];
hahahahaiamout.addEventListener("click",()=>{
    location.reload();
})

export {
    ColorChanging,
    removeTask,
    setNewList_detector,
    handleListClick
}