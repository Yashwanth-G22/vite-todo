export class todoObject {
    id: number;
    name: string;
    isCompleted: boolean;

    constructor(id: number, name: string, isCompleted: boolean = false) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
    }
}


export function setObjstructure(url: string, options: any): Promise<Response> | any {
    try {
        const header = new Headers
        header.append('content-type', 'application/json');
        return fetch(url, {
            ...options,
            headers: header,
        })
    } catch (err) {
        console.log("something error")
    }
}