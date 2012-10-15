CreateJS SpriteSheet Tester
=================

Simple HTML page which parses an `EaselJS` sprite library file and lets you test each animation of each sprite.

By default, it expects a js file named `spriteLib.js` in the `sprites` folder, but can can of course change the HTML file according to your needs.

By default, it expects a global object named `spriteLib` to hold sprite class definitions (e.g. `window.spriteLib.Enemy`), but you can easily change that by modifying the related line at the top of the `main.js` file.

This html file can be run from the filesystem directly (in other words, you don't need to run it from a server).