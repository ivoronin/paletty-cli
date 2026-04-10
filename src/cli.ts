import { parseInput } from "./parse-input.js";
import { fetchPalette } from "./api.js";
import { applySequences, resetSequences } from "./osc.js";

const USAGE = `paletty - Apply terminal color themes from paletty.dev

Usage:
  paletty apply <id-or-url>   Apply a palette's colors via OSC sequences
  paletty reset               Reset colors to terminal defaults

Examples:
  paletty apply MDuOiG28cV
  paletty apply https://paletty.dev/p/MDuOiG28cV/tokyo-night
  paletty reset`;

async function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === "--help" || command === "-h") {
    console.log(USAGE);
    return;
  }

  if (command === "reset") {
    process.stdout.write(resetSequences());
    return;
  }

  if (command === "apply") {
    if (!args[0]) {
      console.error("Error: missing palette ID or URL\n");
      console.error(USAGE);
      process.exit(1);
    }

    const id = parseInput(args[0]);
    const colors = await fetchPalette(id);
    process.stdout.write(applySequences(colors));
    return;
  }

  console.error(`Unknown command: ${command}\n`);
  console.error(USAGE);
  process.exit(1);
}

main().catch((err: Error) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
