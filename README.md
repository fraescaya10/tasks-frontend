# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones
Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo
El presente proyecto es una aplicación base para un crud de tareas, el mismo que se conecta a un api creado en ExpressJS, está estructurado por modulos de tal manera que sea facilmente escalable. 
Para probar localmente podemos modificar el archivo `environments/environment.development.ts` con las credenciales que se requieran. 
Asegurese de que `useEmulators: true` para usar los emuladores de firebase de forma local, mientras que para produccion dejarlo en false

Finalmente para deployar en firebase hosting ejecutamos el comando de build
```shell
ng build
```
luego si no tenemos inicializado hosting ponemos el siguiente comando
```shell
firebase init hosting
```
Aqui nos dará algunas preguntas, asegurese de poner como directorio publico (Public directory) `dist/NombreDelProyecto/browser`, luego cuando se pregunte por SPA(Single Page Application) poner en Yes
esto nos ayuda a que las rutas de Angular funcionen

Una vez configurado todo eso ponemos:
```shell
firebase deploy --only hosting
```
con esto se subiran los archivos y se nos mostrará la url para que accedamos


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
