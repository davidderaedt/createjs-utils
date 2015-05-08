function getPluginInfo(lang){
	pluginInfo = new Object();
	pluginInfo.id = "easeljs2";
	pluginInfo.name = "easeljs2";
	pluginInfo.ext = "js";
	pluginInfo.capabilities = new Object();
	pluginInfo.capabilities.canRotate = false;
	pluginInfo.capabilities.canTrim = true;
	pluginInfo.capabilities.canShapePad = true;
	pluginInfo.capabilities.canBorderPad = true;
	pluginInfo.capabilities.canStackDuplicateFrames = true;
	return pluginInfo;
}

var JSON = {
	stringify  : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null){
                        v = JSON.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
}

var symbolItem = null;
var symbolName = null;
var globalMeta = null;

function initializeVars(){
	symbolItem = null;
	symbolName = null;
	allFrames = [];
}

function DetermineAnimationData(){
	var	labelLayer = null;
	var layers = symbolItem.timeline.layers;

	var i;
	for (i in layers){
		cmpName = layers[i].name.toLowerCase();
		if (cmpName == "labels") labelLayer = layers[i];
	}

	if (labelLayer == null) return ""

	var labelFrame = null;
	var controlFrame = null;
	var labelIndex = 0;
	var controlIndex = 0;
	var frameNumber = 0;
	var endFrameNumber = 0;

	var r = {};

	while (labelIndex < labelLayer.frames.length){
		labelFrame = labelLayer.frames[labelIndex++];

		
		if (labelFrame.name != null || labelFrame.name!=''){
			endFrameNumber = frameNumber + labelFrame.duration - 1;
			if(frameNumber==endFrameNumber){
				r[labelFrame.name]=[frameNumber,endFrameNumber];
			} else {
				r[labelFrame.name]=[frameNumber,endFrameNumber,true];
			}

			frameNumber = endFrameNumber + 1;
			labelIndex = frameNumber;
			controlIndex = labelIndex;
		}
	}
	return r;
}

function endSymbol(meta){
	var s = "";
	if (symbolItem != null){
		symbolName = symbolName.replace(/\s+/g,"_");
		
		var animationData = DetermineAnimationData();
		var i;
		var stackedFrames = [];
		var frameData = [];

		for(i in allFrames){
			if (stackedFrames.indexOf(JSON.stringify(allFrames[i])) == -1) {
				stackedFrames.push(JSON.stringify(allFrames[i]));
			}
		}		
		
		for(i in allFrames) frameData[i]='f['+stackedFrames.indexOf(JSON.stringify(allFrames[i]))+']';

		s += "\n(lib."+symbolName + " = function() {\n\t";
		s += "var f = ["+stackedFrames.join(",")+"];\n\t";
		s += 'return new cjs.Sprite(new cjs.SpriteSheet({\n\t\t'+
			'images:["' + meta.image + '"],\n\t\t'+
			'frames:['+frameData.join(",")+'],\n\t\t'+
			'animations:'+JSON.stringify(animationData)+'\n\t'+
		'}));\n'+
		'});\n';

		initializeVars(); // cleanup
	}
	return s;
}

function beginExport(meta){
	initializeVars();
	startFrameNumber = 0;
	globalMeta = meta;


	return 	"if(!window.lib) window.lib = {};\n(function(lib,cjs) {\n";
}

function frameExport(frame){
	var s = "";
	if (symbolName != frame.symbolName){
		s = endSymbol(globalMeta);
		symbolItem = frame.symbol;
		symbolName = frame.symbolName;
	}
	
	r = [frame.frame.x,frame.frame.y,frame.frame.w,frame.frame.h,0];
	if (frame.trimmed){
		r = r.concat([frame.registrationPoint.x-frame.offsetInSource.x,frame.registrationPoint.y-frame.offsetInSource.y]);
	} else {
		r = r.concat([frame.registrationPoint.x,frame.registrationPoint.y]);
	}
	allFrames.push(r);

	return s;
}

function endExport(meta){
	var	s = endSymbol(globalMeta);
	
	globalMeta = null;

	return s+"}(window.lib, createjs || {}));\n\n";
}

function getUnique(arr){
	var u = {}, a = [];
	for(var i = 0, l = arr.length; i < l; ++i){
		if(u.hasOwnProperty(arr[i])) continue;
		a.push(arr[i]);
		u[arr[i]] = 1;
	}
	return a;
}