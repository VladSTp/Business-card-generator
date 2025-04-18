#!/bin/bash

echo "=== Оновлення проєкту ==="

TARGET_DIR="$HOME/business-card"

cd "$TARGET_DIR" || {
  echo "Каталог не знайдено: $TARGET_DIR"
  exit 1
}

echo "Оновлення коду з Git..."
git pull

echo "Оновлення залежностей..."
npm install

echo "Білд проєкту..."
npm run build
