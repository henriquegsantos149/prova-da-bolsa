import re

html_path = 'index.html'
css_path = 'style.css'
js_path = 'script.js'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the ul containing the info with the new course-highlights and the carousel wrapper
def replace_course_info(match):
    content = match.group(0)
    
    # Extract the info
    titulo = re.search(r'<li><strong>Título:</strong> (.*?)</li>', content).group(1)
    duracao = re.search(r'<li><strong>Duração:</strong> (.*?)</li>', content).group(1)
    carga = re.search(r'<li><strong>Carga Horária:</strong> (.*?)</li>', content).group(1)
    modalidade = re.search(r'<li><strong>Modalidade:</strong> (.*?)</li>', content).group(1)
    
    # Extract the faculty avatars inner content
    faculty_avatars = re.search(r'<div class="faculty-avatars">(.*?)</div>', content, flags=re.DOTALL).group(1)
    
    new_html = f'''                                    <div class="course-highlights">
                                        <div class="highlight-item">
                                            <span class="highlight-label">Título</span>
                                            <span class="highlight-value">{titulo}</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="highlight-label">Duração</span>
                                            <span class="highlight-value">{duracao}</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="highlight-label">Carga Horária</span>
                                            <span class="highlight-value">{carga}</span>
                                        </div>
                                        <div class="highlight-item">
                                            <span class="highlight-label">Modalidade</span>
                                            <span class="highlight-value">{modalidade}</span>
                                        </div>
                                    </div>
                                    <div class="faculty-group">
                                        <strong>Professores:</strong>
                                        <div class="carousel-container">
                                            <button class="carousel-btn prev-btn" aria-label="Anterior">&#10094;</button>
                                            <div class="faculty-avatars">
{faculty_avatars}                                            </div>
                                            <button class="carousel-btn next-btn" aria-label="Próximo">&#10095;</button>
                                        </div>
                                    </div>'''
    
    return new_html

# The regex will match the <ul> starting with <li><strong>Título:</strong>... down to the closing </li> of the faculty-group and the closing </ul>
html = re.sub(r'<ul>\s*<li><strong>Título:</strong>.*?<li class="faculty-group">.*?</li>\s*</ul>', replace_course_info, html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("HTML updated")

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """
/* Course Highlights */
.course-highlights {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.highlight-item {
    background: rgba(49, 168, 168, 0.1);
    border: 1px solid var(--teal-blue);
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.highlight-label {
    font-size: 0.8rem;
    color: var(--green-2);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 5px;
}

.highlight-value {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
}

/* Faculty Carousel */
.faculty-group {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 25px;
}

.carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.carousel-btn {
    background: var(--primary-dark);
    border: 1px solid var(--green-2);
    color: var(--green-2);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 10;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.carousel-btn:hover {
    background: var(--green-2);
    color: var(--primary-dark);
}

.prev-btn {
    margin-right: 10px;
}

.next-btn {
    margin-left: 10px;
}

.faculty-avatars {
    display: flex;
    flex-wrap: nowrap;
    gap: 15px;
    overflow-x: auto;
    scroll-behavior: smooth;
    /* Hide scrollbar */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.faculty-avatars::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
}

.faculty-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.3s ease, border-color 0.3s ease;
    flex: 0 0 160px;
}

.faculty-card:hover {
    transform: translateY(-5px);
    border-color: var(--teal-blue);
    background: rgba(255, 255, 255, 0.08);
}

.faculty-card img {
    width: 85px;
    height: 85px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 12px;
    border: 1px solid var(--green-2);
}

.faculty-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.faculty-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--light-gray);
    line-height: 1.2;
}

.faculty-title {
    font-size: 0.7rem;
    color: #a0a0a0;
    line-height: 1.2;
}
"""

# Replace old css related to faculty
css = re.sub(r'\.faculty-group \{.*?(?=\/\* Header \*\/)', new_css.strip() + '\n\n', css, flags=re.DOTALL)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("CSS updated")

with open(js_path, 'a', encoding='utf-8') as f:
    f.write("""

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.faculty-avatars');
            container.scrollBy({ left: -200, behavior: 'smooth' });
        });
    });
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.faculty-avatars');
            container.scrollBy({ left: 200, behavior: 'smooth' });
        });
    });
});
""")
print("JS updated")

