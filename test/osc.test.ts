import { describe, it, expect } from "vitest";
import { applySequences, resetSequences } from "../src/osc.js";

const ST = "\x1b\\";

describe("applySequences", () => {
  it("generates OSC 10 for foreground", () => {
    const out = applySequences({ "core.foreground": "#c0caf5" });
    expect(out).toContain(`\x1b]10;#c0caf5${ST}`);
  });

  it("generates OSC 11 for background", () => {
    const out = applySequences({ "core.background": "#1a1b26" });
    expect(out).toContain(`\x1b]11;#1a1b26${ST}`);
  });

  it("generates OSC 12 for cursor", () => {
    const out = applySequences({ "core.cursor": "#cccccc" });
    expect(out).toContain(`\x1b]12;#cccccc${ST}`);
  });

  it("generates OSC 17 for selection background", () => {
    const out = applySequences({ "core.selectionBackground": "#0a84ff" });
    expect(out).toContain(`\x1b]17;#0a84ff${ST}`);
  });

  it("generates OSC 19 for selection foreground", () => {
    const out = applySequences({ "core.selectionForeground": "#ffffff" });
    expect(out).toContain(`\x1b]19;#ffffff${ST}`);
  });

  it("skips cursorText (no standard OSC)", () => {
    const out = applySequences({ "core.cursorText": "#000000" });
    expect(out).toBe("");
  });

  it("generates OSC 4;N for normal ANSI colors", () => {
    const out = applySequences({
      "ansi.normal.0": "#000000",
      "ansi.normal.3": "#e0af68",
    });
    expect(out).toContain(`\x1b]4;0;#000000${ST}`);
    expect(out).toContain(`\x1b]4;3;#e0af68${ST}`);
  });

  it("generates OSC 4;N+8 for bright ANSI colors", () => {
    const out = applySequences({
      "ansi.bright.0": "#414868",
      "ansi.bright.7": "#ffffff",
    });
    expect(out).toContain(`\x1b]4;8;#414868${ST}`);
    expect(out).toContain(`\x1b]4;15;#ffffff${ST}`);
  });

  it("handles a full 22-color palette", () => {
    const colors: Record<string, string> = {
      "core.background": "#1a1b26",
      "core.foreground": "#c0caf5",
      "core.cursor": "#c0caf5",
      "core.cursorText": "#1a1b26",
      "core.selectionBackground": "#33467c",
      "core.selectionForeground": "#c0caf5",
    };
    for (let i = 0; i < 8; i++) {
      colors[`ansi.normal.${i}`] = `#0${i}0${i}0${i}`;
      colors[`ansi.bright.${i}`] = `#f${i}f${i}f${i}`;
    }
    const out = applySequences(colors);
    // 5 core (cursorText skipped) + 16 ANSI = 21 sequences
    const count = (out.match(/\x1b\]/g) || []).length;
    expect(count).toBe(21);
  });
});

describe("resetSequences", () => {
  it("includes reset codes for fg, bg, cursor, selection, and ANSI", () => {
    const out = resetSequences();
    expect(out).toContain(`\x1b]110${ST}`);
    expect(out).toContain(`\x1b]111${ST}`);
    expect(out).toContain(`\x1b]112${ST}`);
    expect(out).toContain(`\x1b]117${ST}`);
    expect(out).toContain(`\x1b]119${ST}`);
    expect(out).toContain(`\x1b]104${ST}`);
  });
});
