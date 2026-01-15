import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );
    expect(result.current[0]).toBe("defaultValue");
  });

  it("returns stored value when localStorage has data", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );
    expect(result.current[0]).toBe("storedValue");
  });

  it("persists value to localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
    expect(result.current[0]).toBe("newValue");
  });

  it("accepts function updater", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("handles complex objects", () => {
    const initialValue = { name: "test", count: 0 };
    const { result } = renderHook(() =>
      useLocalStorage("testKey", initialValue)
    );

    act(() => {
      result.current[1]({ name: "updated", count: 5 });
    });

    expect(result.current[0]).toEqual({ name: "updated", count: 5 });
  });

  it("handles arrays", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string[]>("testKey", [])
    );

    act(() => {
      result.current[1](["item1", "item2"]);
    });

    expect(result.current[0]).toEqual(["item1", "item2"]);
  });

  it("removes value with removeValue function", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );

    act(() => {
      result.current[2]();
    });

    expect(localStorage.getItem("testKey")).toBe(null);
    expect(result.current[0]).toBe("defaultValue");
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("testKey", "invalid-json");
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );
    expect(result.current[0]).toBe("defaultValue");
  });
});
