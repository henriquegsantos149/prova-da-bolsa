import re

html_path = 'index.html'
css_path = 'style.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

courses = [
    {
        "course_title": "Georreferenciamento",
        "profs": [
            {"img": "henrique.webp", "name": "Henrique Gonzalez", "title": "Engenheiro Ambiental (UFRJ)"},
            {"img": "raquel.webp", "name": "Raquel Carnivalle Melillo", "title": "Doutora em Ambiente e Sociedade (UNICAMP)"},
            {"img": "rodolfo.webp", "name": "Rodolfo Finatti", "title": "Geógrafo (UNESP), PhD em Geografia (USP)"},
            {"img": "vitor.webp", "name": "Vitor do Sacramento", "title": "Geólogo (UNB) com MBA"},
            {"img": "luis.webp", "name": "Luís Antônio Soares", "title": "Engenheiro Agrimensor (UFU)"},
            {"img": "ana.webp", "name": "Ana Beatriz Ulhoa", "title": "Engenheira Ambiental"},
            {"img": "charlie.webp", "name": "Charlie Turette Lopes", "title": "Engenheiro de Produção"},
            {"img": "bismarck.webp", "name": "Bismarck Feuchard", "title": "Eng. Civil (INCRA)"}
        ]
    },
    {
        "course_title": "MBA IDA",
        "profs": [
            {"img": "henrique.webp", "name": "Henrique Gonzalez", "title": "Engenheiro Ambiental (UFRJ)"},
            {"img": "marlon.webp", "name": "Marlon Fernandes de Souza", "title": "Doutor em Eng. Agrícola (Unicamp)"},
            {"img": "lucas.webp", "name": "Lucas Baldoni", "title": "Doutor em Análise Ambiental (Unicamp)"},
            {"img": "vitor.webp", "name": "Vitor do Sacramento", "title": "Geólogo e Especialista (UNB)"},
            {"img": "vitor-amorim.webp", "name": "Vitor Amorim", "title": "Especialista em Sustentabilidade"}
        ]
    },
    {
        "course_title": "Pós IA.MA",
        "profs": [
            {"img": "henrique.webp", "name": "Henrique Gonzalez", "title": "Engenheiro Ambiental (UFRJ) e Co-fundador da Ambiental Pro"},
            {"img": "hermann.webp", "name": "Hermann Fernandes", "title": "Engenheiro Ambiental (UFRJ) e Especialista em Ciência de Dados"},
            {"img": "victor.webp", "name": "Victor Valente Silvestre", "title": "Engenheiro Sanitarista e Ambiental, Mestre e Pesquisador"},
            {"img": "vinicius.webp", "name": "Vinícius Ragghianti", "title": "Engenheiro Ambiental e Sanitarista, Advogado, MBA em Gestão de Projetos"},
            {"img": "ariel.webp", "name": "Ariel Dias", "title": "Mestre em Ciência da Computação e Autor"},
            {"img": "luis.webp", "name": "Luís Otávio Perin", "title": "Especialista em Desenvolvimento de Software e Ciências Contábeis"},
            {"img": "danilo.webp", "name": "Danilo Moreira Soares", "title": "Coordenador de TI e Mestre em Administração"}
        ]
    },
    {
        "course_title": "Pós ALPA",
        "profs": [
            {"img": "henrique.webp", "name": "Henrique Gonzalez", "title": "Engenheiro Ambiental (UFRJ)"},
            {"img": "rafael.webp", "name": "Rafael Timbola", "title": "Mestre e Doutor em Engenharia"},
            {"img": "bruna.webp", "name": "Bruna Balestrin Piaia", "title": "Doutora em Engenharia Florestal"},
            {"img": "hugo.webp", "name": "Hugo Ferreira", "title": "Mestre em Gestão de Riscos (UFPA)"},
            {"img": "anelise.webp", "name": "Anelise Gomes da Silva", "title": "Doutoranda em Ciências Ambientais (USP)"},
            {"img": "relva.webp", "name": "Relva Beltrão", "title": "Mestre em Tecnologia Ambiental"},
            {"img": "jessica.webp", "name": "Jéssica Michalak Besen", "title": "Engenheira Ambiental (PUC-PR)"}
        ]
    }
]

import re

def replacer(match, idx):
    profs = courses[idx]['profs']
    new_html = '<div class="faculty-avatars">\n'
    for p in profs:
        new_html += f'''                                                <div class="faculty-card">
                                                    <img src="faculty/{p["img"]}" alt="{p["name"]}">
                                                    <div class="faculty-info">
                                                        <div class="faculty-name">{p["name"]}</div>
                                                        <div class="faculty-title">{p["title"]}</div>
                                                    </div>
                                                </div>\n'''
    new_html += '                                            </div>'
    return new_html

parts = re.split(r'(<div class="faculty-avatars">.*?</div>)', html, flags=re.DOTALL)
if len(parts) == 9: # 4 matches -> 9 parts
    new_html = parts[0] + replacer(parts[1], 0) + parts[2] + replacer(parts[3], 1) + parts[4] + replacer(parts[5], 2) + parts[6] + replacer(parts[7], 3) + parts[8]
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("HTML updated")
else:
    print("Error splitting html")

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """
.faculty-group {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}

.faculty-avatars {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
    margin-top: 10px;
}

.faculty-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px;
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.faculty-card:hover {
    transform: translateY(-5px);
    border-color: var(--teal-blue);
    background: rgba(255, 255, 255, 0.08);
}

.faculty-card img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 10px;
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

# replace the old css
old_css_regex = r'\.faculty-group \{.*?(?=\/\* Header \*\/)'
css = re.sub(old_css_regex, new_css.strip() + '\n\n', css, flags=re.DOTALL)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("CSS updated")
