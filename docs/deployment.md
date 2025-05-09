# Інструкція з розгортання проєкту у production-середовищі

Цей документ призначений для **Release Engineer / DevOps фахівців** і описує кроки для розгортання генератора візитних карток у робочому середовищі.

## Вимоги до апаратного забезпечення

Архітектура: x86_64 (або ARM64 при відповідній підтримці Node.js)
CPU: 2 ядра (мінімум), рекомендовано 4 ядра
ОЗП: від 2 ГБ, рекомендовано 4 ГБ
Диск: 500 МБ для коду + 1 ГБ для збереження логів/кешу

## Необхідне програмне забезпечення

Node.js: версія 18 або вище
npm: автоматично йде з Node.js
Git: для отримання коду з GitHub
Веб-сервер: Nginx або Apache (за потреби)
PM2: для процес-менеджменту Node.js застосунків

## Налаштування мережі

Відкритий порт: `80` (або `443` для HTTPS)
Забезпечити можливість виходу в інтернет для встановлення залежностей
Дозволити доступ до GitHub-репозиторію

## Конфігурація серверів

1. Створіть окремого користувача для запуску проєкту (наприклад: `appuser`)
2. Встановіть Node.js (можна через `nvm` або офіційний установник)
3. Клонуйте репозиторій:

```
git clone https://github.com/VladSTp/Business-card-generator.git
cd Business-card-generator
```

4. Встановіть залежності:

```
npm install
```

5. Збірка (якщо використовується):

```
npm run build
```

## Налаштування СУБД

Не вимагається. Проєкт не використовує базу даних.

## Розгортання коду

### Варіант 1: Запуск безпосередньо з Node.js (для невеликих серверів)

```
npm start
```

## Перевірка працездатності

Після запуску:

1. Відкрийте браузер і перейдіть за адресою `https://github.com/VladSTp/Business-card-generator`
2. Перевірте, що сторінка з формою генерації візитної картки завантажується
3. Спробуйте створити візитку та згенерувати HTML — це підтвердить, що JS-код працює

