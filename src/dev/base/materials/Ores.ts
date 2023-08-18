/// <reference path="../api/Builder.ts" />

class ItemRawOre extends ItemBuilder {
	tag: string = "oreRaw";
	getDisplayedName(): string {
		return `Raw ${this.material.name} Ore`;
	}
}

class BlockOre extends BlockBuilder {
	tag: string = "ore";
	getDisplayedName() {
		return `${this.material.name} Ore`;
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
		let rawOre = Item.getNumericId(new ItemRawOre(this.material).getStringId());
		return [rawOre != -1 ? [rawOre, 1, 0] : [id, 1, bata]];
	}
}

Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		let hasAlloyTag = material.has("alloy");
		if (!hasAlloyTag) {
			// 原矿
			let hasOreTag = material.has("ore");
			if (hasOreTag) new BlockOre(material).create();

			// 粗矿
			let hasRawOreTag = material.has("rawOre");
			if (hasOreTag || hasRawOreTag) new ItemRawOre(material).create();
		}
	}
});

Callback.addCallback("PostLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];

		let hasGemTag = material.has("gem");
		let hasOreTag = material.has("ore");
		let hasIngotTag = material.has("ingot");
		let hasRawOreTag = material.has("rawOre");

		if (hasOreTag && hasGemTag) Recipes.addFurnace(material.getItem("ore"), material.getItem("gem"), 0);
		if (hasOreTag && hasIngotTag) Recipes.addFurnace(material.getItem("ore"), material.getItem("ingot"), 0);
		if (hasRawOreTag && hasGemTag) Recipes.addFurnace(material.getItem("rawOre"), material.getItem("gem"), 0);
		if (hasRawOreTag && hasIngotTag) Recipes.addFurnace(material.getItem("rawOre"), material.getItem("ingot"), 0);
	}
});
