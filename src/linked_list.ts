type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const n = { value: item } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = this.tail = n;
            return;
        }

        n.next = this.head;
        this.head.prev = n;
        this.head = n;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("wtf");
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        if (!this.head) {
            this.head = this.tail = { value: item } as Node<T>;
            return;
        }

        const curr = this.getAt(idx) as Node<T>;
        const n = { value: item } as Node<T>;

        n.next = curr;
        n.prev = curr.prev as Node<T>;
        curr.prev = n;
        n.prev.next = n;
    }

    append(item: T): void {
        const n = { value: item } as Node<T>;

        this.length++;

        if (!this.tail) {
            this.head = this.tail = n;
            return;
        }

        this.tail.next = n;
        n.prev = this.tail;
        this.tail = n;
    }

    remove(item: T): T | undefined {
        if (!this.head) {
            return;
        }

        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next as Node<T>;
        }

        if (!curr) {
            return;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const curr = this.getAt(idx);

        if (!curr) {
            return;
        }

        return this.removeNode(curr);
    }

    splice(from: number, to?: number): number {
        if (!to) {
            const out = this.length - from;
            this.length -= out;
            this.tail = this.getAt(from - 1);
            if (this.tail) {
                this.tail.next = undefined;
            }
            return out;
        }

        let curr = this.head;
        for (let i = 0; curr && i < to; i++) {
            let next = curr.next;
            if (i >= from) {
                this.removeNode(curr);
            } 
            curr = next;
        }

        return to - from;
    }

    private removeNode(node: Node<T>): T | undefined {
        if (!this.head) {
            return;
        }

        this.length--;

        if (this.length === 0) {
            const out = this.head.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }


        node.prev = node.next = undefined;

        return node?.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr;
    }
}
