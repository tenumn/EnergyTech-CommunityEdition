/// <reference path="../api/Builder.ts" />

class ItemGem extends ItemBuilder {
	tag: string = "gem";
    getStringId(): string {
        return this.material.key;
    }
	getDisplayedName(): string {
		return this.material.name;
	}
}

class ItemIngot extends ItemBuilder {
	tag: string = "ingot";
	getDisplayedName(): string {
		return `${this.material.name} Ingot`;
	}
}

class BlockBlock extends BlockBuilder {
	tag: string = "block";
	getDisplayedName() {
		return `${this.material.name} Block`;
	}
}

class ItemNugget extends ItemBuilder {
	tag: string = "nugget";
	getDisplayedName(): string {
		return `${this.material.name} Nugget`;
	}
}

class ItemStick extends ItemBuilder {
	tag: string = "stick";
	getDisplayedName(): string {
		return `${this.material.name} Stick`;
	}
}

Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		// 宝石
		let hasGemTag = material.has("gem");
		if (hasGemTag) new ItemGem(material).create();

		// 锭
		let hasIngotTag = material.has("ingot");
		if (hasIngotTag) new ItemIngot(material).create();

		// 块
		let hasBlockTag = material.has("block");
		if (hasGemTag || hasIngotTag || hasBlockTag) new BlockBlock(material).create();

		// 粒
		let hasNuggetTag = material.has("nugget");
		if (hasGemTag || hasIngotTag || hasNuggetTag) new ItemNugget(material).create();

		// 棍
		let hasStickTag = material.has("stick");
		if (hasGemTag || hasIngotTag || hasStickTag) new ItemStick(material).create();
	}
});
