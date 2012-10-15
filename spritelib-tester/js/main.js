/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */


$(function () {
	'use strict';

    // Change this according to your needs
    var lib = spriteLib;

    var anims = [];
    var currentClass;
    var currentSprite;
    var currentAnim;
    var classList = [];

    var stage = new createjs.Stage($("#mainCanvas")[0]);
    createjs.Ticker.setFPS(40);
    createjs.Ticker.addListener(function () {
    	stage.update();
    });     


    for (var key in lib) {
    	classList.push(lib[key]);
    	$("#classSelector").append('<option value="'+key+'">'+key+'</option>');
    }

    $("body").keydown(function (evt){
        var n = Number(String.fromCharCode(evt.keyCode)) - 1;
        if( n >= 0 && n < anims.length - 1 ) {
            setAnim(anims[n]);
        }
    });


    function setClass(pClass) {
    	currentClass = pClass;
    	anims = pClass._SpriteSheet.getAnimations();
    	stage.removeChild(currentSprite);        	
    	currentSprite = new pClass();
    	stage.addChild(currentSprite);
    	currentSprite.x = stage.canvas.width / 2 ;    	
    	currentSprite.y = stage.canvas.height / 2 ;

		$("#animSelector").html("");
       	for (var i = 0 ; i < anims.length ; i++) {
            var animation = anims[i];
            var opt = '<option value="' + animation + '">' + animation + '</option>';
    		$("#animSelector").append(opt);
        }

    	setAnim(anims[0]);
    }

    function setAnim(pName) {
    	currentAnim = pName;
        currentSprite.gotoAndPlay(pName);
    }


    $("#classSelector").change(function (event) {
    	var selected = $("#classSelector").find(":selected").text();
    	setClass(lib[selected]);
    });


    $("#animSelector").change(function (event) {
    	var selected = $("#animSelector").find(":selected").text();
    	setAnim(selected);
    });


    $("#mainCanvas").click(function () {
    	setAnim(currentAnim)
    });

    setClass(classList[0]);
    
});

