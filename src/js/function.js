function Create(element, container, className = '', elementId = '') {
  const Element_value = document.createElement(element)
  const Container_value = document.querySelector(container)
  if (className !== '') {
    Element_value.className = className
  }
  if (elementId !== '') {
    Element_value.id = elementId
  }
  Container_value.appendChild(Element_value)
}

function Write(container, text) {
  document.querySelectorAll(container).forEach((el) => {
    el.innerText = text
  })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { Create, Write, sleep }
