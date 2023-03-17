import { todoView } from "../../view/todo-view.js";

import { localServer } from "../storage-controller/local-server.js";

import { cloudServer } from "../storage-controller/cloud-server.js";

// import { eventManager } from "./event-manager.js";

import { ITodoObject } from "../storage-controller/type.js";

let storage = document.querySelector('.storage') as HTMLSelectElement;
const btn = document.querySelector('.btn') as HTMLButtonElement;
export const input = document.querySelector('.input') as HTMLInputElement;
export const ul = document.querySelector('.taskList') as HTMLUListElement;



export const selectStorage = (storage.value === 'localStorage')? localServer :cloudServer ;
function control() {
    return {
        createAllTasks: async function () {
            if (storage.value === 'cloudStorage') {
                let list = await cloudServer().getAllItems()
                list.map(({ name , isCompleted , id} : ITodoObject) => {
                    this.instance({name, isCompleted, id})
                })
                
            } else {
                let todo = localServer().getAllItems()
                todo.map(({ name  , isCompleted, id} : ITodoObject) => {
                    this.instance( {name, isCompleted , id })
                    console.log(id)
                }) 
            }
        },

        createSingleTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result =await selectStorage().postSingleItem(value) 
                if (result.id && result.name) {
                    let postArguments = { name : result.name , id : result.id , isCompleted : result.isCompleted}
                    this.instance( postArguments )
                }
                else {
                    let args = { name : value , id : result.id}
                    this.instance( args )
                    console.log(result)
                }
            } else {
                alert('Enter task name')
            }
        },

        instance: function ({name ,id , isCompleted } : ITodoObject) {
            return todoView().createListElement(name , id as number , isCompleted as boolean)
        },
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    control().createSingleTask()
})

storage.addEventListener('change', () => {
   let changeStorage = confirm(`U are changing the storage .=> you data will store only in ${storage.value}`)

    if(changeStorage === true){
        ul.innerHTML = ''
        control().createAllTasks()
    }    
})

control().createAllTasks();

(document.querySelector('.clearAllBtn') as HTMLButtonElement).addEventListener('click', () => {
    selectStorage().deleteAllItems()
})


