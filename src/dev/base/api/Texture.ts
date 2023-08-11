class TextureSource {
	static getPath(material: string) {
		let path = `${__dir__}/assets/texture-source/`;
		return path + (FileTools.isExists(path + material) ? `${material}/` : "general/");
	}

	static getConfig(material: string, tag: string, meta?: number) {
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
		let path = `${this.getPath(material) + tag + (meta ? `_${meta}` : "")}.json`;
		if (FileTools.isExists(path)) config = FileTools.ReadJSON(path);
		return config;
	}

	static getBlockPath() {
		return `${__dir__}/assets/textures/terrain-atlas/`;
	}

	static getItemPath() {
		return `${__dir__}/assets/textures/items-opaque/`;
	}
}

class ItemTexture {
	constructor(size?: { width: number; height: number }) {
		this.bitmap = Bitmap.createBitmap(size.width || 16, size.height || 16, Bitmap.Config.ARGB_8888);
		this.canvas = new Canvas(this.bitmap);
	}

	bitmap: android.graphics.Bitmap;
	canvas: android.graphics.Canvas;

	draw(url: string, option?: { offset?: { x: number; y: number }; paint?: android.graphics.Paint }) {
		(option ??= {}).offset ??= { x: 0, y: 0 };
		if (FileTools.isExists(url)) this.canvas.drawBitmap(FileTools.ReadImage(url), option.offset.x, option.offset.y, option.paint);
	}

	writeImage(url: string) {
		FileTools.WriteImage(url, this.bitmap);
	}
}
