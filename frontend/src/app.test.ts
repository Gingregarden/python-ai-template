import { describe, expect, it } from "vitest";
import { createGreeting } from "./main.ts";

describe("createGreeting", () => {
  it("デフォルトのプロジェクト名で挨拶文を返す", () => {
    expect(createGreeting()).toBe("Hello from ai-template!");
  });

  it("指定したプロジェクト名で挨拶文を返す", () => {
    expect(createGreeting("custom-project")).toBe("Hello from custom-project!");
  });
});
