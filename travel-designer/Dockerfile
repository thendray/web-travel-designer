# Используем официальный Node.js образ
FROM node:16

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем стадию запуска
CMD ["npx", "serve", "-s", "dist"]

# Экспонируем нужный порт
EXPOSE 3000