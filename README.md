CreateJS Utils
=================

A bunch of utilities I use for CreateJS based apps.

**Flash Pro CS6 Plugins**

Install flash pro plugins simply by copying the JSFL files in
*/Applications/Adobe Flash CS6/Common/Configuration/Sprite Sheet Plugins*
…or the equivalent path on Windows.

`easeljs2` is just like the original exporter, except that it stores classes in an object (`lib`, by default) rather than in the global `window` object.
Also, it exposes some options at the top of the file for you to change easily, such as the spritesheet destination folder, or the ability to get rid of methods which expose animations. See comments for more informations.

`easeljs-json` simply exports all data in JSON format rather than in a javascript file.


**Sprite tester**

For use with `easeljs2` plugin formated sprite libraries, this page loads your animations and allows you to test it easily.

Simply export the JS and PNG files in the "sprites" folder (unless you changed it) and edit index.html to update the js file according to the name of the one you generated.


