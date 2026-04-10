import { describe, it, expect } from "vitest";
import { parseInput } from "../src/parse-input.js";

describe("parseInput", () => {
  it("accepts a raw palette ID", () => {
    expect(parseInput("MDuOiG28cV")).toBe("MDuOiG28cV");
  });

  it("extracts ID from a full URL", () => {
    expect(parseInput("https://paletty.dev/p/MDuOiG28cV/tokyo-night")).toBe(
      "MDuOiG28cV",
    );
  });

  it("extracts ID from a URL without protocol", () => {
    expect(parseInput("paletty.dev/p/MDuOiG28cV/slug")).toBe("MDuOiG28cV");
  });

  it("extracts ID from a URL without slug", () => {
    expect(parseInput("https://paletty.dev/p/MDuOiG28cV")).toBe("MDuOiG28cV");
  });

  it("throws on empty input", () => {
    expect(() => parseInput("")).toThrow("Invalid palette ID or URL");
  });

  it("throws on input that is too short", () => {
    expect(() => parseInput("abc")).toThrow("Invalid palette ID or URL");
  });

  it("throws on input with special characters", () => {
    expect(() => parseInput("not-a-valid-id!")).toThrow(
      "Invalid palette ID or URL",
    );
  });
});
