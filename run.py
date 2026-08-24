path = "frontend/src/themes/ThemePreviewLayout.jsx"

# Read current file, ambil hanya bagian yang benar (lines 1-206)
lines = open(path, encoding="utf-8").read().splitlines()

# Cari closing brace pertama setelah baris 195
# Pola: line dengan hanya "}" pada posisi indent 0
first_close = None
for i in range(195, len(lines)):
    if lines[i] == "}":
        first_close = i + 1
        break

print(f"First closing brace at line {first_close}")
print(f"Total lines: {len(lines)}")

# Keep only lines up to first close
if first_close:
    clean = "\n".join(lines[:first_close]) + "\n"
    open(path, "w", encoding="utf-8").write(clean)
    print(f"Written {first_close} lines")
    # Verify
    result = open(path, encoding="utf-8").read()
    print("Has export default:", "export default function" in result)
    print("Orphan lines removed:", len(lines) - first_close)
