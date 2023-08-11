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

class ItemGear extends ItemBuilder {
	tag: string = "gear";
	getDisplayedName(): string {
		return `${this.material.name} Gear`;
	}
}

class ItemDust extends ItemBuilder {
	tag: string = "dust";
	getDisplayedName(): string {
		return `${this.material.name} Dust`;
	}
}

class ItemSmallDust extends ItemBuilder {
	tag: string = "dustSmall";
	getDisplayedName(): string {
		return `Small Pile of ${this.material.name} Dust`;
	}
}

class ItemPlate extends ItemBuilder {
	tag: string = "plate";
	getDisplayedName(): string {
		return `${this.material.name} Plate`;
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
		let hasGemTag = material.hasTag("gem");
		if (hasGemTag) new ItemGem(material).create();

		// 锭
		let hasIngotTag = material.hasTag("ingot");
		if (hasIngotTag) new ItemIngot(material).create();

		// 齿轮
		let hasGearTag = material.hasTag("gear");
		if (hasIngotTag || hasGearTag) new ItemGear(material).create();

		// 粉
		let hasDustTag = material.hasTag("dust");
		if (hasGemTag || hasIngotTag || hasDustTag) new ItemDust(material).create();

		// 小堆粉
		let hasSmallDustTag = material.hasTag("dustSmall");
		if (hasDustTag || hasSmallDustTag) new ItemSmallDust(material).create();

		// 板
		let hasPlateTag = material.hasTag("plate");
		if (hasGemTag || hasIngotTag || hasPlateTag) new ItemPlate(material).create();

		// 块
		let hasBlockTag = material.hasTag("block");
		if (hasGemTag || hasIngotTag || hasBlockTag) new BlockBlock(material).create();

		// 粒
		let hasNuggetTag = material.hasTag("nugget");
		if (hasGemTag || hasIngotTag || hasNuggetTag) new ItemNugget(material).create();

		// 棍
		let hasStickTag = material.hasTag("stick");
		if (hasGemTag || hasIngotTag || hasStickTag) new ItemStick(material).create();
	}
});

Callback.addCallback("PostLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];

		let hasDustTag = material.hasTag("dust");
		let hasPlateTag = material.hasTag("plate");
		let hasStickTag = material.hasTag("stick");
		let hasIngotTag = material.hasTag("ingot");
		let hasBlockTag = material.hasTag("block");
		let hasNuggetTag = material.hasTag("nugget");
		let hasSmallDustTag = material.hasTag("dustSmall");

		if (hasDustTag && hasSmallDustTag) {
			Recipes.addShaped({ id: material.getItem("dust"), count: 1, data: 0 }, ["aaa", "aaa", "aaa"], ["a", material.getItem("dustSmall"), 0]);
			Recipes.addShaped({ id: material.getItem("dustSmall"), count: 9, data: 0 }, ["a"], ["a", material.getItem("dust"), 0]);
		}

		if (hasBlockTag && hasIngotTag) {
			Recipes.addShaped({ id: material.getItem("block"), count: 1, data: 0 }, ["aaa", "aaa", "aaa"], ["a", material.getItem("ingot"), 0]);
			Recipes.addShaped({ id: material.getItem("ingot"), count: 9, data: 0 }, ["a"], ["a", material.getItem("block"), 0]);
		}

		if (hasIngotTag && hasNuggetTag) {
			Recipes.addShaped({ id: material.getItem("ingot"), count: 1, data: 0 }, ["aaa", "aaa", "aaa"], ["a", material.getItem("nugget"), 0]);
			Recipes.addShaped({ id: material.getItem("nugget"), count: 9, data: 0 }, ["a"], ["a", material.getItem("ingot"), 0]);
		}

		if (hasPlateTag && hasIngotTag) Recipes.addShaped({ id: material.getItem("plate"), count: 2, data: 0 }, ["aaa"], ["a", material.getItem("ingot"), 0]);
		if (hasStickTag && hasIngotTag) Recipes.addShaped({ id: material.getItem("stick"), count: 4, data: 0 }, ["a", "a"], ["a", material.getItem("ingot"), 0]);

		if (hasDustTag && hasIngotTag) Recipes.addFurnace(material.getItem("dust"), material.getItem("ingot"), 0);
		if (hasSmallDustTag && hasNuggetTag) Recipes.addFurnace(material.getItem("dustSmall"), material.getItem("nugget"), 0);
	}
});
