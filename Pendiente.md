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
- Quitar imágenes de upload que no se usen.
