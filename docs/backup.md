# Інструкція з резервного копіювання

## Стратегія резервного копіювання

Мета — гарантувати збереження всіх критичних компонентів системи у разі збоїв, атак або людських помилок.

## Типи резервних копій

Повна — зберігає всю систему/дані цілком.
Інкрементальна — зберігає лише зміни від останньої резервної копії.
Диференціальна — зберігає зміни від останньої повної копії.

## Зберігання та ротація копій

Місце зберігання: `/backups/` (локально), AWS S3 (хмара).
Ротація:
Інкрементальні — зберігати 7 днів.
Диференціальні — зберігати 14 днів.
Повні — зберігати 1 місяць.
Використання `rsnapshot`, `restic`, `rclone`.

## Процедура резервного копіювання

### База даних (наприклад, PostgreSQL)

```
pg_dump -U user -h localhost dbname > /backups/db_$(date +%F).sql
```

### Конфігураційні файли

```
tar -czf /backups/configs_$(date +%F).tar.gz /etc/myapp/
```

### Користувацькі дані

```
rsync -av --delete /var/www/app/uploads/ /backups/uploads/
```

### Логи системи

```
tar -czf /backups/logs_$(date +%F).tar.gz /var/log/myapp/
```

## Перевірка цілісності резервних копій

```
sha256sum /backups/*.tar.gz > /backups/checksums.txt
sha256sum -c /backups/checksums.txt
```

## Автоматизація процесу

Cron:

```
0 2 * * * /opt/scripts/backup.sh
```

Приклад `backup.sh`:

```
#!/bin/bash
DATE=$(date +%F)
pg_dump -U user -h localhost dbname > /backups/db_$DATE.sql
tar -czf /backups/configs_$DATE.tar.gz /etc/myapp/
rsync -av --delete /var/www/app/uploads/ /backups/uploads/
tar -czf /backups/logs_$DATE.tar.gz /var/log/myapp/
sha256sum /backups/*$DATE* > /backups/checksums_$DATE.txt
```

## Відновлення з резервних копій

### Повне відновлення

```
psql -U user -h localhost dbname < /backups/db_2025-04-18.sql
tar -xzf /backups/configs_2025-04-18.tar.gz -C /
rsync -av /backups/uploads/ /var/www/app/uploads/
tar -xzf /backups/logs_2025-04-18.tar.gz -C /
```

### Вибіркове відновлення

```
tar -xzf configs_2025-04-18.tar.gz etc/myapp/nginx.conf
```

## Тестування відновлення

- Щомісяця створюється тестове середовище, де розгортається повна копія.
- Перевіряється працездатність, доступність сервісів та відповідність даних очікуваним.
