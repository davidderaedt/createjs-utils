if (!window.myGame) { window.myGame = {}; }
(function(scope) {
var spritesheetPath = "sprites/rpg.png";

var BasicFighter = function() {
	this.initialize();
}
BasicFighter._SpriteSheet = new createjs.SpriteSheet({images: [spritesheetPath], frames: [[0,0,64,64,0,0,0],[0,0,64,64,0,0,0],[0,0,64,64,0,0,0],[0,0,64,64,0,0,0],[0,0,64,64,0,0,0],[64,0,64,64,0,0,0],[64,0,64,64,0,0,0],[64,0,64,64,0,0,0],[64,0,64,64,0,0,0],[64,0,64,64,0,0,0],[128,0,64,64,0,0,0],[128,0,64,64,0,0,0],[128,0,64,64,0,0,0],[128,0,64,64,0,0,0],[128,0,64,64,0,0,0],[192,0,64,64,0,0,0],[192,0,64,64,0,0,0],[192,0,64,64,0,0,0],[192,0,64,64,0,0,0],[192,0,64,64,0,0,0],[0,64,64,64,0,0,0],[0,64,64,64,0,0,0],[0,64,64,64,0,0,0],[0,64,64,64,0,0,0],[64,64,64,64,0,0,0],[64,64,64,64,0,0,0],[64,64,64,64,0,0,0],[64,64,64,64,0,0,0],[64,64,64,64,0,0,0],[64,64,64,64,0,0,0],[128,64,64,64,0,0,0],[128,64,64,64,0,0,0],[128,64,64,64,0,0,0],[128,64,64,64,0,0,0],[128,64,64,64,0,0,0],[192,64,64,64,0,0,0],[192,64,64,64,0,0,0],[192,64,64,64,0,0,0],[192,64,64,64,0,0,0],[192,64,64,64,0,0,0],[0,128,64,64,0,0,0],[0,128,64,64,0,0,0],[0,128,64,64,0,0,0],[0,128,64,64,0,0,0],[0,128,64,64,0,0,0],[64,128,64,64,0,0,0],[64,128,64,64,0,0,0],[64,128,64,64,0,0,0],[64,128,64,64,0,0,0],[64,128,64,64,0,0,0]],  animations: {idle:[0,9, true], run:[10,19, true], attack:[20,29, "false"], hit:[30,39, "false"], dead:[40,49, "false"]}});
var BasicFighter_p = BasicFighter.prototype = new createjs.BitmapAnimation();
BasicFighter_p.BitmapAnimation_initialize = BasicFighter_p.initialize;
BasicFighter_p.initialize = function() {
	this.BitmapAnimation_initialize(BasicFighter._SpriteSheet);
	this.paused = false;
}
BasicFighter_p.idle = function(){
	this.gotoAndPlay("idle");
}
BasicFighter_p.run = function(){
	this.gotoAndPlay("run");
}
BasicFighter_p.attack = function(){
	this.gotoAndPlay("attack");
}
BasicFighter_p.hit = function(){
	this.gotoAndPlay("hit");
}
BasicFighter_p.dead = function(){
	this.gotoAndPlay("dead");
}
scope.BasicFighter = BasicFighter;

var NMEFighter = function() {
	this.initialize();
}
NMEFighter._SpriteSheet = new createjs.SpriteSheet({images: [spritesheetPath], frames: [[128,128,75,72,0,7.95,7.95],[128,128,75,72,0,7.95,7.95],[128,128,75,72,0,7.95,7.95],[128,128,75,72,0,7.95,7.95],[128,128,75,72,0,7.95,7.95],[0,200,75,72,0,7.95,7.95],[0,200,75,72,0,7.95,7.95],[0,200,75,72,0,7.95,7.95],[0,200,75,72,0,7.95,7.95],[0,200,75,72,0,7.95,7.95],[75,200,75,72,0,7.95,7.95],[75,200,75,72,0,7.95,7.95],[75,200,75,72,0,7.95,7.95],[75,200,75,72,0,7.95,7.95],[75,200,75,72,0,7.95,7.95],[150,200,75,72,0,7.95,7.95],[150,200,75,72,0,7.95,7.95],[150,200,75,72,0,7.95,7.95],[150,200,75,72,0,7.95,7.95],[150,200,75,72,0,7.95,7.95],[0,272,75,72,0,7.95,7.95],[0,272,75,72,0,7.95,7.95],[0,272,75,72,0,7.95,7.95],[0,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[75,272,75,72,0,7.95,7.95],[150,272,75,72,0,7.95,7.95],[150,272,75,72,0,7.95,7.95],[150,272,75,72,0,7.95,7.95],[150,272,75,72,0,7.95,7.95],[150,272,75,72,0,7.95,7.95],[0,344,75,72,0,7.95,7.95],[0,344,75,72,0,7.95,7.95],[0,344,75,72,0,7.95,7.95],[0,344,75,72,0,7.95,7.95],[0,344,75,72,0,7.95,7.95],[75,344,75,72,0,7.95,7.95],[75,344,75,72,0,7.95,7.95],[75,344,75,72,0,7.95,7.95],[75,344,75,72,0,7.95,7.95],[75,344,75,72,0,7.95,7.95],[150,344,75,72,0,7.95,7.95],[150,344,75,72,0,7.95,7.95],[150,344,75,72,0,7.95,7.95],[150,344,75,72,0,7.95,7.95],[150,344,75,72,0,7.95,7.95]],  animations: {idle:[0,9, true], run:[10,19, true], attack:[20,29, "false"], hit:[30,39, "false"], dead:[40,49, "false"]}});
var NMEFighter_p = NMEFighter.prototype = new createjs.BitmapAnimation();
NMEFighter_p.BitmapAnimation_initialize = NMEFighter_p.initialize;
NMEFighter_p.initialize = function() {
	this.BitmapAnimation_initialize(NMEFighter._SpriteSheet);
	this.paused = false;
}
NMEFighter_p.idle = function(){
	this.gotoAndPlay("idle");
}
NMEFighter_p.run = function(){
	this.gotoAndPlay("run");
}
NMEFighter_p.attack = function(){
	this.gotoAndPlay("attack");
}
NMEFighter_p.hit = function(){
	this.gotoAndPlay("hit");
}
NMEFighter_p.dead = function(){
	this.gotoAndPlay("dead");
}
scope.NMEFighter = NMEFighter;
}(window.myGame));

