/// <reference path="./Material.ts" />

class Builder {
	constructor(material: Material) {
		this.material = material;
	}
	material: Material;
	tag: string;
	getStringId(): string {
		return `${this.material.key + (this.tag ? "_" + this.tag : "")}`;
	}
	getDisplayedName(): string {
		return `material.${this.getStringId()}.name`;
	}
	getTranslateName() {
		return Translation.translate(this.getDisplayedName());
	}
	init() {}
	onCreate(id: number) {}
}

class BlockBuilder extends Builder {
	getTexture(): [string, number][] {
		return [[this.getStringId(), 0]];
	}
	getDrops(
		coords: Callback.ItemUseCoordinates,
		id: number,
		bata: number,
		diggingLevel: number,
		enchant: ToolAPI.EnchantData,
		item: ItemInstance,
		region: BlockSource
	): ItemInstanceArray[] {
		return [[id, 1, bata]];
	}
	getDestroyLevel() {
		return this.material.data.destroyLevel;
	}
	getBlockMaterial(): BlockMaterial {
		return "stone";
	}
	create() {
		if (!this.material.getItem(this.tag)) {
			let icon = this.getTexture();
			let config = TextureSource.getConfig(this.material.key, this.tag);
			for (let i = 0; i < Math.min(icon.length, 6); i++) {
				let texture = new ItemTexture({ width: config.size.width, height: config.size.height * (config.animation || 1) });
				for (let part of config.parts) {
					let paint = new Paint();
					if (part.paint) {
						let color = this.material.color || "#FFFFFF";
						paint.setColorFilter(new ColorFilter(Color.parseColor(color), PorterDuff.Mode.MULTIPLY));
					}
					texture.drawImage(TextureSource.getPath(this.material.key, part.name, ".png"), { paint: paint });
				}
				let path = `${TextureSource.getBlockPath()}/${icon[i][0]}_${icon[i][1]}`;
				texture.writeImage(path);
				if (config.animation > 1) texture.writeImage(`${path}.animation.${config.animation}`);
			}

			let id = this.material.genBlockID(this.tag, this.getStringId());
			Block.createBlock(this.getStringId(), [{ name: this.getDisplayedName(), texture: this.getTexture(), inCreative: true }], this.tag);
			this.onCreate(id);

			Logger.Log(`创建方块 ID: ${this.getStringId()}(${id})`, `能源科技/材料`);
		}
	}
	onCreate(id: number) {
		ToolAPI.registerBlockMaterial(id, this.getBlockMaterial(), this.getDestroyLevel(), true);
		Block.registerDropFunction(id, this.getDrops, this.getDestroyLevel());
	}
}

class ItemBuilder extends Builder {
	getIcon(): Item.TextureData {
		return { name: this.getStringId(), data: 0 };
	}

	create() {
		if (!this.material.getItem(this.tag)) {
			let config = TextureSource.getConfig(this.material.key, this.tag);
			let texture = new ItemTexture({ width: config.size.width, height: config.size.height * (config.animation || 1) });
			for (let part of config.parts) {
				let paint = new Paint();
				if (part.paint) {
					let color = this.material.color || "#FFFFFF";
					paint.setColorFilter(new ColorFilter(Color.parseColor(color), PorterDuff.Mode.MULTIPLY));
				}
				texture.drawImage(TextureSource.getPath(this.material.key, part.name, ".png"), { paint: paint });
			}
			let icon = this.getIcon();
			let path = `${TextureSource.getItemPath()}/${icon.name}_${icon.data}`;
			texture.writeImage(path);
			if (config.animation > 1) texture.writeImage(`${path}.animation.${config.animation}`);
			let id = this.material.genItemID(this.tag, this.getStringId());
			Item.createItem(this.getStringId(), this.getDisplayedName(), this.getIcon(), { stack: this.getMaxStack() });
			this.onCreate(id);
			Logger.Log(`创建物品 ID: ${this.getStringId()} (${id})`, `能源科技/材料`);
		}
	}

	getMaxStack() {
		return this.isTool() ? 1 : 64;
	}

	isTool(): boolean {
		return !!ToolType[this.material.key];
	}

	onCreate(id: number) {
		Item.registerUseFunction(id, this.onUse);
		if (this.isTool()) {
			ToolAPI.addToolMaterial(this.material.key, {
				efficiency: this.material.data.toolEfficiency,
				damage: this.material.data.toolDamage,
				durability: this.material.data.toolDurability,
				level: this.material.data.toolLevel
			});
			ToolAPI.registerTool(id, this.material.key, ToolType[this.material.key]);
		}
	}

	onUse(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, player: number) {}
}
