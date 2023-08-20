/// <reference path="../../api/Builder.ts" />

class ItemOreChunk extends ItemBuilder {
	tag: string = "oreChunk";
	getDisplayedName(): string {
		return `${this.material.name} Ore Chunk`;
	}
}

class ItemOrePiece extends ItemBuilder {
	tag: string = "orePiece";
	getDisplayedName(): string {
		return `${this.material.name} Ore Piece`;
	}
}

Callback.addCallback("PreLoaded", () => {
	for (let key in ETMaterials) {
		let material = ETMaterials[key];
		let hasOreTag = material.has("ore");
		// 矿物碎块 & 矿物碎片
		let hasOreChunkTag = material.has("oreChunk");
		let hasOrePieceTag = material.has("orePiece");
		if (hasOreTag || hasOreChunkTag || hasOrePieceTag) {
			new ItemOreChunk(material).create();
			new ItemOrePiece(material).create();
		}
	}
});
