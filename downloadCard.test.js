import { downloadCard } from '../src/scripts.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

jest.mock('html2canvas');
jest.mock('jspdf');

describe('downloadCard', () => {
    let cardPreview;

    beforeEach(() => {
        cardPreview = document.createElement('div');
        cardPreview.id = 'cardPreview';
        cardPreview.innerHTML = `
            <div class="card-template template1">
                <div class="card-header">
                    <h2>Іван Іванов</h2>
                    <p>Менеджер | ІТ</p>
                </div>
                <div class="card-body">
                    <p>Телефон: 1234567890</p>
                    <p>Пошта: ivan@example.com</p>
                    <p>Вік: 30</p>
                    <p>Про себе: Про себе</p>
                </div>
            </div>
        `;
        document.body.appendChild(cardPreview);

        html2canvas.mockResolvedValue({
            toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mockedImageData')
        });

        jsPDF.mockImplementation(() => ({
            addImage: jest.fn(),
            save: jest.fn()
        }));
    });

    afterEach(() => {
        document.body.removeChild(cardPreview);
    });

    test('should download card as PDF', async () => {
        await downloadCard();

        expect(html2canvas).toHaveBeenCalledWith(cardPreview, { scale: 2, useCORS: true });
        expect(jsPDF).toHaveBeenCalledWith('portrait', 'mm', 'a4');
        expect(jsPDF().addImage).toHaveBeenCalledTimes(36);
        expect(jsPDF().save).toHaveBeenCalledWith('business_cards.pdf');
    });
});
