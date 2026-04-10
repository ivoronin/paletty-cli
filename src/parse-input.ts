const URL_PATTERN = /paletty\.dev\/p\/([A-Za-z0-9]+)/;
const RAW_ID_PATTERN = /^[A-Za-z0-9]{6,20}$/;

export function parseInput(input: string): string {
  const urlMatch = input.match(URL_PATTERN);
  if (urlMatch) return urlMatch[1];

  if (RAW_ID_PATTERN.test(input)) return input;

  throw new Error(
    `Invalid palette ID or URL: ${input}\nExpected a palette ID (e.g. MDuOiG28cV) or URL (e.g. https://paletty.dev/p/MDuOiG28cV/name)`,
  );
}
