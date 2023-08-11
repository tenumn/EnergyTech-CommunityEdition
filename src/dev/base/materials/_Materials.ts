/// <reference path="../api/Material.ts" />

var ETMaterials: Record<string, Material> = {
	// 木头
	wood: new Material("wood", "Wood", { vanilla: { stick: VanillaItemID.stick } }),
	// 石头
	stone: new Material("stone", "Stone").addTag("ingot"),
	// 盐
	salt: new Material("salt", "Salt").addTag("ore", "ingot"),
	// 石墨
	graphite: new Material("graphite", "Graphite").addTag("ore", "ingot"),
	// 锂辉石
	spodumene: new Material("spodumene", "Spodumene").addTag("ore", "gem"),

	/* ========================= 金属 ========================= */
	// 铁
	iron: new Material("iron", "Iron", {
		vanilla: { ore: VanillaBlockID.iron_ore, block: VanillaBlockID.iron_block, ingot: VanillaItemID.iron_ingot, nugget: VanillaItemID.iron_nugget }
	}).addTag("ore", "ingot"),
	// 金
	gold: new Material("gold", "Gold", {
		vanilla: { ore: VanillaBlockID.gold_ore, block: VanillaBlockID.gold_block, ingot: VanillaItemID.gold_ingot, nugget: VanillaItemID.gold_nugget }
	}).addTag("ore", "ingot"),
	// 铅
	lead: new Material("lead", "Lead").addTag("ore", "ingot"),
	// 方铅矿
	galena: new Material("galena", "Galena").addTag("ore", "ingot"),
	// 银
	silver: new Material("silver", "Silver").addTag("ore", "ingot"),
	// 铝
	bauxite: new Material("bauxite", "Bauxite").addTag("ore", "ingot"),
	// 铜
	copper: new Material("copper", "Copper").addTag("ore", "ingot"),
	// 黝铜
	tetrahedrite: new Material("tetrahedrite", "Tetrahedrite").addTag("ore", "ingot"),
	// 锡
	tin: new Material("tin", "Tin").addTag("ore", "ingot"),
	// 锡石
	cassiterite: new Material("cassiterite", "Cassiterite").addTag("ore", "ingot"),
	// 锂
	lithium: new Material("lithium", "Lithium").addTag("ore", "ingot"),
	// 钨
	tungsten: new Material("tungsten", "Tungsten").addTag("ore", "ingot"),
	// 铀
	uranium: new Material("uranium", "Uranium").addTag("ore", "ingot"),

	/* ========================= 宝石 ========================= */
	// 红宝石
	ruby: new Material("ruby", "Ruby").addTag("ore", "gem"),
	// 钻石
	diamond: new Material("diamond", "Diamond", {
		vanilla: { ore: VanillaBlockID.diamond_ore, block: VanillaBlockID.diamond_block, gem: VanillaItemID.diamond }
	}).addTag("ore", "gem")
};
