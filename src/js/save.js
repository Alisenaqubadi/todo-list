const container = document.getElementById("list");
const row = document.getElementsByClassName("row");

function savejs() {
    const observer = new MutationObserver((mutationList) => {
        for(let mutation of mutationList){
            console.log("was fired")
            MainSave();
        }
    });

    observer.observe(container, {
        childList: 1,     // detect added/removed children
        characterData: 1, // detect text changes
        subtree: 1,       // include nested elements
        attributes: 1     // detect attribute changes
    });
}

function MainSave() {
    localStorage.clear()
    if(row.length > 1){
    Array.from(row).forEach((el)=> {
    const title = el.getElementsByClassName("cell")[1]
    const dueDate = el.getElementsByClassName("cell")[2]
    const Description = el.getElementsByClassName("cell")[3]
    const PriorityCell = el.getElementsByClassName("cell")[4]
    let priority; // Declare priority here

    let priorityClasses = []; // Initialize with an empty array to avoid errors
    if (PriorityCell) { // Add this check
        priority =  PriorityCell.querySelector(".priority")
        priorityClasses = PriorityCell.classList;

    }
    
     let titleClasses = []; // Initialize DescriptionClasses
    if (title) { // Add this check for Description
      titleClasses = title.classList;
    }

     let dueDateClasses = []; // Initialize DescriptionClasses
    if (dueDate) { // Add this check for Description
      dueDateClasses = dueDate.classList;
    }

    let DescriptionClasses = []; // Initialize DescriptionClasses
    if (Description) { // Add this check for Description
      DescriptionClasses = Description.classList;
    }


    
    const titleSecondClass = titleClasses[1]     
    const dueDateSecondClass = dueDateClasses[2] 
    const DescriptionSecondClass = DescriptionClasses[1] 
    const prioritySecondClass = priorityClasses[1]     

    let titleTxt = ''; // Initialize titleTxt
    if (title) { // Check if title is defined
        titleTxt = title.innerText;
    }

    if (dueDate) { // Add this check
        dueDate.addEventListener("change",()=>{
            MainSave();
        })
    }
    
    let DescriptionTxt = ''; // Initialize DescriptionTxt
    if (Description) { // Check if Description is defined
        DescriptionTxt = Description.innerText;
    }

    let priorityTxt = ''; // Initialize DescriptionTxt
    if (priority) { // Check if Description is defined
        priorityTxt = priority.innerText;
    }

    localStorage.setItem(`${titleSecondClass}`,`${titleTxt}`)
    if (dueDate) { // Add this check
        localStorage.setItem(`${dueDateSecondClass}`,`${dueDate.value}`)
    }
    localStorage.setItem(`${DescriptionSecondClass}`,`${DescriptionTxt}`)
    localStorage.setItem(`${prioritySecondClass}`,`${priorityTxt}`)
    })
}}

export {
    savejs,
}
