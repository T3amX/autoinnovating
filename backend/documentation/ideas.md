# /api/v1/ideas

- Авторизованный создатель идеи/проекта - пользователь, id которого совпадает с полем credentialId идеи/проекта

## GET /

Возвращает список всех идей/проектов
Требования:
- Авторизованный пользователь

Ответ: Массив json объектов

Пример ответа:
```
{
    "lines": [
        {
            "id": 1,
            "title": "Моя супер идея",
            "description": "Супер описание супер идеи",
            "is_innovative": false,
            "is_project": true,
            "createdAt": "2022-11-05T22:15:32.571Z",
            "updatedAt": "2022-11-05T22:15:54.726Z",
            "credentialId": 1,
            "categoryId": 1
        },
        {
            "id": 2,
            "title": "Моя супер идея1",
            "description": "Супер описание супер идеи",
            "is_innovative": false,
            "is_project": true,
            "createdAt": "2022-11-05T22:17:51.762Z",
            "updatedAt": "2022-11-05T22:18:01.477Z",
            "credentialId": 1,
            "categoryId": 1
        }
    ]
}
```

Так же принимает необязательные аргументы в виде json строки limit и offset для пагинации
```
{
    "limit": 2,
    "offset": 1
}
```

## GET /pagination

Возвращает список страниц по заданному лимиту

Требования:
- авторизованный пользователь
- json строка формата
```
{
    "limit": 2
}
```
Ответ: json строка с полем pages_count и значением количества страниц

```
{
    "pages_count": 2
}
```

## GET /:id

Возвращает одну идею/проект
Требования:
- Авторизированный пользователь

Ответ: json объект данных о категории

Пример ответа:
```
{
    "idea": {
        "id": 1,
        "title": "Моя супер идея",
        "description": "Супер описание супер идеи",
        "is_innovative": false,
        "is_project": true,
        "createdAt": "2022-11-05T22:15:32.571Z",
        "updatedAt": "2022-11-05T22:15:54.726Z",
        "credentialId": 1,
        "categoryId": 1
    }
}
```

## GET /participants/:id

Возвращает всех участников проекта
Требования:
- Авторизированный пользователь

Ответ: json объект данных о категории

Пример ответа:
```
{
    "lines": [
        {
            "id": 2,
            "nickname": "1234",
            "role": "backend",
            "info": "Я очень клевый, я люблю маму"
        }
    ]
}
```


## POST /

Создание идеи/проекта
Требования:
- Авторизованный пользователь
- json строка формата
```
{
    "title": "Моя супер идея1",
    "description": "Супер описание супер идеи",
    "categoryId": 1
}
```

Ответ: json-объект с полем message со значение "Successfully created"


## PUT /:id

Изменения данных об идее/проекте
Требования:
- Авторизованный администратор или авторизированный создатель идеи/проекта
- json строка формата
```
# Для админа
{
    "is_innovative": true
}
# Для пользователя
{
    "title": "Моя супер идея",
    "description": "Супер описание супер идеи",
    "categoryId": 2
}
```

Ответ: json объект с полем "message" со значением "Данные успешно обновлены"

## DELETE /:id

Удаление идеи/проекта из базы данных
Требования:
- Авторизированный администратор или авторизованный создатель идеи/проекта

Ответ: json объект с полем "deleted" со значением 1
