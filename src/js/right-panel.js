function rightPanel(newInputValue) {
    const lastElement = document.querySelector(".new-list:last-child");
    let classList = []
    classList = lastElement.classList;
    const secondClass = classList[1];
    console.log(classList)
    localStorage.setItem(secondClass, newInputValue);
}

export { rightPanel };
