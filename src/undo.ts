import DoublyLinkedList from "./linked_list";

export class UndoRedo<T> {
    public length: number;
    private state: DoublyLinkedList<T>;
    private currentIdx: number;

    constructor() {
        this.length = 0;
        this.currentIdx = -1;

        this.state = new DoublyLinkedList();
    }

    add_state(s: T): void {
        if (this.length > 0 && this.currentIdx !== this.length - 1) {
            this.state.splice(this.currentIdx);
            this.length = this.state.length;
            this.currentIdx = this.length - 1;
            return;
        }

        this.state.append(s);
        this.length++;
        this.currentIdx = this.length - 1;
    }

    undo(): T | undefined {
        if (this.currentIdx <= 0) {
            return;
        }

        this.currentIdx--;
        return this.state.get(this.currentIdx);
    }

    redo(): T | undefined {
        if (this.currentIdx === this.length - 1) {
            return;
        }

        this.currentIdx++;
        return this.state.get(this.currentIdx);
    }
}
