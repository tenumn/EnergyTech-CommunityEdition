/// <reference path="../../api/Builder.ts" />

class ItemSingularity extends ItemBuilder {
	tag: string = "singularity";
	getDisplayedName(): string {
		return `${this.material.name} Singularity`;
	}
}

Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		let hasGemTag = material.has("gem");
		let hasIngotTag = material.has("ingot");

		// 块
		let hasSingularityTag = material.has("singularity");
		if (hasGemTag || hasIngotTag || hasSingularityTag) new ItemSingularity(material).create();
	}
});
