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

- Poder cambiar credenciales de usuario. Si usuario o password es el mismo obligar a cambiarlo.

- En la parte de "Resultados" mirar si se puede poner una media, es decir, el total que tiene dividido por el número de cocineros que le han votado.

- La inserción en COOKER_SCORE se hace con los ids 1,2,3,4 en vez de 5,6,7, que serían los del torneo 3. Corregir punto "Marcador" y después validar que ya está bien.
- Marcador
  - ScoreCooker.score: Están prefijados los parámetros a valorar.
    - cookerScoreForm.jsx: Se debería coger lo que hay en la tabla SCORE y generar el formulario en función a lo que retorne la llamada al servicio.
