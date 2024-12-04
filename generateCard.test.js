import * as scripts from '../src/scripts.js';

describe('generateCard', () => {
    let form;

    beforeEach(() => {
        // Імітація форми
        form = document.createElement('form');
        form.innerHTML = `
            <input type="text" id="name" name="name">
            <small class="error" id="nameError"></small>
            <input type="text" id="surname" name="surname">
            <small class="error" id="surnameError"></small>
            <input type="text" id="phone" name="phone">
            <small class="error" id="phoneError"></small>
            <input type="email" id="email" name="email">
            <small class="error" id="emailError"></small>
            <input type="number" id="age" name="age">
            <small class="error" id="ageError"></small>
            <textarea id="about" name="about"></textarea>
            <select id="position" name="position">
                <option value="manager">Менеджер</option>
            </select>
            <select id="department" name="department">
                <option value="it">ІТ</option>
            </select>
            <select id="template" name="template">
                <option value="template1">Шаблон 1</option>
            </select>
            <button type="button" onclick="generateCard()">Генерувати</button>
            <div id="cardPreview"></div>
            <button id="editBtn" style="display: none;" onclick="enableEditing()">Редагувати</button>
            <button id="downloadBtn" style="display: none;" onclick="downloadCard()">Завантажити</button>
        `;
        document.body.appendChild(form);
    });

    afterEach(() => {
        document.body.removeChild(form);
    });

    test('should generate card with valid data', () => {
        document.getElementById('name').value = 'Іван';
        document.getElementById('surname').value = 'Іванов';
        document.getElementById('phone').value = '1234567890';
        document.getElementById('email').value = 'ivan@example.com';
        document.getElementById('age').value = '30';
        document.getElementById('about').value = 'Про себе';

        scripts.generateCard();

        const cardPreview = document.getElementById('cardPreview');
        expect(cardPreview.innerHTML).toContain('Іван Іванов');
        expect(cardPreview.innerHTML).toContain('Менеджер | ІТ');
        expect(cardPreview.innerHTML).toContain('Телефон: 1234567890');
        expect(cardPreview.innerHTML).toContain('Пошта: ivan@example.com');
        expect(cardPreview.innerHTML).toContain('Вік: 30');
        expect(cardPreview.innerHTML).toContain('Про себе: Про себе');
    });

    test('should show errors for missing required fields', () => {
        scripts.generateCard();

        const nameError = document.getElementById('nameError');
        const surnameError = document.getElementById('surnameError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const ageError = document.getElementById('ageError');

        expect(nameError.textContent).toBe('Це поле обов’язкове');
        expect(surnameError.textContent).toBe('Це поле обов’язкове');
        expect(phoneError.textContent).toBe('Це поле обов’язкове');
        expect(emailError.textContent).toBe('Це поле обов’язкове');
        expect(ageError.textContent).toBe('Це поле обов’язкове');
    });
});
