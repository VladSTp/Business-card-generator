#!/bin/bash

echo "Запуск проєкту в продакшн-середовищі..."

npm install --omit=dev

echo "Копіювання файлів у dist..."
mkdir -p dist
cp -r public/* dist/

echo "Запуск сервера на порту 8080..."
npx http-server dist -p 8080
