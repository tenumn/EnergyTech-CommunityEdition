class Tag {
	tags: string[] = [];

	addTag(...tag: string[]) {
		this.tags.push(...tag);
		return this;
	}

    hasTag(tag: string): boolean {
		return this.tags.indexOf(tag) != -1;
	}
}
