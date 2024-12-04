import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function generateCard() {
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const about = document.getElementById('about').value.trim();
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const template = document.getElementById('template').value;

    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');

    let valid = true;

    if (!name) {
        document.getElementById('nameError').textContent = 'Це поле обов’язкове';
        valid = false;
    }
    if (!surname) {
        document.getElementById('surnameError').textContent = 'Це поле обов’язкове';
        valid = false;
    }
    if (!phone) {
        document.getElementById('phoneError').textContent = 'Це поле обов’язкове';
        valid = false;
    }
    if (!email) {
        document.getElementById('emailError').textContent = 'Це поле обов’язкове';
        valid = false;
    }
    if (!age) {
        document.getElementById('ageError').textContent = 'Це поле обов’язкове';
        valid = false;
    }

    if (!valid) return;

    const positionText = {
        manager: 'Менеджер',
        developer: 'Розробник',
        designer: 'Дизайнер',
        analyst: 'Аналітик',
        marketer: 'Маркетолог'
    }[position];

    const departmentText = {
        it: 'ІТ',
        hr: 'HR',
        sales: 'Продажі',
        finance: 'Фінанси',
        marketing: 'Маркетинг'
    }[department];

    let cardHTML = generateTemplateHTML(name, surname, phone, email, age, positionText, departmentText, about, template);

    const cardPreview = document.getElementById('cardPreview');
    cardPreview.innerHTML = cardHTML;

    document.getElementById('editBtn').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

export function showTemplatePreview() {
    const template = document.getElementById('template').value;
    const cardPreview = document.getElementById('cardPreview');

    const placeholderHTML = generateTemplateHTML("Ім'я X", "Прізвище X", "Телефон X", "Пошта X", "Вік X", "Менеджер", "ІТ", "", template);

    cardPreview.innerHTML = placeholderHTML;
}

export function generateTemplateHTML(name, surname, phone, email, age, position, department, about, template) {
    return `
        <div class="card-template ${template}">
            <div class="card-header">
                <h2>${name} ${surname}</h2>
                <p>${position} | ${department}</p>
            </div>
            <div class="card-body">
                <p>Телефон: ${phone}</p>
                <p>Пошта: ${email}</p>
                <p>Вік: ${age}</p>
                ${about ? `<p>Про себе: ${about}</p>` : ""}
            </div>
        </div>
    `;
}

export function enableEditing() {
    const cardTemplate = document.querySelector('.card-template');
    cardTemplate.setAttribute('contenteditable', 'true');
}

export function downloadCard() {
    const cardPreview = document.getElementById('cardPreview');

    html2canvas(cardPreview, {
        scale: 2, 
        useCORS: true
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png'); 
        const doc = new jsPDF('portrait', 'mm', 'a4');

        const cardWidth = 50; // Ширина візитки 
        const cardHeight = 30; // Висота візитки 
        const marginX = 5; // Відступ зліва
        const marginY = 10; // Відступ зверху
        const gapX = 0; // Проміжок між стовпцями
        const gapY = 0; // Проміжок між рядками

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 4; col++) {
                const posX = marginX + col * (cardWidth + gapX);
                const posY = marginY + row * (cardHeight + gapY);

                doc.addImage(imgData, 'PNG', posX, posY, cardWidth, cardHeight);
            }
        }

        doc.save('business_cards.pdf');
    });
}




