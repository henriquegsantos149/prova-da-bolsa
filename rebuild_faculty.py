import re
import os
import shutil

courses = [
    {
        "id": "ggsr",
        "title": "Georreferenciamento",
        "project": "Pós GGSR"
    },
    {
        "id": "ida",
        "title": "MBA IDA",
        "project": "MBA IDA"
    },
    {
        "id": "iama",
        "title": "Pós IA.MA",
        "project": "Pós IA.MA"
    },
    {
        "id": "alpa",
        "title": "Pós ALPA",
        "project": "Pós ALPA"
    }
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

base_dir = '/Users/olivio/Ambiental Pro/Páginas'
dest_faculty_dir = os.path.join(base_dir, 'Prova da bolsa', 'faculty')

if not os.path.exists(dest_faculty_dir):
    os.makedirs(dest_faculty_dir)

all_course_htmls = []

for course in courses:
    tsx_path = os.path.join(base_dir, course["project"], "src", "components", "Faculty.tsx")
    with open(tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the array of objects inside faculties or similar
    # Look for blocks like { name: "...", title: "...", image: "..." }
    profs = []
    
    # Matches multiple properties, handling quotes and backticks
    blocks = re.findall(r'\{(.*?)\}', content, flags=re.DOTALL)
    for b in blocks:
        name_m = re.search(r'name:\s*["\']([^"\']+)["\']', b)
        title_m = re.search(r'title:\s*["\']([^"\']+)["\']', b)
        img_m = re.search(r'image:\s*[`"\'](?:.*?)(faculty/[^`"\']+|[^`"\'/]+\.(?:webp|png|jpg))[`"\']', b)
        
        if name_m and title_m and img_m:
            name = name_m.group(1).strip()
            title = title_m.group(1).strip()
            img_rel_path = img_m.group(1).strip()
            
            # The image might just be 'henrique.webp' or 'faculty/henrique.webp'
            if not img_rel_path.startswith('faculty/'):
                img_rel_path = 'faculty/' + img_rel_path
                
            src_img_path = os.path.join(base_dir, course["project"], "public", img_rel_path)
            
            # Sometimes it's in src/assets instead of public?
            if not os.path.exists(src_img_path):
                 src_img_path = os.path.join(base_dir, course["project"], "src", "assets", os.path.basename(img_rel_path))
                 if not os.path.exists(src_img_path):
                     print(f"Warning: could not find image {src_img_path}")
            
            # generate unique slug for the image
            ext = os.path.splitext(img_rel_path)[1]
            slug_name = slugify(name) + ext
            
            dest_img_path = os.path.join(dest_faculty_dir, slug_name)
            
            # Copy file
            if os.path.exists(src_img_path):
                shutil.copy2(src_img_path, dest_img_path)
            
            profs.append({
                "name": name,
                "title": title,
                "img": slug_name
            })
    
    # Build the HTML for this course
    faculty_avatars = ""
    for p in profs:
        faculty_avatars += f'''                                                <div class="faculty-card">
                                                    <img src="faculty/{p["img"]}" alt="{p["name"]}">
                                                    <div class="faculty-info">
                                                        <div class="faculty-name">{p["name"]}</div>
                                                        <div class="faculty-title">{p["title"]}</div>
                                                    </div>
                                                </div>\n'''
    all_course_htmls.append(faculty_avatars)


# Now we inject this back into index.html
html_path = os.path.join(base_dir, 'Prova da bolsa', 'index.html')
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

idx_counter = [0]
def replace_avatars(match):
    idx = idx_counter[0]
    idx_counter[0] += 1
    if idx < len(all_course_htmls):
        return f'<div class="faculty-avatars">\n{all_course_htmls[idx]}                                            </div>'
    return match.group(0)

# Replace the inner contents of <div class="faculty-avatars">...</div>
html = re.sub(r'<div class="faculty-avatars">.*?</div>', replace_avatars, html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html automatically.")

