const ST = "\x1b\\";

const SLOT_TO_OSC: Record<string, number> = {
  "core.foreground": 10,
  "core.background": 11,
  "core.cursor": 12,
  "core.selectionBackground": 17,
  "core.selectionForeground": 19,
};

function osc(code: number, color: string): string {
  return `\x1b]${code};${color}${ST}`;
}

export function applySequences(colors: Record<string, string>): string {
  let out = "";

  for (const [slot, code] of Object.entries(SLOT_TO_OSC)) {
    const color = colors[slot];
    if (color) out += osc(code, color);
  }

  for (let i = 0; i < 8; i++) {
    const normal = colors[`ansi.normal.${i}`];
    if (normal) out += osc(4, `${i};${normal}`);

    const bright = colors[`ansi.bright.${i}`];
    if (bright) out += osc(4, `${i + 8};${bright}`);
  }

  return out;
}

export function resetSequences(): string {
  return [
    `\x1b]110${ST}`,
    `\x1b]111${ST}`,
    `\x1b]112${ST}`,
    `\x1b]117${ST}`,
    `\x1b]119${ST}`,
    `\x1b]104${ST}`,
  ].join("");
}
