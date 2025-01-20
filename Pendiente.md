# Temas pendientes

## React

- Modificar tamaño máximo imagen a subir.
- Recuperar foto en base64 y dibujarla en vez de con la url.

## Rest Service

- Actualizar la bbdd con la imagen subida del plato.
  - Esto ya está hecho para las imágenes de platos.
- Retornar imágenes de los platos en base64
  - ESto ya está hecho.
- Si la imagen es muy grande ver si se puede reducir tamaño al máximo
  - The field image exceeds its maximum permitted size of 1048576 bytes
- Guardar las imágenes subidas en otro directorio (tienen que estar creados). Ahora son:
  - C:\Proyectos\Paco\votacion\uploads\image\course
  - C:\Proyectos\Paco\votacion\uploads\image\cooker

## Hacer ahora

- Restringir el tamaña de las imágenes y vídeos que se suben. Ya están en application.properties.
  - Lo que hay que mostrar un error legible cuando el tamaño es superior al esperado.
- Gestionar los torneos (tournamentsId): CRUD
- En el menú principal (mainMenu) añadir funcionalidad botones:
  - Añadir botón para que administrador pueda gestionar los torneos.
  - Obligar a cambiar el password cuando se entra por primera vez.
- Al entrar en la aplicación:
  - Usuario normal: seleccionar el torneo al que tenga acceso que esté activo.
  - Usuario admin: Poder crear un torneo. Seleccionar el torneo al que quiere acceder (activo o no activo).
- Crear formularios:
  - Alta de torneos
  - Alte de usuarios de un torneo.
- Cooker.user_id hace referencia a user_app.
- Modificar User y UserDAO. Tienen acceso a una lista de torneos.

- En la parte de "Resultados" mirar si se puede poner una media, es decir, el total que tiene dividido por el número de cocineros que le han votado.

- Hay nueva tabla (SCORE_TOURNAMENT) que indica qué marcadores están habilitados para un torneo.
  - Cuando se retornen los marcadores tendremos:
    - Un valor null si el marcador no está habilitado para el torneo actual.
    - Un valor 0 si está habilitado, pero no está asignado.
    - Un valor entre 1 y 10 si el marcador está habilitado y ha sido asignado.

- Poder puntuar sin haber hecho un plato.
  - He creado usuario voter1/voter1 con acceso torneo 3.
  - Cuando se valida da error porque el cooker que se retorna (selectTournament.jsx) es null.

- En la lista de cocineros indicar que no ha puntuado a ese usuario:
  - poniendo el icono de "lista" de un color diferente (rojo)
  - poniendo un asterisco y un hint que indique que no se ha votado a ese usuario.
