Photoshop to EaselJS SpriteSheets
=================

Exports a PSD file to a spritesheet for use with EaselJS projects.

> While usable as is, this script is intended to be a test script for an upcoming panel based extension.

##Usage

1. Copy the `exportToEaselJS.jssxbin` file along with the corresponding two template `txt` files to the directory of your choice. 
2. In Photoshop, open a properly formed PSD. Take a look at the `characters.psd` file for a good example.
3. Choose `File > Scripts > browse` and select the `jsxbin` file
4. When prompted, choose the output directory of your choice. If you don't have a createJS example in place, take our own `spritelib-tester`.




## More informations


The script only processes the current document, not your whole working set, so all sprites should be in the same document.

It is convention based, so you absolutely need to follow the following structure for the document: `sprite folders > animation folders > frames`. In other words:

*	Each sprite should be in a separate layer folder at the top level of the document, even if it's the only sprite in the document. The folder name is used for the resulting `BitmapAnimation` class name.
*	Each animation should be in a separate layer folder inside the sprite folder. The folder name is used for the animation name.
*	Each frame should be place inside an animation folder, otherwise it won't be processed at all. The layer name is not used (unless for some options).

Limits & known issues:

*	All sprites will have the same size (the size of the document, in pixels).
*	No optimization algorithm is used: frames are placed side by side.
*	You cannot set the number of columns or rows manually.
*	You cannot set the next `parameter` from photoshop: all animations are looped by default.
*	You cannot set a scaling factor (1 pixel in Photoshop will result in 1 pixel in the spritesheet).


Options & notes

*	Feel free to edit the template files to adapt it to your needs
*	When processing, the script will briefly create a temporary file and delete it afterwards. This is expected.
*	For consistency, the resulting code is intentionally very close to the code exported by FlashPro CS6 Easel spritesheet exporter.
*	The library name (ie name of the object in the window object containing the sprite classes) is hardcoded at the top of the file, you can change it as you please.
*	The spritesheet PNG file is named after the photoshop document.
*	You can add "x2", "x3" etc to the frame layer names to automatically multiply frames in the animation
*	All frames are used whether they are visilble or locked. Can't decide if it's a bug or a feature.
*	The PSD file contains sample sprites which were based on the [spritelib project](http://www.widgetworx.com/widgetworx/portfolio/spritelib.html) which is under [CPL](http://opensource.org/licenses/cpl1.0.php) license.



