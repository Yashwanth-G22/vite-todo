export function createNode(elementName: string, elementValue: any = '') {
    let taskNode = document.createElement(elementName)
    taskNode.innerHTML = elementValue;
    return taskNode;
}

export function appendNode(parentNode: HTMLElement, childNode: HTMLElement) {
    return parentNode.appendChild(childNode)
}