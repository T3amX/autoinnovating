# API DOCUMENTATION

- Авторизиция происходит посредством jsonwebtoken.
- Запрос авторизованного пользователя должен содержать header "Authorization" со значением "bearer token"
- Авторизованным считается пользователь, отправивший запрос с нужным header и валидным jsonwebtoken
- Администратором считается пользователь, у которого в поле is_admin в базе данных стоит значение true

- [auth](documentation/auth.md)
- [user_data](documentation/user_data.md)
- [categories](documentation/catrgories.md)
- [ideas](documentation/ideas.md)