import { describe, expect, test } from "bun:test";
import { getDisplayedMemoryCount } from "../web/src/lib/memory-count";

describe("getDisplayedMemoryCount", () => {
  test("shows matched results while search is active", () => {
    expect(getDisplayedMemoryCount(true, false, 3, 120)).toBe(3);
    expect(getDisplayedMemoryCount(true, false, 0, 120)).toBe(0);
  });

  test("shows filtered results while a tag filter is active", () => {
    expect(getDisplayedMemoryCount(false, true, 3, 120)).toBe(3);
    expect(getDisplayedMemoryCount(false, true, 0, 120)).toBe(0);
  });

  test("restores the store total when search and tag filter are cleared", () => {
    expect(getDisplayedMemoryCount(false, false, 3, 120)).toBe(120);
  });
});
