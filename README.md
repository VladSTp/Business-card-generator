# Business Card Generator

## Опис
Веб-додаток для автоматичної генерації візитних карток, призначений для використання в університетському середовищі. Додаток дозволяє обирати посаду, автоматично підставляти персональні дані у шаблон, редагувати шаблон і зберігати візитку у форматі, готовому до друку.

## Функціонал
- Вибір посади зі списку
- Генерація шаблону з персональними даними
- Редагування шаблону
- Завантаження готової візитки для друку

## Як користуватись
1. Відкрийте `index.html` у браузері.
2. Оберіть посаду та введіть особисті дані.
3. Натисніть кнопку "Згенерувати".
4. Відредагуйте візитку (за потреби).
5. Завантажте або роздрукуйте готову візитну картку.

## Технології
- HTML / CSS / JavaScript
- DOM-маніпуляції
- Шаблонізація

## Ліцензія
Цей проєкт ліцензовано за MIT License. Деталі – у файлі `LICENSE`.


## Документування коду

У нашому проєкті використовується стандарт **JSDoc** для документування функцій та методів JavaScript. Це дозволяє забезпечити ясність коду для нових розробників та автоматично генерувати документацію.

### Стандарт JSDoc

JSDoc дозволяє додавати опис до функцій, класів, методів, що полегшує розуміння їх функціональності.

#### Приклад коментаря для функції:

```js
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
```

#### Загальні принципи
Кожна публічна функція має бути задокументована.

Усі змінні повинні мати зрозумілі імена, що описують їхню суть.

Уникайте змінних без пояснення (коментар або змінна з іменем).

Документація має бути українською мовою.

Віддавайте перевагу одинарним лапкам 'text' і шаблонним рядкам `text`.

Використовуйте ESLint або аналог для перевірки стилю коду.

## Стандарти документування (JSDoc)

Для підтримки високої якості коду та зрозумілості функцій, ми використовуємо [JSDoc](https://jsdoc.app/) — інструмент для створення документації безпосередньо з коментарів у коді.

Усі публічні функції повинні бути задокументовані у форматі JSDoc.

Після документування коду у форматі JSDoc, згенеруйте документацію:
	npm run docs



## Архітектура проєкту

Проєкт має просту односторінкову архітектуру (SPA), реалізовану на HTML, CSS і JavaScript (без бекенда). Документація згенерована за допомогою JSDoc та розгорнута через GitHub Pages.

Компоненти:

Веб-сервер: GitHub Pages (розгортання)
Application Server: не використовується (усе в браузері)
СУБД: не використовується
Файлове сховище: локальна система користувача (скачування PDF/HTML)
Кешування: не використовується
Інші: Jest — для тестування, JSDoc — для документації


## Інструкція для розробника

### Необхідні залежності

- Node.js (версія 18 або вище)
- Git
- Браузер

### Покрокова інструкція

1. Клонування репозиторію:

```
git clone https://github.com/VladSTp/Business-card-generator.git
cd Business-card-generator
```

2. Встановлення залежностей:

```
npm install
```

3. Запуск у режимі розробки:

```
npm run dev
```

4. Запуск тестів:

```
npm test
```

5. Генерація документації:

```
npm run docs
```

Документацію буде згенеровано у папку `./docs`, і вона автоматично розгортається на GitHub Pages:  
[Документація онлайн](https://vladstp.github.io/Business-card-generator/)

## Базові команди

`npm install` - Встановлення всіх залежностей 
`npm run dev` - Запуск локального середовища розробки (Vite) 
`npm test` - Юніт-тести за допомогою Jest  
`npm run docs` - Генерація документації через JSDoc
`npm run build` - Збірка проєкту для production

## Структура проєкту

```
Business-card-generator/
public/
src/
	styles/
		scripts.js
tests/
	scripts.test.js
docs/          
	README.md
	package.json
	jsdoc.json        
```

## Ліцензія

Проєкт розповсюджується під MIT ліцензією. Ви можете вільно використовувати, модифікувати та поширювати цей код.

Автор: VladSTp  
Репозиторій: [Business-card-generator](https://github.com/VladSTp/Business-card-generator)
