class Tag {
	tags: string[] = [];

	add(...tag: any[]) {
		this.tags.push(...tag);
		return this;
	}

    has(tag: any): boolean {
		return this.tags.indexOf(tag) != -1;
	}
}
