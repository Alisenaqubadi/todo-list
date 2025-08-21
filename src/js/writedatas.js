import { Create } from "./function";
import newListIcon from "../imgs/new-list.svg";

let listId = 0; // internal variable (not exported directly)

function writedatas() {
  rightPanelRebuilt();
}

function rightPanelRebuilt() {
  for (let i = 0; i < 100; i++) {
    let newList = localStorage.getItem(`list-${i}`);
    if (newList !== null) {
      Create("div", ".right-panel", `list-${i} new-list`);
      const rightpanel = document.querySelector(".right-panel");
      const lastchild = rightpanel.querySelector(`.list-${i}`);

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

export {
  writedatas,
  getListId,
  setListId // Export the setter
};
