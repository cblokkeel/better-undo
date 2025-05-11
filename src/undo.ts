export class UndoRedo<T> {
    public length: number;
    private state: any;
    private currentIdx: number;

    constructor() {
        this.length = 0;
        this.currentIdx = -1;
    }

    add_state(s: T): void {
        // if currentIdx !== length - 1 (not pointing to the tail)
        // splice state from currentIdx to tail
        // decrement length by how many item removed
        //
        // add s to the tail of the linked list
        // point currentIdx to tail 
        // increment length
    }

    undo(): T | undefined {
        // if length === 0 || 1 return
        //
        // point currentIdx to currentIdx--
        // return currentIdx
        return;
    }

    redo(): T | undefined {
        // if pointing to tail => return
        //
        // increment currentIdx
        // return currentIdx
        return;
    }
}
