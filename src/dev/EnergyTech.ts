type BlockMaterial = "stone" | "wood" | "dirt" | "plant" | "fibre" | "cobweb" | "unbreaking";

var Paint = android.graphics.Paint;
var Color = android.graphics.Color;
var Bitmap = android.graphics.Bitmap;
var Canvas = android.graphics.Canvas;
var PorterDuff = android.graphics.PorterDuff;
var ColorFilter = android.graphics.PorterDuffColorFilter;

Object.assign ??= function () {
	let target = arguments[0];
	for (let source of arguments) {
		for (let key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
};

var __assets__ = `${__dir__}assets/`;

var ToolType: Record<string, BlockMaterial[]> = {
	axe: ["wood"],
	pickaxe: ["stone"],
	shovel: ["dirt"],
	hoe: ["plant"],
	shears: ["plant"],
	sword: ["cobweb"]
};