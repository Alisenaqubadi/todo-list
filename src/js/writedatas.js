import { Create, Write } from "./function";
import newListIcon from "../imgs/new-list.svg";
import { ColorChanging, removeTask } from "..";
import { tasks, list_detector } from "..";

let listId = 0; // internal variable (not exported directly)
let task = 0;

function writedatas(list_detector) {
  rightPanelRebuilt();
  mainListRebuilt(list_detector);
}

function rightPanelRebuilt() {
  for (let i = 0; i < 100; i++) {
    let newList = localStorage.getItem(`right-list-${i}`);
    if (newList !== null) {
      Create("div", ".right-panel", `right-list-${i} new-list`);
      const rightpanel = document.querySelector(".right-panel");
      const lastchild = rightpanel.querySelector(`.right-list-${i}`);

      // Use the value retrieved from localStorage for the heading
      let newInputValue = newList;
      lastchild.innerHTML = `<img src="${newListIcon}" alt=""> <h1>${newInputValue}</h1>`;

      listId = i; // ✅ update variable
    }
  }
}

// Getter so imports can always read updated value
function getListId() {
  return listId;
}

// Setter to update listId
function setListId(newId) {
  listId = newId;
}

function mainListRebuilt(list_detector) {
  let maxTaskIndex = 0; // Track the highest task index

  for (let i = 0; i < 10000; i++) {
    let titleTask = localStorage.getItem(`a2${i}${list_detector}`);
    if (titleTask !== null) {
      let dueDate = localStorage.getItem(`a3${i}${list_detector}`);
      let Description = localStorage.getItem(`a4${i}${list_detector}`);
      let priority = localStorage.getItem(`a5${i}${list_detector}`);

      Create("div", ".list", `row list-${i}`);
      Create("div", `.list-${i}`, `cell a1${i}`);
      Create("div", `.list-${i}`, `cell a2${i}`);

      const date = document.createElement("input");
      date.type = "date";
      date.className = `date cell a3${i}`;
      date.value = dueDate;
      document.querySelector(`.list-${i}`).appendChild(date);

      Create("div", `.list-${i}`, `cell a4${i}`, `cell-${i}`);
      document.getElementById(`cell-${i}`).textContent = Description;
      document.getElementById(`cell-${i}`).contentEditable = "true";

      Create("div", `.list-${i}`, `cell a5${i} `);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "box";
      document.querySelector(`.a1${i}`).appendChild(checkbox);

      Write(`.a2${i}`, titleTask);

      Create("div", `.a5${i}`, "priority");
      const newPriority = document.querySelector(`.a5${i} .priority`);
      newPriority.textContent = priority;
      newPriority.style.backgroundColor = prioritycolor(priority); // set initial background color

      newPriority.addEventListener("click", () => {
        ColorChanging(newPriority);
      });

      const boxContainer = document.querySelector(`.a1${i}`);
      const newBox = boxContainer.querySelector(`.box`);
      newBox.addEventListener("change", () => {
        // Remove the task from the DOM
        removeTask(newBox, boxContainer);
        localStorage.removeItem(`a2${i}${list_detector}`);
        localStorage.removeItem(`a3${i}${list_detector}`);
        localStorage.removeItem(`a4${i}${list_detector}`);
        localStorage.removeItem(`a5${i}${list_detector}`);
      });

      maxTaskIndex = i; // Update the highest task index
    }
  }

  task = maxTaskIndex;
  localStorage.setItem("task",task) // Set the task variable to the highest index
}


function prioritycolor(priority) {
  if (priority == "Medium") {
    return "green";
  } else if (priority == "High") {
    return "red";
  } else {
    return "black";
  }
}

export {
  writedatas,
  getListId,
  setListId,// Export the setter
};
