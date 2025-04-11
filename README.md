# AImposter
Запуск проекта

1. **Создание базы данных**
   
   #Создайте postgreSQL базу данных под названием "AImposter"

2. **Подключение к базе данных**
   
   #Перейдите в файл
   ```bash
       AImposter/backend/src/config/database.js
   ```

   #Введите свои данные для подключения к бд

   Введите данные в поля 'имя_пользователя' и 'пароль'

3. Запуск проекта

    Серверная часть:
    ```bash
        cd backend/src
    ```
    ```bash
        node app.js
    ```
    
    Пользовательская часть:
    ```bash
        cd frontend/aimposter
    ```
    ```bash
        npm start
    ```
