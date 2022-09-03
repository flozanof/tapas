# Configuración
- CookerApp: en el estado asignar tournamentId
- Crear la carpeta /public/img/{tournamentId}
- En http://localhost:8081/h2-console/login.do (user1, pass1) insertar en tabla COOKER y SCORE.

# Api mocks. Mocks Service Worker (MSW)

## Instalación librería MSW
npm install msw --save-dev
## Creación fichero mock para peticiones REST
fichero src/cookers
## Integrarar mocks. Copiar fichero en el directorio public
Navegar hasta el directorio donde está package.json y lanzar el comando:

npx msw init <PUBLIC_DIR>
## Configurar worker
Fichero mockServiceWorkers.js

## Activar mocks
Fichero index.js
Descomentar las líneas:
const { worker } = require('./mocks/browser')
worker.start()

# Deploy
npm run build
serve -s build

## Configuración express para configurar servidor
npm install express --save

## Configuración express para tener varios servidores
Ver ficheros:
- app.js (servidor 1)
- appUploadFile.js (servidor 2)
- configDomain.js (servidor 1)
- configDomainUpFile.js (servidor 2)
- route.js (servidor 1)
- routeUpFile.js (servidor 2)
- index.js

Ejecutar: node index.js


# Instalación Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Material icons
npm install @mui/icons-material

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Configuración servidor para que usuarios puedan subir imágenes a /public
https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

## Install and import Axios for AJAX request
import axios from 'axios';

# Create a simple server with Node.
Servidor que subirá las imágenes/videos desde directorio local a directorio /public/uploads

## Install express, multer, and cors.

npm i express multer cors nodemon -save

We'll use express to create a server, multer to handle files. Cors will be used to enable cross-origin request to this server. Nodemon to monitor the changes and auto-reload, it is optional and you'll have to restart the server manually in its absence.

## Ejecución del servidor

Run nodemon server.js in a terminal to start this server

# Instalar toastify para visualizar mensajes
npm install --save react-toastify


# Deploy
- npm run build : genera carpeta /build con todos los ficheros necesarios para el deploy. Ver comentarios sobre deploy de este comando.

- Ejecutar:
    - npm install -g serve
    - serve -s build

## Deploy en github
https://create-react-app.dev/docs/deployment/

- Deploy: npm run deploy
- url: https://flozanof.github.io/tapas/
