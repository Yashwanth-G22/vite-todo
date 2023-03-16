import { createNode , appendNode } from "../utils/functions";

export function todoView(todoEventManager : Function) {
    const ul = document.querySelector('.taskList') as HTMLInputElement;
    const { checkedOfItem, updateOfList, singleTaskDelete } = todoEventManager()

    return {

        createListElement: function (elem: string, index: number, value: boolean) {
            const li = createNode('li') as HTMLLIElement
            li.classList.add('li-List')
            const span = createNode('span', elem) as HTMLSpanElement
            appendNode(li, updateInput(span, elem, index, value , checkedOfItem))
            appendNode(li, span)
            appendNode(li, editButton(span, index, elem , updateOfList ))
            appendNode(li, deleteButton(index, li , singleTaskDelete))
            return appendNode(ul, li)
        },
    }
}

function updateInput(span: HTMLSpanElement, elem: string, index: number, value: boolean , checkedOfItem : Function) {
    const input = createNode('input') as HTMLInputElement
    input.setAttribute('type', 'checkbox');
    input.classList.add('checkBox');
    if (value) {
        input.checked = true;
        span.style.textDecoration = 'line-through'
    }
    input.addEventListener('click', ()=> checkedOfItem( input, span, elem, index));
    return input;
}

function editButton(span: HTMLSpanElement, index: number, elem: string , updateOfList : Function) {
    let editBtn = createNode('button', `<i class="fas fa-pencil"></i>`);
    editBtn.addEventListener('click',()=> updateOfList(span, index, elem, editBtn));
    return editBtn;
}

function deleteButton(index: number, li: HTMLLIElement , singleTaskDelete : Function) {
    const button = createNode('button', `<i class="fa-solid fa-xmark"></i>`)
    button.addEventListener('click',()=> singleTaskDelete( index, li))
    return button
}



