import config from "../../../config.json"
import { Iobject } from "../../type"
import { setObjstructure } from "../../model/todo-object"

const { apiURL, deleteAllURL } = config

export function cloudServer() {

    return {
        getAllItems: async function () {
            const response = await fetch(apiURL, { method: 'GET' })
            return response.json()
        },

        postSingleItem: async function (name: string) {
            const response = await setObjstructure(apiURL, {
                method: 'POST',
                body: JSON.stringify({
                    name
                })
            })
            return response.json();
        },
        putSingleItem: async function ({id, name, isCompleted} : Iobject) {
            await setObjstructure(`${apiURL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    name,
                    isCompleted
                })
            })
        },
        deleteSingleItem: function (id: number) {
            setObjstructure(`${apiURL}/${id}`, {
                method: 'DELETE',
            })
        },
        deleteAllItems: function () {
            setObjstructure(deleteAllURL, {
                method: 'DELETE'
            })
        }
    }

}


