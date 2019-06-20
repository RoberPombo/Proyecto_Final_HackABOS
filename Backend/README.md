# Backend Ojeador Deportivo

API Rest realizada con NodeJS, Express, MongoDB y Redis.

[Ver demo](https://sport-scout-api.herokuapp.com/api/v1/)

## Posibles mejoras

- Hacer test de integración y terminar los test unitarios que faltan
  
- Crear un Docker con la api

- Hacer la documentación de la api con Swagger

- Refactorizar el código
  

## Resumen de los endpoints:

- Auth

[GET] /api/v1/login -> Acceso del usuario

[POST] /api/v1/refreshToken -> Devuelve un jwt para la autenticación

- User

[GET] /api/v1/user -> Devuelve el perfil de un usuario

[POST] /api/v1/user -> Crea un nuevo usuario

[PUT] /api/v1/user -> Actualiza el perfil de un usuario

[DELETE] /api/v1/user -> Borra un usuario, y si creo un jugador también lo borra

[GET] /api/v1/user/activation -> Activa un nuevo usuario (enlace enviado al email del usuario)

[POST] /api/v1/activation -> Vuelve a enviar otro email de activación

[GET] /api/v1/password -> Confirma el cambio de contraseña (enlace enviado al email del usuario)

[POST] /api/v1/password -> Solicita el cambio de contraseña

- Players

[POST] /api/v1/players -> Crea un nuevo jugador

[GET] /api/v1/players/:id -> Devuelve el perfil de un jugador

[PUT] /api/v1/players/:id -> Actualiza el perfil de un jugador

[DELETE] /api/v1/players/:id -> Borra un jugador

[POST] /api/v1/players/youtube -> Busca videos en youtube para añadirselos a un jugador

[POST] /api/v1/players/addvideos/:id -> Añade videos a un jugador

## Development server

Para poder ejecutar la api en desarrolo:

  Descarga los archivos y ejecuta el comando `npm install` y después ejecutra `node index`.
  
  Haz las peticiones a `http://localhost:3000/api/v1...`.