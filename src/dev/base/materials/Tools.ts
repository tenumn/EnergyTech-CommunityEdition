/// <reference path="../api/Builder.ts" />

class ItemAxe extends ItemBuilder {
	tag: string = "axe";
	getDisplayedName(): string {
		return `${this.material.name} Axe`;
	}
}

class ItemPickaxe extends ItemBuilder {
	tag: string = "pickaxe";
	getDisplayedName(): string {
		return `${this.material.name} Pickaxe`;
	}
}

class ItemShovel extends ItemBuilder {
	tag: string = "shovel";
	getDisplayedName(): string {
		return `${this.material.name} Shovel`;
	}
}

class ItemHoe extends ItemBuilder {
	tag: string = "hoe";
	getDisplayedName(): string {
		return `${this.material.name} Hoe`;
	}
}

class ItemSword extends ItemBuilder {
	tag: string = "sword";
	getDisplayedName(): string {
		return `${this.material.name} Sword`;
	}
}
Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		let hasToolTag = material.has("tool");
		
		// 斧
		let hasAxeTag = material.has("axe");
		if (hasToolTag || hasAxeTag) new ItemAxe(material).create();
		
		// 镐
		let hasPickaxeTag = material.has("pickaxe");
		if (hasToolTag || hasPickaxeTag) new ItemPickaxe(material).create();

		// 铲
		let hasShovelTag = material.has("shovel");
		if (hasToolTag || hasShovelTag) new ItemShovel(material).create();

		// 锄
		let hasHoeTag = material.has("hoe");
		if (hasToolTag || hasHoeTag) new ItemHoe(material).create();

		// 剑
		let hasSwordTag = material.has("sword");
		if (hasToolTag || hasSwordTag) new ItemSword(material).create();
	}
});