/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */


$(function () {
	'use strict';

    var stage = new Stage($("#mainCanvas")[0]);
    var anims = [];
    var currentClass;
    var currentSprite;
    var currentAnim;
    var classList = [];


    Ticker.setFPS(40);
    Ticker.addListener(function () {
    	stage.update();
    });     


    for (var key in lib) {
    	classList.push(lib[key]);
    	$("#classSelector").append('<option value="'+key+'">'+key+'</option>');
    }


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
    		$("#animSelector").append('<option value="'+anims[i]+'">'+anims[i]+'</option>');
        }

    	setAnim(anims[0]);
    }

    function setAnim(pName) {
    	currentAnim = pName;
    	currentSprite[pName].call(currentSprite);
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

