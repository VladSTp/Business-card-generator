#!/bin/bash

echo "=== Розгортання проєкту ==="

REPO_URL="https://github.com/VladSTp/Business-card-generator.git"
TARGET_DIR="$HOME/business-card"

if [ -d "$TARGET_DIR" ]; then
  echo "Каталог $TARGET_DIR вже існує. Видаляємо..."
  rm -rf "$TARGET_DIR"
fi

echo "Клонування репозиторію..."
git clone "$REPO_URL" "$TARGET_DIR"
cd "$TARGET_DIR" || exit

echo "Встановлення залежностей..."
npm install

echo "Запуск проєкту (dev mode)..."
npm run dev
