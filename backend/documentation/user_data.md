# /api/v1/user_data

## GET /

Возвращает список анкет всех пользователей
Требования:
- Авторизованный администратор
Ответ: Массив json объектов

## GET /:id

Возвращает анкету одного пользователя
Требования:
- Авторизированный пользователь
Ответ: json объект данных о пользователе


## update /:id

Обновляет данные анкеты пользователя
Требования:
- авторизированный администратор или авторизированный пользователь, который обращается строго по своему id
- json-объект с любым количеством полей. Поля являются необязательными. Список всех полей:
```
    id: int
    name: string
    sex: char (м/ж)
    birthdate: date
    country: string
    city: string
    citizenship: string
    telegram: string
    github: string
    phone: string (12 символов, формат +7XXXXXXXXXX)
    vk: string
    info: string
    has_command: bool
    role: string
    has_patient: bool
    patient_info: string
    has_entity: bool
    inn: string
```
Пример данных:
```
{
    "name": "Иванов Иван Ивнаович",
    "sex": "м",
    "birthdate": "2000-11-03",
    "country": "Россия",
    "city": "Москва",
    "citizenship": "Россия",
    "telegram": "@user1",
    "github": "https://github.com/user1",
    "phone": "+79123456789",
    "vk": "https://vk.com/user1",
    "info": "Я очень клевый, я люблю маму",
    "has_command": true,
    "role": "backend",
    "has_patient": false,
    "has_entity": false
}
```
Ответ: json-объект с полем message и значением "Данные успешно обновлены"