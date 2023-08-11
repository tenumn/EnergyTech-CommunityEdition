/// <reference path="./Tag.ts" />

interface ToolOptions {
	toolLevel?: number;
	toolDamage?: number;
	toolDurability?: number;
	toolEfficiency?: number;
}

interface CableOptions {
	cableSize?: number;
}

interface MaterialOptions extends ToolOptions, CableOptions {
	color?: string;
	vanilla?: Record<string, any>;
	destroyLevel?: number;
}

class Material extends Tag {
	constructor(key: string, name: string, options: MaterialOptions = {}) {
		super();
		this.key = key;
		this.name = name;
		// options
		options = Object.assign(
			{},
			{
				color: "#FFFFFF",
				vanilla: {},
				// block
				destroyLevel: 1,
				// tool
				toolLevel: 1,
				toolDamage: 4,
				toolDurability: 100,
				toolEfficiency: 12,
				// cable
				cableSize: 16
			},
			options
		);
		this.data = options;
		for (let tag in options.vanilla) this.addItem(tag, options.vanilla[tag]);
	}
	key: string;
	name: string;
	color: string;
	// parts
	parts: string[] = [];
	addPart(parts: string[]) {
		this.parts = parts;
		return this;
	}

	data: MaterialOptions;

	// items
	items: Record<string, number> = {};
	addItem(tag: string, id: number) {
		this.items[tag] = id;
		this.addTag(tag);
	}
	getItem(tag: string): number {
		return this.items[tag];
	}

	// ids
	genBlockID(tag: string, name: string) {
		let id = IDRegistry.genBlockID(name);
		new Group(tag).add([id]);
		this.items[tag] = id;
		this.addTag(tag);
		return id;
	}
	genItemID(tag: string, name: string) {
		let id = IDRegistry.genItemID(name);
		new Group(tag).add([id]);
		this.items[tag] = id;
		this.addTag(tag);
		return id;
	}
}
