# paletty-cli

Apply [paletty.dev](https://paletty.dev) color themes to your terminal via [OSC escape sequences](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands).

Works per-session, so you can run different themes in different terminal windows.

## Usage

```bash
npx @ivoronin/paletty apply <palette-id-or-url>
npx @ivoronin/paletty reset
```

## Examples

```bash
# Apply by palette ID
npx @ivoronin/paletty apply 7yC6wqIjOGN

# Apply by URL
npx @ivoronin/paletty apply https://paletty.dev/p/7yC6wqIjOGN/tokyo-night

# Reset terminal colors to defaults
npx @ivoronin/paletty reset
```

## Terminal support

OSC color sequences are supported by most modern terminals, including Ghostty, iTerm2, Kitty, WezTerm, Alacritty, Foot, and Windows Terminal.

## License

MIT
