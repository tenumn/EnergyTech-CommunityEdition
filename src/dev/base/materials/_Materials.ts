/// <reference path="../api/Material.ts" />

var ETMaterials: Record<string, Material> = {
	// 木头
	wood: new Material("wood", "Wood", {
		vanilla: {
			stick: VanillaItemID.stick,
			// 工具
			axe: VanillaItemID.wooden_axe,
			pickaxe: VanillaItemID.wooden_pickaxe,
			shovel: VanillaItemID.wooden_shovel,
			hoe: VanillaItemID.wooden_hoe,
			sword: VanillaItemID.wooden_sword
		}
	}).add("ingot", "tool"),
	// 石头
	stone: new Material("stone", "Stone", {
		vanilla: {
			// 工具
			axe: VanillaItemID.stone_axe,
			pickaxe: VanillaItemID.stone_pickaxe,
			shovel: VanillaItemID.stone_shovel,
			hoe: VanillaItemID.stone_hoe,
			sword: VanillaItemID.stone_sword
		}
	}).add("ingot", "tool"),
	// 盐
	salt: new Material("salt", "Salt", {}).add("ore", "ingot"),
	// 石墨
	graphite: new Material("graphite", "Graphite", {}).add("ore", "ingot"),
	// 锂辉石
	spodumene: new Material("spodumene", "Spodumene", {}).add("ore", "gem"),

	/* ========================= 金属 ========================= */
	// 铁
	iron: new Material("iron", "Iron", {
		vanilla: {
			ore: VanillaBlockID.iron_ore,
			block: VanillaBlockID.iron_block,
			ingot: VanillaItemID.iron_ingot,
			nugget: VanillaItemID.iron_nugget,
			// 工具
			axe: VanillaItemID.iron_axe,
			pickaxe: VanillaItemID.iron_pickaxe,
			shovel: VanillaItemID.iron_shovel,
			hoe: VanillaItemID.iron_hoe,
			sword: VanillaItemID.iron_sword
		}
	}).add("ore", "ingot", "tool"),
	// 金
	gold: new Material("gold", "Gold", {
		vanilla: {
			ore: VanillaBlockID.gold_ore,
			block: VanillaBlockID.gold_block,
			ingot: VanillaItemID.gold_ingot,
			nugget: VanillaItemID.gold_nugget,
			// 工具
			axe: VanillaItemID.golden_axe,
			pickaxe: VanillaItemID.golden_pickaxe,
			shovel: VanillaItemID.golden_shovel,
			hoe: VanillaItemID.golden_hoe,
			sword: VanillaItemID.golden_sword
		}
	}).add("ore", "ingot", "tool"),
	// 铅
	lead: new Material("lead", "Lead", {}).add("ore", "ingot", "tool"),
	// 方铅矿
	galena: new Material("galena", "Galena", {}).add("ore", "ingot"),
	// 银
	silver: new Material("silver", "Silver", {}).add("ore", "ingot", "tool"),
	// 铝
	bauxite: new Material("bauxite", "Bauxite", {}).add("ore", "ingot", "tool"),
	// 铜
	copper: new Material("copper", "Copper", {}).add("ore", "ingot", "tool"),
	// 黝铜
	tetrahedrite: new Material("tetrahedrite", "Tetrahedrite", {}).add("ore", "ingot"),
	// 锡
	tin: new Material("tin", "Tin", {}).add("ore", "ingot", "tool"),
	// 锡石
	cassiterite: new Material("cassiterite", "Cassiterite", {}).add("ore", "ingot"),
	// 锂
	lithium: new Material("lithium", "Lithium", {}).add("ore", "ingot"),
	// 钨
	tungsten: new Material("tungsten", "Tungsten", {}).add("ore", "ingot"),
	// 铀
	uranium: new Material("uranium", "Uranium", {}).add("ore", "ingot"),

	/* ========================= 宝石 ========================= */
	// 红宝石
	ruby: new Material("ruby", "Ruby", {}).add("ore", "gem"),
	// 钻石
	diamond: new Material("diamond", "Diamond", {
		vanilla: {
			ore: VanillaBlockID.diamond_ore,
			block: VanillaBlockID.diamond_block,
			gem: VanillaItemID.diamond,
			// 工具
			axe: VanillaItemID.diamond_axe,
			pickaxe: VanillaItemID.diamond_pickaxe,
			shovel: VanillaItemID.diamond_shovel,
			hoe: VanillaItemID.diamond_hoe,
			sword: VanillaItemID.diamond_sword
		}
	}).add("ore", "gem", "tool")
};
