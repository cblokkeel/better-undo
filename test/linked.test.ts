import { test, expect } from "bun:test";
import DoublyLinkedList from "../src/linked_list";

test("linked list", () => {
    const list = new DoublyLinkedList();

    list.append(5);
    list.append(7);
    list.append(9);

    expect(list.get(2)).toBe(9);
    expect(list.removeAt(1)).toBe(7);
    expect(list.length).toBe(2);

    list.append(11);
    expect(list.removeAt(1)).toBe(9);
    expect(list.remove(9)).toBe(undefined);
    expect(list.removeAt(0)).toBe(5);
    expect(list.removeAt(0)).toBe(11);
    expect(list.length).toBe(0);

    list.prepend(5);
    list.prepend(7);
    list.prepend(9);

    expect(list.get(2)).toBe(5);
    expect(list.get(0)).toBe(9);
    expect(list.remove(9)).toBe(9);
    expect(list.length).toBe(2);
    expect(list.get(0)).toBe(7);

    list.append(12);
    list.append(13);
    list.append(14);

    expect(list.length).toBe(5);
    expect(list.get(3)).toBe(13);

    expect(list.splice(3)).toBe(2);

    expect(list.length).toBe(3);
    expect(list.get(3)).toBeUndefined();
    expect(list.get(2)).toBe(12);

    list.append(13);
    list.append(14);
    list.append(15);
    list.append(16);


    expect(list.length).toBe(7);
    expect(list.splice(4, 6)).toBe(2);
    expect(list.length).toBe(5);
});
