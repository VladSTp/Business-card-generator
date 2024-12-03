const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let dom;
let document;

describe('generateCard', () => {
  beforeEach(() => {
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should display error messages for empty required fields', () => {
    const generateCard = require('../scripts.js').generateCard;
    generateCard();

    const nameError = document.getElementById('nameError').textContent;
    expect(nameError).toBe('Це поле обов’язкове');
  });

  it('should generate the card when all fields are filled', () => {
    document.getElementById('name').value = 'John';
    document.getElementById('surname').value = 'Doe';
    document.getElementById('phone').value = '123456789';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('age').value = '25';

    const generateCard = require('../scripts.js').generateCard;
    generateCard();

    const cardContent = document.getElementById('cardPreview').innerHTML;
    expect(cardContent).toContain('John Doe');
  });
});
