import { todoObject } from "../../utils/todo-object";
import { ITodoObject } from "./type";

 export function localServer() {
    return {
        getAllItems: function() : ITodoObject[] {
             return (JSON.parse(`${localStorage.getItem('todos')}`) || [] )
        },
        postSingleItem: function (todo : string) {
            let set_Todo  = this.getAllItems()
            console.log(set_Todo)
            let single_todo  = new todoObject( set_Todo.length , todo )
            set_Todo.push(single_todo)
            localStorage.setItem('todos',JSON.stringify(set_Todo))
            return single_todo
        },
        putSingleItem: function (index : number , elem : string , value : boolean){
            let edit_Todo  = this.getAllItems()
            edit_Todo.splice(index , 1 , new todoObject(  index , elem , value))
            localStorage.setItem('todos',JSON.stringify(edit_Todo))
        },

        deleteSingleItem: function (index : number) {
            let delete_Todo  = this.getAllItems()
            console.log(index)
            delete_Todo.splice(index , 1)
            localStorage.setItem('todos',JSON.stringify(delete_Todo))
        },
        deleteAllItems: function () {
            let deleteAll_Todo = this.getAllItems()
            deleteAll_Todo = []
            localStorage.setItem('todos',JSON.stringify(deleteAll_Todo))
        },
    }
}

localServer().postSingleItem('yash')
