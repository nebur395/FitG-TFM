# FitG



# Documentación
Documentos iniciales:

Documentos finales:

# Empezar a usar la aplicación
Se asume que para poder ejecutar el proyecto se tiene instalado [node.js](http://nodejs.org). Una vez instalado, hay que
seguir estos pasos:

1. Clona el repositorio: `git clone https://github.com/nebur395/FitG-TFM`
1. Abrir un terminal en la raíz del directorio del proyecto.
1. Ejecutar el comando `npm install`. Esto solo se necesita ejecutar la primera vez que vayas a lanzar el proyecto, con 
el fin de descargar e instalar todas las dependencias del proyecto.
1. Ejecuta el siguiente comando para lanzar el servicio de MongoDB: `sudo service mongod start`
1. Ejecuta el comando `npm start` para lanzar la aplicación. Esto hace que se genere una instancia del servidor en el 
puerto 8080. Alternativamente, se puede ejecutar `node server.js`.
1. **Acceder al cliente de móvil:** Escribe el siguiente comando para lanzar el cliente de dispositivos móviles: `cd ionic;ionic serve`.
Espera a que el servidor de ionic este lanzado, abre un navegador web, y accede a la dirección http://localhost:8100.
1. **Acceder al cliente de desktop:** Abre un navegador web y escribe la dirección http://localhost:8080 para poder acceder al cliente del administrador.

## Test
In order to run the [Protractor](http://www.protractortest.org/#/) tests of this project you have to follow these steps:
  1. Check that Protractor is working by running `node_modules/protractor/bin/protractor --version`.
  2. Now start up the Selenium Server: `node_modules/protractor/bin/webdriver-manager start`. This will output a bunch of info logs. You can see information about the status of the server at `http://localhost:4444/wd/hub`.
  3. Finally, execute `node_modules/protractor/bin/protractor test/protractor/conf.js`.
  
In order to run the [Mocha](https://mochajs.org/) tests of this project you only have to execute the following command: `npm test`

## Documentación de la API
Para poder visualizar la API del proyecto, hay que seguir estos pasos:  
1. Lanza el servidor ejecutando el comando `npm start`.
1. **JSON:** Abre el navegador y accede a http://localhost:8080/swagger.json para visualizar la API de la aplicación en formato JSON.
1. **UI Web:** Abre el navegador y accede a http://localhost:8080/api-docs/ para visualizar la API de la aplicación con la interfaz web.

## EditorConfig 
[EditorConfig](http://editorconfig.org/) helps developers maintain consistent coding styles between different editors and IDEs. It is a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles.
You need to create a .editorconfig file in which you define the coding style rules. It is similar to the format accepted by gitignore.

### IDEs supported by EditorConfig
These editors come bundled with native support for EditorConfig. Everything should just work: [BBEdit](http://www.barebones.com/support/technotes/editorconfig.html), [Builder](https://wiki.gnome.org/Apps/Builder/Features#EditorConfig), [CLion](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [GitHub](https://github.com/RReverser/github-editorconfig#readme), [Gogs](https://gogs.io/), [IntelliJIDEA](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [RubyMine](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [SourceLair](https://www.sourcelair.com/features/editorconfig), [TortoiseGit](https://tortoisegit.org/), [WebStorm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig).

### IDEs not supported by EditorConfig file
To use EditorConfig with one of these editors, you will need to install a plugin: [AppCode](https://plugins.jetbrains.com/plugin/7294), [Atom](https://github.com/sindresorhus/atom-editorconfig#readme), [Brackets](https://github.com/kidwm/brackets-editorconfig/), [Coda](https://panic.com/coda/plugins.php#Plugins), [Code::Blocks](https://github.com/editorconfig/editorconfig-codeblocks#readme), [Eclipse](https://github.com/ncjones/editorconfig-eclipse#readme), [Emacs](https://github.com/editorconfig/editorconfig-emacs#readme), [Geany](https://github.com/editorconfig/editorconfig-geany#readme), [Gedit](https://github.com/editorconfig/editorconfig-gedit#readme), [Jedit](https://github.com/editorconfig/editorconfig-jedit#readme), [Komodo](http://komodoide.com/packages/addons/editorconfig/), [NetBeans](https://github.com/welovecoding/editorconfig-netbeans#readme), [NotePadd++](https://github.com/editorconfig/editorconfig-notepad-plus-plus#readme), [PhpStorm](https://plugins.jetbrains.com/plugin/7294), [PyCharm](https://plugins.jetbrains.com/plugin/7294), [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme), [Textadept](https://github.com/editorconfig/editorconfig-textadept#readme), [textmate](https://github.com/Mr0grog/editorconfig-textmate#readme), [Vim](https://github.com/editorconfig/editorconfig-vim#readme), [Visual Studio](https://github.com/editorconfig/editorconfig-visualstudio#readme), [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Xcode](https://github.com/MarcoSero/EditorConfig-Xcode)
