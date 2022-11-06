# /api/v1/ideas

- Авторизованный создатель идеи/проекта - пользователь, id которого совпадает с полем credentialId идеи/проекта

## GET /

Возвращает список всех непринятых приглашений для текущего пользователя
Требования:
- Авторизованный пользователь

Ответ: Массив json объектов

Пример ответа:
```
{
    "lines": [
        {
            "idea_id": 1,
            "credential_id": 1,
            "accepted": false,
            "createdAt": "2022-11-06T14:33:06.808Z",
            "updatedAt": "2022-11-06T14:33:06.808Z"
        },
        {
            "idea_id": 2,
            "credential_id": 1,
            "accepted": false,
            "createdAt": "2022-11-06T14:38:58.836Z",
            "updatedAt": "2022-11-06T14:38:58.836Z"
        }
    ]
}
```


## POST /
Приглашение пользователя в проект
Требования:
- Авторизованный администратор
- json строка формата
```
{
    "userId": 2,
    "idea_id": 1
}
```
Ответ: json объект с полем "message" со значением "successfully added"


## PUT /

Принятие приглашения
Требования:
- Авторизованный пользователь
- json строка формата
```
{
    "idea_id": 1
}
```

Ответ: json объект с полем "message" со значением "Данные успешно обновлены"

## DELETE /:id

Удаление приглашения
Требования:
- Авторизированный пользователь или авторизированный создатель проекта
- json-объект формата
```
{
    "idea_id": 1,
    "credential_id": 1
}
```

Ответ: json объект с полем "deleted" со значением 1