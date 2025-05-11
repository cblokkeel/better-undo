import { expect, test } from "bun:test";
import { UndoRedo } from "../src/undo";

test("undo", () => {
    const u = new UndoRedo<number>();

    u.add_state(1);
    u.add_state(2);
    u.add_state(3);

    expect(u.undo()).toBe(3);
    expect(u.undo()).toBe(2);
    expect(u.undo()).toBe(1);
    expect(u.undo()).toBeUndefined();
});

test("redo", () => {
    const u = new UndoRedo<number>();

    u.add_state(1);
    u.add_state(2);
    u.add_state(3);

    expect(u.redo()).toBeUndefined();
    u.undo();
    expect(u.redo()).toBe(3);

    u.undo();
    u.undo();
    expect(u.redo()).toBe(2);
    expect(u.redo()).toBe(3);
});

test("adding state after undo", () => {
    const u = new UndoRedo<number>();

    u.add_state(1);
    u.add_state(2);
    u.add_state(3);

    expect(u.undo()).toBe(3);
    expect(u.undo()).toBe(2);

    u.add_state(5);
    // now should look like 1 => 5

    expect(u.redo()).toBeUndefined();
});
