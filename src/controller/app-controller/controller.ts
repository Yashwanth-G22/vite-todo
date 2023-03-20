import { todoView } from "../../view/todo-view.js";

import { localServer } from "../storage-controller/local-server.js";

import { cloudServer } from "../storage-controller/cloud-server.js";

// import { eventManager } from "./event-manager.js";

import { ITodoObject } from "../storage-controller/type.js";

const storage = document.querySelector('.storage') as HTMLSelectElement;
const addTaskButton = document.querySelector('.add-task-button') as HTMLButtonElement;
export const input = document.querySelector('.input') as HTMLInputElement;
export const ul = document.querySelector('.taskList') as HTMLUListElement;



export let getStorage = () => (storage.value !== 'cloudStorage') ? localServer() : cloudServer();
function control() {
    return {
        createAllTasks: async function () {
            if (storage.value === 'cloudStorage') {
                const list = await cloudServer().getAllItems();
                list.map(({ name, isCompleted, id }: ITodoObject) => {
                    this.instance({ name, isCompleted, id })
                })
            } else {
                const todo = localServer().getAllItems();
                todo.map(({ name, isCompleted, id }: ITodoObject) => {
                    this.instance({ name, isCompleted, id })
                })
            }
            // setStorage()
        },

        createSingleTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                const result = await getStorage().postSingleItem(value)
                if (result.id && result.name) {
                    const postArguments = { name: result.name, id: result.id, isCompleted: result.isCompleted }
                    this.instance(postArguments)
                }
                else {
                    const args = { name: value, id: result.id }
                    this.instance(args)
                    console.log(result)
                }
            } else {
                alert('Enter task name')
            }
        },

        instance: function ({ name, id, isCompleted }: ITodoObject) {
            return todoView().createListElement(name, id as number, isCompleted as boolean)
        },
    }
}

addTaskButton.addEventListener('click', (e) => {
    e.preventDefault()
    control().createSingleTask()
})

storage.addEventListener('change', () => {
    if (confirm(`U are changing the storage .=> you data will store only in ${storage.value}`)) {
        getStorage();
        ul.innerHTML = '';
        control().createAllTasks();
    }
})

control().createAllTasks();

(document.querySelector('.clearAllBtn') as HTMLButtonElement).addEventListener('click', () => {
    getStorage().deleteAllItems()
})


// function setStorage() {
//     return (JSON.parse(`${localStorage.getItem('store')}`) || localStorage.setItem('store', JSON.stringify("cloudStorage")))
// }

