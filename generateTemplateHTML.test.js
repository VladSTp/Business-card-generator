/**
 * Генерує HTML для візитної картки користувача.
 * 
 * @param {string} firstName - Ім'я.
 * @param {string} lastName - Прізвище.
 * @param {string} phone - Телефон.
 * @param {string} email - Електронна пошта.
 * @param {string} age - Вік.
 * @param {string} position - Посада.
 * @param {string} department - Відділ.
 * @param {string} about - Інформація про користувача.
 * @param {string} template - Назва шаблону.
 * 
 * @returns {string} HTML-код для візитки.
 */
export function generateTemplateHTML(firstName, lastName, phone, email, age, position, department, about, template) {
    let html = `<div class="card-template ${template}">`;
    html += `<h2>${firstName} ${lastName}</h2>`;
    html += `<p>${position} | ${department}</p>`;
    html += `<p>Телефон: ${phone}</p>`;
    html += `<p>Пошта: ${email}</p>`;
    html += `<p>Вік: ${age}</p>`;
    if (about) html += `<p>Про себе: ${about}</p>`;
    html += `</div>`;
    return html;
}

/**
 * Тести для generateTemplateHTML.
 */
describe('generateTemplateHTML', () => {

    test('should generate HTML for template1', () => {
        const html = generateTemplateHTML('Іван', 'Іванов', '1234567890', 'ivan@example.com', '30', 'Менеджер', 'ІТ', 'Про себе', 'template1');
        expect(html).toContain('<div class="card-template template1">');
        expect(html).toContain('<h2>Іван Іванов</h2>');
        expect(html).toContain('<p>Менеджер | ІТ</p>');
        expect(html).toContain('<p>Телефон: 1234567890</p>');
        expect(html).toContain('<p>Пошта: ivan@example.com</p>');
        expect(html).toContain('<p>Вік: 30</p>');
        expect(html).toContain('<p>Про себе: Про себе</p>');
    });

    test('should generate HTML without "Про себе" if empty', () => {
        const html = generateTemplateHTML('Іван', 'Іванов', '1234567890', 'ivan@example.com', '30', 'Менеджер', 'ІТ', '', 'template1');
        expect(html).not.toContain('<p>Про себе: </p>');
    });
});
