/// <reference path="../api/Builder.ts" />

class ItemGear extends ItemBuilder {
	tag: string = "gear";
	getDisplayedName(): string {
		return `${this.material.name} Gear`;
	}
}

class ItemCasing extends ItemBuilder {
	tag: string = "casing";
	getDisplayedName(): string {
		return `${this.material.name} Casing`;
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

class ItemDensePlate extends ItemBuilder {
	tag: string = "plateDense";
	getDisplayedName(): string {
		return `Dense ${this.material.name} Plate`;
	}
}

Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		let hasGemTag = material.has("gem");
		let hasIngotTag = material.has("ingot");

		// 齿轮
		let hasGearTag = material.has("gear");
		if (hasGemTag || hasIngotTag || hasGearTag) new ItemGear(material).create();

		// 外壳
		let hasCasingTag = material.has("casing");
		if (hasGemTag || hasIngotTag || hasCasingTag) new ItemGear(material).create();

		// 粉 & 小堆粉
		let hasDustTag = material.has("dust");
		let hasSmallDustTag = material.has("dustSmall");
		if (hasGemTag || hasIngotTag || hasDustTag || hasSmallDustTag) {
			new ItemDust(material).create();
			new ItemSmallDust(material).create();
		}

		// 板 & 压缩板
		let hasPlateTag = material.has("plate");
		let hasDensePlateTag = material.has("plateDense");
		if (hasGemTag || hasIngotTag || hasPlateTag || hasDensePlateTag) {
			new ItemPlate(material).create();
			new ItemDensePlate(material).create();
		}
	}
});

Callback.addCallback("PostLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];

		let hasDustTag = material.has("dust");
		let hasPlateTag = material.has("plate");
		let hasStickTag = material.has("stick");
		let hasIngotTag = material.has("ingot");
		let hasBlockTag = material.has("block");
		let hasNuggetTag = material.has("nugget");
		let hasSmallDustTag = material.has("dustSmall");

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
		if (hasStickTag && hasIngotTag)
			Recipes.addShaped({ id: material.getItem("stick"), count: 4, data: 0 }, ["a", "a"], ["a", material.getItem("ingot"), 0]);
		if (hasDustTag && hasIngotTag) Recipes.addFurnace(material.getItem("dust"), material.getItem("ingot"), 0);
		if (hasSmallDustTag && hasNuggetTag) Recipes.addFurnace(material.getItem("dustSmall"), material.getItem("nugget"), 0);
	}
});
