class Group {
    constructor(id: string) {
        this.id = id;
    }

    readonly id: string;

    getDisplayedName() {
        return `group.${this.id}.name`;
    }

    getTranslateName() {
        return Translation.translate(this.getDisplayedName());
    }

    add(ids: number[]) {
        Item.addCreativeGroup(this.id, this.getTranslateName(), ids);
    }
}