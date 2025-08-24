import { Create, Write } from './function.js'
import newListIcon from '../imgs/new-list.svg'
import { ColorChanging, removeTask, handleListClick } from '../index.js' // Import the centralized handler

let listId = 0 // internal variable (not exported directly)
let task = 0

function writedatas(list_detector) {
  rightPanelRebuilt()
  mainListRebuilt(list_detector)
}

function rightPanelRebuilt() {
  // Clear existing right panel lists first to prevent duplicates
  const rightPanel = document.querySelector('.right-panel')
  const existingLists = rightPanel.querySelectorAll('.new-list')
  existingLists.forEach((list) => {
    // Only remove if it's not the create-list button
    if (!list.id || list.id !== 'create-list') {
      list.remove()
    }
  })

  for (let i = 0; i < 100; i++) {
    let newList = localStorage.getItem(`right-list-${i}`)
    if (newList !== null) {
      Create('div', '.right-panel', `right-list-${i} new-list`)
      const rightpanel = document.querySelector('.right-panel')
      const lastchild = rightpanel.querySelector(`.right-list-${i}`)

      // Use the value retrieved from localStorage for the heading
      let newInputValue = newList
      lastchild.innerHTML = `<img src="${newListIcon}" alt=""> <h1>${newInputValue}</h1>`

      // Add the event listener using the centralized handler from index.js
      // This prevents duplicate event listeners
      lastchild.addEventListener(
        'click',
        () => handleListClick(newInputValue),
        { once: false }
      )
      listId = i // ✅ update variable
    }
  }
}

// Getter so imports can always read updated value
function getListId() {
  return listId
}

// Setter to update listId
function setListId(newId) {
  listId = newId
}

// Getter for task count
function getTaskCount() {
  return task
}

// Setter to update task count
function setTaskCount(newCount) {
  task = newCount
  localStorage.setItem('task', task)
}

function mainListRebuilt(list_detector) {
  // CLEAR EXISTING TASKS FIRST
  const listContainer = document.querySelector('.list')
  if (listContainer) {
    // Remove all existing task rows
    const existingRows = listContainer.querySelectorAll('.row')
    existingRows.forEach((row) => row.remove())
  }

  let maxTaskIndex = 0 // Track the highest task index

  for (let i = 1; i < 10000; i++) {
    // Start from 1 since your main function starts at 1
    let titleTask = localStorage.getItem(`a2${i}${list_detector}`)
    if (titleTask !== null) {
      let dueDate = localStorage.getItem(`a3${i}${list_detector}`)
      let Description = localStorage.getItem(`a4${i}${list_detector}`)
      let priority = localStorage.getItem(`a5${i}${list_detector}`)

      Create('div', '.list', `row list-${i}`)
      Create('div', `.list-${i}`, `cell a1${i}`)
      Create('div', `.list-${i}`, `cell a2${i}`)

      const date = document.createElement('input')
      date.type = 'date'
      date.className = `date cell a3${i}`
      date.value = dueDate || '' // Handle null values
      document.querySelector(`.list-${i}`).appendChild(date)

      Create('div', `.list-${i}`, `cell a4${i}`, `cell-${i}`)
      document.getElementById(`cell-${i}`).textContent = Description || ''
      document.getElementById(`cell-${i}`).contentEditable = 'true'

      Create('div', `.list-${i}`, `cell a5${i}`)

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.className = 'box'
      document.querySelector(`.a1${i}`).appendChild(checkbox)

      Write(`.a2${i}`, titleTask)

      Create('div', `.a5${i}`, 'priority')
      const newPriority = document.querySelector(`.a5${i} .priority`)
      newPriority.textContent = priority || 'Medium'
      newPriority.style.backgroundColor = prioritycolor(priority || 'Medium')

      newPriority.addEventListener('click', () => {
        ColorChanging(newPriority)
      })

      const boxContainer = document.querySelector(`.a1${i}`)
      const newBox = boxContainer.querySelector(`.box`)
      newBox.addEventListener('change', () => {
        // Remove the task from the DOM
        removeTask(newBox, boxContainer)
        localStorage.removeItem(`a2${i}${list_detector}`)
        localStorage.removeItem(`a3${i}${list_detector}`)
        localStorage.removeItem(`a4${i}${list_detector}`)
        localStorage.removeItem(`a5${i}${list_detector}`)
      })

      maxTaskIndex = i // Update the highest task index found
    }
  }

  // Set task to the highest index found, so new tasks continue from the right number
  task = maxTaskIndex
  localStorage.setItem('task', task)
}

function prioritycolor(priority) {
  if (priority === 'Medium') {
    return 'green'
  } else if (priority === 'High') {
    return 'red'
  } else if (priority === 'Low') {
    return 'black'
  } else {
    return 'green' // Default fallback
  }
}

export { writedatas, getListId, setListId, getTaskCount, setTaskCount }
