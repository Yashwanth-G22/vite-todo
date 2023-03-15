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
