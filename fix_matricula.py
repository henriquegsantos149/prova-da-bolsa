import re

with open('matricula.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace prices and buttons
# Course 1: GGSR 7970
content = content.replace(
    '<p class="course-price">Valor integral: <strong>R$ 7.970,00</strong> <span class="price-note">(sem desconto)</span></p>\n                                <button class="btn btn-secondary btn-more">Saiba mais</button>',
    '<p class="course-price" id="price-ggsr" data-base="7970">Valor integral: <strong>R$ 7.970,00</strong></p>\n                                <a href="#" id="checkout-ggsr" class="btn btn-primary" style="margin-bottom: 10px; display: block; text-align: center;">FAZER MINHA MATRÍCULA</a>\n                                <button class="btn btn-secondary btn-more">Ver Grade Curricular</button>'
)

# Course 2: IDA 11970
content = content.replace(
    '<p class="course-price">Valor integral: <strong>R$ 11.970,00</strong> <span class="price-note">(sem desconto)</span></p>\n                                <button class="btn btn-secondary btn-more">Saiba mais</button>',
    '<p class="course-price" id="price-ida" data-base="11970">Valor integral: <strong>R$ 11.970,00</strong></p>\n                                <a href="#" id="checkout-ida" class="btn btn-primary" style="margin-bottom: 10px; display: block; text-align: center;">FAZER MINHA MATRÍCULA</a>\n                                <button class="btn btn-secondary btn-more">Ver Grade Curricular</button>'
)

# Replace the script to matricula.js
content = content.replace('<script src="script.js"></script>', '<script src="matricula.js"></script>')

# Remove the lead form modal at the bottom (approx lines 480-530)
content = re.sub(r'<!-- Lead Capture Modal -->.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

with open('matricula.html', 'w', encoding='utf-8') as f:
    f.write(content)

