# Використовуємо більш легкий базовий образ Node.js
FROM node:20-slim

# Встановлюємо тільки продакшн залежності
ENV NODE_ENV=production

WORKDIR /app

# Спочатку копіюємо тільки файли 'package.json' та 'package-lock.json'
COPY package*.json ./

# Встановлюємо залежності
RUN npm install --production

# Копіюємо весь код додатку
COPY . .

# Відкриваємо порт, який використовує наш додаток
EXPOSE 3000

# Визначаємо команду для запуску додатку
CMD ["npm", "start"]