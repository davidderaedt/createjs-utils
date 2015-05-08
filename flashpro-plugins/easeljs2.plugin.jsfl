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

var symbolItem = null;
var symbolName = null;
var globalMeta = null;

function initializeVars(){
	symbolItem = null;
	symbolName = null;
	allFrames = [];
}

function DetermineAnimationData()
{
	var	labelLayer = null;
	var controlLayer = null;
	var layers = symbolItem.timeline.layers;

	var i;
	for (i = 0; i < layers.length; i++)
	{
		cmpName = layers[i].name.toLowerCase();
		if (cmpName == "labels")
			labelLayer = layers[i];

		if (cmpName == "control")
			controlLayer = layers[i];
	}

	if (labelLayer == null)
		return ""

	var labelFrame = null;
	var controlFrame = null;
	var labelIndex = 0;
	var controlIndex = 0;
	var frameNumber = 0;
	var hitSpan = false;
	var endFrameNumber = 0;

	var s = "";

	while (labelIndex < labelLayer.frames.length)
	{
		labelFrame = labelLayer.frames[labelIndex++];
		if (controlLayer)
			controlFrame = controlLayer.frames[controlIndex++];

		
		if (labelFrame.name != null)
		{
			if (hitSpan)
				s += ", ";
			else
				s += "{";

			endFrameNumber = frameNumber + labelFrame.duration - 1;
			beginFrame = frameNumber;
			endFrame = endFrameNumber;
			s += labelFrame.name + ":[" + beginFrame + "," + endFrame;
			if (controlFrame != null && controlFrame.name != null && controlFrame.name.length != 0)
				s += ", " + "\"" + controlFrame.name + "\"]";
			else
				s += ", true]";

			frameNumber = endFrameNumber + 1;
			labelIndex = frameNumber;
			controlIndex = labelIndex;

			hitSpan = true;
		}
	}
	
	if (hitSpan)
		s += "}";


	return s;
}

function endSymbol(meta){
	var s = "";
	if (symbolItem != null){
		symbolName = symbolName.replace(/\s+/g,"_");
		
		var animationData = DetermineAnimationData();
		var proto = symbolName + "_p";
		
		s += "\nvar "+symbolName + " = function() {\n";
		s += "\tthis.initialize();\n"
		s += "}\n";

		var stackedFrames = unique(allFrames);
		var frameData  = [];
		
		for(var i in allFrames) frameData[i]='s['+stackedFrames.indexOf(allFrames[i])+']';
		

		var spriteData = {
			images:"[spritesheetPath]",
			frames:frameData
		};

		if (animationData != null && animationData.length != 0) spriteData.animations = animationData;

		s += symbolName + "._SpriteSheet = new createjs.SpriteSheet("+JSON.stringify(spriteData)+");\n";
		

		// s += "var s = " + JSON.encode(stackedFrames) + ";\n";
		// s += "var " + proto + " = " + symbolName + ".prototype = new createjs.BitmapAnimation();\n"+
		// proto + ".BitmapAnimation_initialize = " + proto + ".initialize;\n"+
		// proto + ".initialize = function() {\n"+
		// "\tthis.BitmapAnimation_initialize(" + symbolName + "._SpriteSheet);\n"+
		// "\tthis.paused = false;\n"+
		// "}\n";
		
		s+= "scope." + symbolName + " = " + symbolName + ";\n";

		// cleanup
		initializeVars();
	}
	return s;
}

function beginExport(meta){
	initializeVars();
	startFrameNumber = 0;
	globalMeta = meta;

	return 	"(function(window) {\n";
}

function frameExport(frame){
	var s = "";
	if (symbolName != frame.symbolName){
		s = endSymbol(globalMeta);
		symbolItem = frame.symbol;
		symbolName = frame.symbolName;
	}
	
	var allFrames = [frame.frame.x,frame.frame.y,frame.frame.w,frame.frame.h,0];
	if (frame.trimmed){
		allFrames = allFrames.concat([frame.registrationPoint.x-frame.offsetInSource.x,frame.registrationPoint.y-frame.offsetInSource.y]);
	} else {
		allFrames = allFrames.concat([frame.registrationPoint.x,frame.registrationPoint.y]);
	}
	
	return s;
}

function endExport(meta){
	var	s = endSymbol(globalMeta);
	
	globalMeta = null;

	return s+"}(window));\n\n";
}

function unique(arr) {
    var resp = [];
    for (var i = 0; i < arr.length; i++) {
        if (resp.indexOf(arr[i]) == -1) {
            resp.push(arr[i]);
        }
    }
    return resp;
}