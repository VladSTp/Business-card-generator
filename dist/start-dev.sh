#!/bin/bash

echo "Запуск проекту в режимі розробки..."

if ! command -v node &> /dev/null; then
    echo "Node.js не встановлено. Будь ласка, встановіть його."
    exit 1
fi

echo "Встановлення залежностей..."
npm install

echo "Запуск локального сервера..."
npx live-server public --port=3000 --open
