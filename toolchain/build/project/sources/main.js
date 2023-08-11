var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var Paint = android.graphics.Paint;
var Color = android.graphics.Color;
var Bitmap = android.graphics.Bitmap;
var Canvas = android.graphics.Canvas;
var PorterDuff = android.graphics.PorterDuff;
var ColorFilter = android.graphics.PorterDuffColorFilter;
(_a = Object.assign) !== null && _a !== void 0 ? _a : (Object.assign = function () {
    var e_1, _a;
    var target = arguments[0];
    try {
        for (var arguments_1 = __values(arguments), arguments_1_1 = arguments_1.next(); !arguments_1_1.done; arguments_1_1 = arguments_1.next()) {
            var source = arguments_1_1.value;
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arguments_1_1 && !arguments_1_1.done && (_a = arguments_1.return)) _a.call(arguments_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return target;
});
var BlockEntity = /** @class */ (function () {
    function BlockEntity() {
    }
    return BlockEntity;
}());
var Tag = /** @class */ (function () {
    function Tag() {
        this.tags = [];
    }
    Tag.prototype.addTag = function () {
        var _a;
        var tag = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tag[_i] = arguments[_i];
        }
        (_a = this.tags).push.apply(_a, __spreadArray([], __read(tag), false));
        return this;
    };
    Tag.prototype.hasTag = function (tag) {
        return this.tags.indexOf(tag) != -1;
    };
    return Tag;
}());
/// <reference path="./Tag.ts" />
var Material = /** @class */ (function (_super) {
    __extends(Material, _super);
    function Material(key, name, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        // parts
        _this.parts = [];
        // items
        _this.items = {};
        _this.key = key;
        _this.name = name;
        // options
        options = Object.assign({}, {
            color: "#FFFFFF",
            vanilla: {},
            toolLevel: 1,
            toolDamage: 4,
            destroyLevel: 1,
            toolDurability: 100,
            toolEfficiency: 12
        }, options);
        _this.color = options.color;
        for (var tag in options.vanilla)
            _this.addItem(tag, options.vanilla[tag]);
        _this.toolLevel = options.toolLevel;
        _this.destroyLevel = options.destroyLevel;
        return _this;
    }
    Material.prototype.addPart = function (parts) {
        this.parts = parts;
        return this;
    };
    Material.prototype.addItem = function (tag, id) {
        this.items[tag] = id;
        this.addTag(tag);
    };
    Material.prototype.getItem = function (tag) {
        return this.items[tag];
    };
    // ids
    Material.prototype.genBlockID = function (tag, name) {
        var id = IDRegistry.genBlockID(name);
        new Group(tag).add([id]);
        this.items[tag] = id;
        this.addTag(tag);
        return id;
    };
    Material.prototype.genItemID = function (tag, name) {
        var id = IDRegistry.genItemID(name);
        new Group(tag).add([id]);
        this.items[tag] = id;
        this.addTag(tag);
        return id;
    };
    return Material;
}(Tag));
/// <reference path="./Material.ts" />
var Builder = /** @class */ (function () {
    function Builder(material) {
        this.material = material;
    }
    Builder.prototype.getStringId = function () {
        return "".concat(this.material.key + (this.tag ? "_" + this.tag : ""));
    };
    Builder.prototype.getDisplayedName = function () {
        return "material.".concat(this.getStringId(), ".name");
    };
    Builder.prototype.init = function () { };
    Builder.prototype.onCreate = function (id) { };
    return Builder;
}());
var BlockBuilder = /** @class */ (function (_super) {
    __extends(BlockBuilder, _super);
    function BlockBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockBuilder.prototype.getTexture = function () {
        return [[this.getStringId(), 0]];
    };
    BlockBuilder.prototype.getDrops = function (coords, id, bata, diggingLevel, enchant, item, region) {
        return [[id, 1, bata]];
    };
    BlockBuilder.prototype.getDestroyLevel = function () {
        return this.material.destroyLevel;
    };
    BlockBuilder.prototype.getBlockMaterial = function () {
        return "stone";
    };
    BlockBuilder.prototype.create = function () {
        var e_2, _a;
        if (!this.material.getItem(this.tag)) {
            var icon = this.getTexture();
            var config = TextureSource.getConfig(this.material.key, this.tag);
            for (var i = 0; i < Math.min(icon.length, 6); i++) {
                var texture = new ItemTexture(config.size);
                try {
                    for (var _b = (e_2 = void 0, __values(config.parts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var part = _c.value;
                        var paint = new Paint();
                        if (part.paint)
                            paint.setColorFilter(new ColorFilter(Color.parseColor(this.material.color), PorterDuff.Mode.MULTIPLY));
                        texture.draw("".concat(TextureSource.getPath(this.material.key) + part.name, ".png"), { paint: paint });
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                texture.writeImage("".concat(TextureSource.getBlockPath(), "/").concat(icon[i][0], "_").concat(icon[i][1], ".png"));
            }
            var id = this.material.genBlockID(this.tag, this.getStringId());
            Block.createBlock(this.getStringId(), [{ name: this.getDisplayedName(), texture: this.getTexture(), inCreative: true }], this.tag);
            this.onCreate(id);
        }
    };
    BlockBuilder.prototype.onCreate = function (id) {
        ToolAPI.registerBlockMaterial(id, this.getBlockMaterial(), this.getDestroyLevel(), true);
        Block.registerDropFunction(id, this.getDrops, this.getDestroyLevel());
    };
    return BlockBuilder;
}(Builder));
var ItemBuilder = /** @class */ (function (_super) {
    __extends(ItemBuilder, _super);
    function ItemBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBuilder.prototype.getIcon = function () {
        return { name: this.getStringId(), data: 0 };
    };
    ItemBuilder.prototype.create = function () {
        var e_3, _a;
        if (!this.material.getItem(this.tag)) {
            var config = TextureSource.getConfig(this.material.key, this.tag);
            var texture = new ItemTexture(config.size);
            try {
                for (var _b = __values(config.parts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var part = _c.value;
                    var paint = new Paint();
                    if (part.paint)
                        paint.setColorFilter(new ColorFilter(Color.parseColor(this.material.color), PorterDuff.Mode.MULTIPLY));
                    texture.draw("".concat(TextureSource.getPath(this.material.key) + part.name, ".png"), { paint: paint });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            var icon = this.getIcon();
            texture.writeImage("".concat(TextureSource.getItemPath(), "/").concat(icon.name, "_").concat(icon.data, ".png"));
            var id = this.material.genItemID(this.tag, this.getStringId());
            Item.createItem(this.getStringId(), this.getDisplayedName(), this.getIcon());
            this.onCreate(id);
        }
    };
    return ItemBuilder;
}(Builder));
var Group = /** @class */ (function () {
    function Group(id) {
        this.id = id;
    }
    Group.prototype.getDisplayedName = function () {
        return "group.".concat(this.id, ".name");
    };
    Group.prototype.getTranslateName = function () {
        return Translation.translate(this.getDisplayedName());
    };
    Group.prototype.add = function (ids) {
        Item.addCreativeGroup(this.id, this.getTranslateName(), ids);
    };
    return Group;
}());
var TextureSource = /** @class */ (function () {
    function TextureSource() {
    }
    TextureSource.getPath = function (material) {
        var path = "".concat(__dir__, "/assets/texture-source/");
        return path + (FileTools.isExists(path + material) ? "".concat(material, "/") : "general/");
    };
    TextureSource.getConfig = function (material, tag, meta) {
        var config = {
            size: { width: 16, height: 16 },
            parts: [
                {
                    name: tag,
                    paint: true
                },
                {
                    name: "".concat(tag, "_OVERLAY")
                }
            ]
        };
        var path = "".concat(this.getPath(material) + tag + (meta ? "_".concat(meta) : ""), ".json");
        if (FileTools.isExists(path))
            config = FileTools.ReadJSON(path);
        return config;
    };
    TextureSource.getBlockPath = function () {
        return "".concat(__dir__, "/assets/textures/terrain-atlas/");
    };
    TextureSource.getItemPath = function () {
        return "".concat(__dir__, "/assets/textures/items-opaque/");
    };
    return TextureSource;
}());
var ItemTexture = /** @class */ (function () {
    function ItemTexture(size) {
        this.bitmap = Bitmap.createBitmap(size.width || 16, size.height || 16, Bitmap.Config.ARGB_8888);
        this.canvas = new Canvas(this.bitmap);
    }
    ItemTexture.prototype.draw = function (url, option) {
        var _a;
        var _b;
        (_a = (_b = (option !== null && option !== void 0 ? option : (option = {}))).offset) !== null && _a !== void 0 ? _a : (_b.offset = { x: 0, y: 0 });
        if (FileTools.isExists(url)) {
            this.canvas.drawBitmap(FileTools.ReadImage(url), option.offset.x, option.offset.y, option.paint);
        }
    };
    ItemTexture.prototype.writeImage = function (url) {
        FileTools.WriteImage(url, this.bitmap);
    };
    return ItemTexture;
}());
/// <reference path="../api/Builder.ts" />
var ItemGem = /** @class */ (function (_super) {
    __extends(ItemGem, _super);
    function ItemGem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "gem";
        return _this;
    }
    ItemGem.prototype.getStringId = function () {
        return this.material.key;
    };
    ItemGem.prototype.getDisplayedName = function () {
        return this.material.name;
    };
    return ItemGem;
}(ItemBuilder));
var ItemIngot = /** @class */ (function (_super) {
    __extends(ItemIngot, _super);
    function ItemIngot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "ingot";
        return _this;
    }
    ItemIngot.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Ingot");
    };
    return ItemIngot;
}(ItemBuilder));
var ItemGear = /** @class */ (function (_super) {
    __extends(ItemGear, _super);
    function ItemGear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "gear";
        return _this;
    }
    ItemGear.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Gear");
    };
    return ItemGear;
}(ItemBuilder));
var ItemDust = /** @class */ (function (_super) {
    __extends(ItemDust, _super);
    function ItemDust() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "dust";
        return _this;
    }
    ItemDust.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Dust");
    };
    return ItemDust;
}(ItemBuilder));
var ItemSmallDust = /** @class */ (function (_super) {
    __extends(ItemSmallDust, _super);
    function ItemSmallDust() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "dustSmall";
        return _this;
    }
    ItemSmallDust.prototype.getDisplayedName = function () {
        return "Small Pile of ".concat(this.material.name, " Dust");
    };
    return ItemSmallDust;
}(ItemBuilder));
var ItemPlate = /** @class */ (function (_super) {
    __extends(ItemPlate, _super);
    function ItemPlate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "plate";
        return _this;
    }
    ItemPlate.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Plate");
    };
    return ItemPlate;
}(ItemBuilder));
var BlockBlock = /** @class */ (function (_super) {
    __extends(BlockBlock, _super);
    function BlockBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "block";
        return _this;
    }
    BlockBlock.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Block");
    };
    return BlockBlock;
}(BlockBuilder));
var ItemNugget = /** @class */ (function (_super) {
    __extends(ItemNugget, _super);
    function ItemNugget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "nugget";
        return _this;
    }
    ItemNugget.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Nugget");
    };
    return ItemNugget;
}(ItemBuilder));
var ItemStick = /** @class */ (function (_super) {
    __extends(ItemStick, _super);
    function ItemStick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "stick";
        return _this;
    }
    ItemStick.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Stick");
    };
    return ItemStick;
}(ItemBuilder));
Callback.addCallback("PreLoaded", function () {
    for (var key in ETMaterials) {
        var material = ETMaterials[key];
        // 宝石
        var hasGemTag = material.hasTag("gem");
        if (hasGemTag)
            new ItemGem(material).create();
        // 锭
        var hasIngotTag = material.hasTag("ingot");
        if (hasIngotTag)
            new ItemIngot(material).create();
        // 齿轮
        var hasGearTag = material.hasTag("gear");
        if (hasIngotTag || hasGearTag)
            new ItemGear(material).create();
        // 粉
        var hasDustTag = material.hasTag("dust");
        if (hasGemTag || hasIngotTag || hasDustTag)
            new ItemDust(material).create();
        // 小堆粉
        var hasSmallDustTag = material.hasTag("dustSmall");
        if (hasDustTag || hasSmallDustTag)
            new ItemSmallDust(material).create();
        // 板
        var hasPlateTag = material.hasTag("plate");
        if (hasGemTag || hasIngotTag || hasPlateTag)
            new ItemPlate(material).create();
        // 块
        var hasBlockTag = material.hasTag("block");
        if (hasGemTag || hasIngotTag || hasBlockTag)
            new BlockBlock(material).create();
        // 粒
        var hasNuggetTag = material.hasTag("nugget");
        if (hasGemTag || hasIngotTag || hasNuggetTag)
            new ItemNugget(material).create();
        // 棍
        var hasStickTag = material.hasTag("stick");
        if (hasGemTag || hasIngotTag || hasStickTag)
            new ItemStick(material).create();
    }
});
Callback.addCallback("PostLoaded", function () {
    for (var key in ETMaterials) {
        var material = ETMaterials[key];
        var hasDustTag = material.hasTag("dust");
        var hasPlateTag = material.hasTag("plate");
        var hasStickTag = material.hasTag("stick");
        var hasIngotTag = material.hasTag("ingot");
        var hasBlockTag = material.hasTag("block");
        var hasNuggetTag = material.hasTag("nugget");
        var hasSmallDustTag = material.hasTag("dustSmall");
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
        if (hasPlateTag && hasIngotTag)
            Recipes.addShaped({ id: material.getItem("plate"), count: 2, data: 0 }, ["aaa"], ["a", material.getItem("ingot"), 0]);
        if (hasStickTag && hasIngotTag)
            Recipes.addShaped({ id: material.getItem("stick"), count: 4, data: 0 }, ["a", "a"], ["a", material.getItem("ingot"), 0]);
        if (hasDustTag && hasIngotTag)
            Recipes.addFurnace(material.getItem("dust"), material.getItem("ingot"), 0);
        if (hasSmallDustTag && hasNuggetTag)
            Recipes.addFurnace(material.getItem("dustSmall"), material.getItem("nugget"), 0);
    }
});
/// <reference path="../api/Builder.ts" />
var ItemRawOre = /** @class */ (function (_super) {
    __extends(ItemRawOre, _super);
    function ItemRawOre() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "oreRaw";
        return _this;
    }
    ItemRawOre.prototype.getDisplayedName = function () {
        return "Raw ".concat(this.material.name, " Ore");
    };
    return ItemRawOre;
}(ItemBuilder));
var BlockOre = /** @class */ (function (_super) {
    __extends(BlockOre, _super);
    function BlockOre() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = "ore";
        return _this;
    }
    BlockOre.prototype.getDisplayedName = function () {
        return "".concat(this.material.name, " Ore");
    };
    BlockOre.prototype.getDrops = function (coords, id, bata, diggingLevel, enchant, item, region) {
        var rawOre = Item.getNumericId(new ItemRawOre(this.material).getStringId());
        return [rawOre != -1 ? [rawOre, 1, 0] : [id, 1, bata]];
    };
    return BlockOre;
}(BlockBuilder));
Callback.addCallback("PreLoaded", function () {
    for (var key in ETMaterials) {
        var material = ETMaterials[key];
        var hasAlloyTag = material.hasTag("alloy");
        if (!hasAlloyTag) {
            // 原矿
            var hasOreTag = material.hasTag("ore");
            if (hasOreTag)
                new BlockOre(material).create();
            // 粗矿
            var hasRawOreTag = material.hasTag("rawOre");
            if (hasOreTag || hasRawOreTag)
                new ItemRawOre(material).create();
        }
    }
});
Callback.addCallback("PostLoaded", function () {
    for (var key in ETMaterials) {
        var material = ETMaterials[key];
        var hasGemTag = material.hasTag("gem");
        var hasOreTag = material.hasTag("ore");
        var hasIngotTag = material.hasTag("ingot");
        var hasRawOreTag = material.hasTag("rawOre");
        if (hasOreTag && hasGemTag)
            Recipes.addFurnace(material.getItem("ore"), material.getItem("gem"), 0);
        if (hasOreTag && hasIngotTag)
            Recipes.addFurnace(material.getItem("ore"), material.getItem("ingot"), 0);
        if (hasRawOreTag && hasGemTag)
            Recipes.addFurnace(material.getItem("rawOre"), material.getItem("gem"), 0);
        if (hasRawOreTag && hasIngotTag)
            Recipes.addFurnace(material.getItem("rawOre"), material.getItem("ingot"), 0);
    }
});
/// <reference path="../api/Material.ts" />
var ETMaterials = {
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
/// <reference path="../../base/api/BlockEntity.ts" />
var CableIDs = {};
var EnergyNode = /** @class */ (function (_super) {
    __extends(EnergyNode, _super);
    function EnergyNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultValues = {
            connect: null
        };
        return _this;
    }
    EnergyNode.prototype.click = function (id, count, data, coords, player, extra) {
        if (CableIDs[id]) {
        }
    };
    return EnergyNode;
}(BlockEntity));
