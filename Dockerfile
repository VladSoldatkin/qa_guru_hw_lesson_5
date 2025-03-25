#Указываем операционную систему
FROM mcr.microsoft.com/playwright:v1.51.1-noble

#Копирование рабочей папки
COPY . .

# Установка пакетов
RUN npm i 

#Установка браузеров и зависимостей
RUN npx playwright install --with-deps

# Команда для запуска автотестов
CMD ["npm", "run", "test"]