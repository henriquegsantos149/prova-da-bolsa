import re, os
base_dir = "/Users/olivio/Ambiental Pro/Páginas"
tsx_path = os.path.join(base_dir, "Pós GGSR", "src", "components", "Faculty.tsx")
with open(tsx_path, "r", encoding="utf-8") as f:
    content = f.read()
blocks = re.findall(r"\{(.*?)\}", content, flags=re.DOTALL)
for b in blocks:
    name_m = re.search(r'name:\s*["\']([^"\']+)["\']', b)
    title_m = re.search(r'title:\s*["\']([^"\']+)["\']', b)
    img_m = re.search(r'image:\s*[`"\'](?:.*?)(faculty/[^`"\']+|[^`"\'/]+\.(?:webp|png|jpg))[`"\']', b)
    if img_m:
        print("MATCHED:", img_m.group(1))
    else:
        if name_m:
            print("FAILED TO MATCH IMAGE IN BLOCK:", b)
