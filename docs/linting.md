Обраний інструмент:
•	Лінтер: ESLint
•	Мова: JavaScript
•	Причина вибору:
1.	Найбільш популярний лінтер для JavaScript
2.	Підтримка стандартів ECMAScript
3.	Велика кількість плагінів
4.	Легка інтеграція в редактор коду (наприклад, VS Code)
5.	Підтримка кастомних правил та гнучка конфігурація

Визначення важливих критеріїв якості коду:
•	Дотримання єдиного стилю
•	Виявлення синтаксичних помилок
•	Попередження потенційних багів
•	Безпечність та чистота коду
•	Підвищення читабельності

## Git Hooks
Проєкт використовує Husky для запуску ESLint перед комітом.

## Інтеграція з процесом збірки
ESLint запускається автоматично перед запуском збірки, що запобігає потраплян-ню неякісного коду.

## Статична типізація
Проєкт використовує TypeScript. Для перевірки типів використовується:
