import { generateTemplateHTML } from '../src/scripts.js';


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

    test('should generate HTML without "Про себе" if it is empty', () => {
        const html = generateTemplateHTML('Іван', 'Іванов', '1234567890', 'ivan@example.com', '30', 'Менеджер', 'ІТ', '', 'template1');
        expect(html).not.toContain('<p>Про себе: </p>');
    });
});
