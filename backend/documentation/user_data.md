# /api/v1/user_data

## GET /

Возвращает список анкет всех пользователей
Требования:
- Авторизованный администратор

Ответ: Массив json объектов

Пример ответа:
```
{
    "lines": [
        {
            "id": 1,
            "name": "Иванов Иван Ивнаович",
            "sex": "м",
            "birthdate": "2000-11-03T00:00:00.000Z",
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
            "patient_info": null,
            "has_entity": false,
            "inn": "122312312323",
            "createdAt": "2022-11-05T09:16:47.229Z",
            "updatedAt": "2022-11-05T10:03:09.998Z",
            "credentialId": 1
        },
        {
            "id": 2,
            "name": null,
            "sex": null,
            "birthdate": null,
            "country": null,
            "city": null,
            "citizenship": null,
            "telegram": null,
            "github": null,
            "phone": null,
            "vk": null,
            "info": null,
            "has_command": null,
            "role": null,
            "has_patient": null,
            "patient_info": null,
            "has_entity": null,
            "inn": null,
            "createdAt": "2022-11-05T10:00:08.926Z",
            "updatedAt": "2022-11-05T10:00:08.926Z",
            "credentialId": 2
        },
        {
            "id": 3,
            "name": null,
            "sex": null,
            "birthdate": null,
            "country": null,
            "city": null,
            "citizenship": null,
            "telegram": null,
            "github": null,
            "phone": null,
            "vk": null,
            "info": null,
            "has_command": null,
            "role": null,
            "has_patient": null,
            "patient_info": null,
            "has_entity": null,
            "inn": null,
            "createdAt": "2022-11-05T10:33:15.726Z",
            "updatedAt": "2022-11-05T10:33:15.726Z",
            "credentialId": 3
        }
    ]
}
```

## GET /search
Возвращает список всех пользователей для поиска в команду

Требования:
- Авторизованный пользователь

Ответ:
```
{
    "lines": [
        {
            "id": 1,
            "nickname": "1234",
            "role": null,
            "info": null
        },
        {
            "id": 2,
            "nickname": "123",
            "role": null,
            "info": null
        }
    ]
}
```

## GET /:id

Возвращает анкету одного пользователя
Требования:
- Авторизированный пользователь

Ответ: json объект данных о пользователе

Пример ответа:
```
{
    "user": {
        "id": 1,
        "name": "Иванов Иван Ивнаович",
        "sex": "м",
        "birthdate": "2000-11-03T00:00:00.000Z",
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
        "patient_info": null,
        "has_entity": false,
        "inn": "122312312323",
        "createdAt": "2022-11-05T09:16:47.229Z",
        "updatedAt": "2022-11-05T10:03:09.998Z",
        "credentialId": 1
    }
}
```


## PUT /:id

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