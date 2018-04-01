# FitG

[![Build Status](https://travis-ci.org/nebur395/FitG-TFM.svg?branch=master)](https://travis-ci.org/nebur395/FitG-TFM)


## Start using this App!

In order to run this project you have to have installed
[node.js](http://nodejs.org) and npm. Once you have them, follow these steps:

1. Clone this repo: `git clone https://github.com/nebur395/Anisclo`
1. Open a terminal on the root folder of this project.
1. Run the command `npm install`. This must be done the first time only, in order to
install the dependencies of the project.
1. Use the following command to start mongod: `sudo service mongod start`
1. Run `npm start` in order to launch two instances of the server on port 8080 (HTTP) and 8443 (HTTPS).
  Alternatively, you can also use `node server.js`.
1. **Mobile client access:** Run `cd ionic;ionic serve` in order to launch a mobile server.
Espera a que el servidor de ionic este lanzado, abre un navegador web, y accede a la dirección http://localhost:8100.
1. **Desktop client access:** Open a web browser and type 
http://localhost:8080 for the HTTP page, or https://localhost:8443 for the HTTPS equivalent.

## Test
In order to run the [Protractor](http://www.protractortest.org/#/) tests of this project you have to follow these steps:
  1. Check that Protractor is working by running `node_modules/protractor/bin/protractor --version`.
  2. Now start up the Selenium Server: `node_modules/protractor/bin/webdriver-manager start`. This will output a bunch of info logs. You can see information about the status of the server at `http://localhost:4444/wd/hub`.
  3. Finally, execute `node_modules/protractor/bin/protractor test/protractor/conf.js`.
  
In order to run the [Mocha](https://mochajs.org/) tests of this project you only have to execute the following command: `npm test`

## API DOC
In order to have a look at the project's API you have to follow these steps:
1. Run `npm start` in order to launch the application.
1. **JSON:** Open a web browser and type http://localhost:8080/swagger.json to display the application's API in a JSON.
1. **UI Web:** Open a web browser and type http://localhost:8080/api-docs/ to display the application's API in a UI web.

## EditorConfig 
[EditorConfig](http://editorconfig.org/) helps developers maintain consistent coding styles between different editors and IDEs. It is a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles.
You need to create a .editorconfig file in which you define the coding style rules. It is similar to the format accepted by gitignore.

### IDEs supported by EditorConfig
These editors come bundled with native support for EditorConfig. Everything should just work: [BBEdit](http://www.barebones.com/support/technotes/editorconfig.html), [Builder](https://wiki.gnome.org/Apps/Builder/Features#EditorConfig), [CLion](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [GitHub](https://github.com/RReverser/github-editorconfig#readme), [Gogs](https://gogs.io/), [IntelliJIDEA](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [RubyMine](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig), [SourceLair](https://www.sourcelair.com/features/editorconfig), [TortoiseGit](https://tortoisegit.org/), [WebStorm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig).

### IDEs not supported by EditorConfig file
To use EditorConfig with one of these editors, you will need to install a plugin: [AppCode](https://plugins.jetbrains.com/plugin/7294), [Atom](https://github.com/sindresorhus/atom-editorconfig#readme), [Brackets](https://github.com/kidwm/brackets-editorconfig/), [Coda](https://panic.com/coda/plugins.php#Plugins), [Code::Blocks](https://github.com/editorconfig/editorconfig-codeblocks#readme), [Eclipse](https://github.com/ncjones/editorconfig-eclipse#readme), [Emacs](https://github.com/editorconfig/editorconfig-emacs#readme), [Geany](https://github.com/editorconfig/editorconfig-geany#readme), [Gedit](https://github.com/editorconfig/editorconfig-gedit#readme), [Jedit](https://github.com/editorconfig/editorconfig-jedit#readme), [Komodo](http://komodoide.com/packages/addons/editorconfig/), [NetBeans](https://github.com/welovecoding/editorconfig-netbeans#readme), [NotePadd++](https://github.com/editorconfig/editorconfig-notepad-plus-plus#readme), [PhpStorm](https://plugins.jetbrains.com/plugin/7294), [PyCharm](https://plugins.jetbrains.com/plugin/7294), [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme), [Textadept](https://github.com/editorconfig/editorconfig-textadept#readme), [textmate](https://github.com/Mr0grog/editorconfig-textmate#readme), [Vim](https://github.com/editorconfig/editorconfig-vim#readme), [Visual Studio](https://github.com/editorconfig/editorconfig-visualstudio#readme), [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Xcode](https://github.com/MarcoSero/EditorConfig-Xcode)
