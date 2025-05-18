/*
 * Генерує візитку на основі введених даних.
 * 
 * Ця функція збирає дані з форми, перевіряє їх на коректність, і якщо вони валідні,
 * генерує HTML-код візитки, який відображається в попередньому перегляді.
 */ 
function generateCard() {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const about = document.getElementById("about").value.trim();
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;
    const template = document.getElementById("template").value;

    const errors = document.querySelectorAll(".error");
    errors.forEach(error => error.textContent = "");

    let valid = true;

    if (!name) {
        document.getElementById("nameError").textContent = "Це поле обов’язкове";
        valid = false;
    }
    if (!surname) {
        document.getElementById("surnameError").textContent = "Це поле обов’язкове";
        valid = false;
    }
    if (!phone) {
        document.getElementById("phoneError").textContent = "Це поле обов’язкове";
        valid = false;
    }
    if (!email) {
        document.getElementById("emailError").textContent = "Це поле обов’язкове";
        valid = false;
    }
    if (!age) {
        document.getElementById("ageError").textContent = "Це поле обов’язкове";
        valid = false;
    }

    if (!valid) return;

    let cardHTML = generateTemplateHTML(name, surname, phone, email, age, position, department, about, template);

    const cardPreview = document.getElementById("cardPreview");
    cardPreview.innerHTML = cardHTML;

    document.getElementById("editBtn").style.display = "block";
    document.getElementById("downloadBtn").style.display = "block";
}

/**
 * Показує попередній перегляд шаблону візитки.
 * 
 * Ця функція створює шаблон для попереднього перегляду візитки з дефолтними даними.
 * Вона заповнює елементи попереднього перегляду за допомогою шаблону, обраного користувачем.
 */
function showTemplatePreview() {
    const template = document.getElementById("template").value;
    const cardPreview = document.getElementById("cardPreview");

    const placeholderHTML = generateTemplateHTML("Ім'я X", "Прізвище X", "Телефон X", "Пошта X", "Вік X", "Менеджер", "ІТ", "", template);

    cardPreview.innerHTML = placeholderHTML;
}

/**
 * Генерує HTML-код візитки на основі введених даних та вибраного шаблону.
 * 
 * @param {string} name - Ім'я особи для візитки.
 * @param {string} surname - Прізвище особи для візитки.
 * @param {string} phone - Телефонний номер.
 * @param {string} email - Електронна пошта.
 * @param {string} age - Вік особи.
 * @param {string} position - Посада.
 * @param {string} department - Відділ.
 * @param {string} about - Опис (про себе).
 * @param {string} template - Шаблон для візитки.
 * 
 * @returns {string} HTML-код для відображення візитки.
 */
function generateTemplateHTML(name, surname, phone, email, age, position, department, about, template) {
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

/**
 * Дозволяє редагувати візитку безпосередньо на сторінці.
 * 
 * Ця функція додає можливість редагування візитки за допомогою атрибута `contenteditable`.
 * Вона надає користувачеві можливість редагувати візитку безпосередньо в браузері.
 */
function enableEditing() {
    const cardTemplate = document.querySelector(".card-template");
    cardTemplate.setAttribute("contenteditable", "true");
}

/**
 * Завантажує візитку як PDF.
 * 
 * Ця функція створює PDF-файл на основі відображеної візитки. Візитка рендериться на канвасі за допомогою html2canvas,
 * конвертується у формат PNG і розміщується багаторазово на сторінках PDF-файлу згідно з кількістю, зазначеною користувачем.
 * Якщо кількість перевищує доступне місце на одній сторінці, створюється нова сторінка. 
 * Після генерації файл зберігається під назвою "business_cards.pdf".
 */
function downloadCard() {
    const cardPreview = document.getElementById("cardPreview");
    const cardCount = parseInt(document.getElementById("cardCount").value) || 1;

    html2canvas(cardPreview, {
        scale: 2,
        useCORS: true
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jspdf.jsPDF("portrait", "mm", "a4");

        const cardWidth = 60;
        const aspectRatio = canvas.height / canvas.width;
        const cardHeight = cardWidth * aspectRatio;
        const marginX = 15;
        const marginY = 10;
        const gapX = 0;
        const gapY = 0;

        const cardsPerRow = 3;
        const cardsPerColumn = 9;
        const cardsPerPage = cardsPerRow * cardsPerColumn;

        for (let i = 0; i < cardCount; i++) {
            const pageIndex = Math.floor(i / cardsPerPage);
            const indexInPage = i % cardsPerPage;

            const row = Math.floor(indexInPage / cardsPerRow);
            const col = indexInPage % cardsPerRow;

            const posX = marginX + col * (cardWidth + gapX);
            const posY = marginY + row * (cardHeight + gapY);

            if (i > 0 && i % cardsPerPage === 0) {
                doc.addPage();
            }

            doc.addImage(imgData, "PNG", posX, posY, cardWidth, cardHeight);
        }

        doc.save("business_cards.pdf");
    });
}
