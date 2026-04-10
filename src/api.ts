const API_BASE = "https://paletty.dev/api";

export async function fetchPalette(
  id: string,
): Promise<Record<string, string>> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/palettes/${id}`);
  } catch {
    throw new Error("Could not connect to paletty.dev");
  }

  if (res.status === 404) throw new Error(`Palette not found: ${id}`);
  if (!res.ok) throw new Error(`API error: HTTP ${res.status}`);

  const data = await res.json();
  if (!data.colors || typeof data.colors !== "object") {
    throw new Error("Unexpected API response: missing colors");
  }

  return data.colors;
}
