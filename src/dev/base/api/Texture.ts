class TextureSource {
	static getPath(material: string, name: string, suffix: ".png" | ".json") {
		let path = `${__assets__}texture-source/[mate]/${name + suffix}`;
		let mate = path.replace("[mate]", material);
		return FileTools.isExists(mate) ? mate : path.replace("[mate]", "general");
	}

	static getConfig(material: string, tag: string) {
		let config = {
			size: { width: 16, height: 16 },
			parts: [
				{
					name: tag,
					paint: true
				},
				{
					name: `${tag}_OVERLAY`
				}
			]
		};
		let path = this.getPath(material, tag, ".json");
		if (FileTools.isExists(path)) config = FileTools.ReadJSON(path);
		return config;
	}

	static getBlockPath() {
		return `${__assets__}textures/terrain-atlas/`;
	}

	static getItemPath() {
		return `${__assets__}textures/items-opaque/`;
	}
}

class ItemTexture {
	constructor(size?: { width: number; height: number }) {
		this.bitmap = Bitmap.createBitmap(size.width || 16, size.height || 16, Bitmap.Config.ARGB_8888);
		this.canvas = new Canvas(this.bitmap);
	}

	bitmap: android.graphics.Bitmap;
	canvas: android.graphics.Canvas;

	drawBitmap(bitmap: android.graphics.Bitmap, option?: { offset?: { x: number; y: number }; paint?: android.graphics.Paint }) {
		(option ??= {}).offset ??= { x: 0, y: 0 };
		this.canvas.drawBitmap(bitmap, option.offset.x, option.offset.y, option.paint);
	}

	drawImage(url: string, option?: { offset?: { x: number; y: number }; paint?: android.graphics.Paint }) {
		if (FileTools.isExists(url)) this.drawBitmap(FileTools.ReadImage(url), option);
	}

	writeImage(url: string) {
		FileTools.WriteImage(url, this.bitmap);
	}
}
