def parse_rle(rle, width=None, height=None):
    """Parst ein RLE-Pattern in ein 2D-Grid."""
    lines = rle.splitlines()
    header = [line for line in lines if line.startswith('#')]
    pattern = [line for line in lines if not line.startswith('#')]
    pattern = ''.join(pattern).replace('\n', '')

    # RLE dekodieren
    rows = []
    current_row = []
    count = ''
    for char in pattern:
        if char.isdigit():
            count += char  # Baue Ziffern zusammen
        elif char in 'bo':
            current_row.extend([1 if char == 'o' else 0] * (int(count) if count else 1))
            count = ''
        elif char == '$':
            rows.append(current_row)
            current_row = []
    rows.append(current_row)  # Letzte Zeile hinzufügen

    # Normalisieren: Sicherstellen, dass alle Zeilen gleich lang sind
    max_length = max(len(row) for row in rows)
    grid = [row + [0] * (max_length - len(row)) for row in rows]

    # Optional: Größe anpassen
    if width or height:
        target_width = width if width else len(grid[0])
        target_height = height if height else len(grid)
        padded_grid = [[0] * target_width for _ in range(target_height)]

        for i in range(min(target_height, len(grid))):
            for j in range(min(target_width, len(grid[i]))):
                padded_grid[i][j] = grid[i][j]
        grid = padded_grid

    return grid

patterns = {
    "glider": "bo$2bo$3o!",
    "blinker": "3o$!",
    "toad": "2bo$2ob$!"
}