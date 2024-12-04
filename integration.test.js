const puppeteer = require('puppeteer');

describe('Інтеграційне тестування веб-додатку генерації візитних карток', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('file://D:/Sublime/PRP/index.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Тест-кейс 1: Перевірка правильності відображення введених даних на візитівці', async () => {
        await page.type('#name', 'Іван');
        await page.type('#surname', 'Іваненко');
        await page.type('#phone', '+380123456789');
        await page.type('#email', 'ivan@example.com');
        await page.type('#age', '30');
        await page.select('#position', 'Менеджер');
        await page.select('#department', 'Продажі');
        await page.click('button[onclick="generateCard()"]');

        const cardPreviewContent = await page.$eval('#cardPreview', el => el.textContent);
        expect(cardPreviewContent).toContain('Іван Іваненко');
        expect(cardPreviewContent).toContain('Менеджер | Продажі');
        expect(cardPreviewContent).toContain('Телефон: +380123456789');
        expect(cardPreviewContent).toContain('Пошта: ivan@example.com');
        expect(cardPreviewContent).toContain('Вік: 30');
    });

    test('Тест-кейс 2: Перевірка повідомлення про помилку для обов’язкових полів', async () => {
        await page.type('#surname', 'Іваненко');
        await page.type('#phone', '+380123456789');
        await page.type('#email', 'ivan@example.com');
        await page.type('#age', '30');
        await page.select('#position', 'Менеджер');
        await page.select('#department', 'Продажі');
        await page.click('button[onclick="generateCard()"]');

        const nameError = await page.$eval('#nameError', el => el.textContent);
        expect(nameError).toBe('Це поле обов’язкове');
        
        const cardPreviewContent = await page.$eval('#cardPreview', el => el.textContent);
        expect(cardPreviewContent).toBe('');
    });
});
