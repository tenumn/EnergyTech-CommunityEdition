class BlockEntity implements TileEntity {
	readonly x: number;
	readonly y: number;
	readonly z: number;
	readonly dimension: number;
	readonly blockID: number;
	data: Record<string, any>;
	container: ItemContainer;
	liquidStorage: LiquidRegistry.Storage;
	isLoaded: boolean;
	remove: boolean;
	selfDestroy: () => void;
	sendPacket: (name: string, data: object) => void;
	blockSource: BlockSource;
	networkData: SyncedNetworkData;
	networkEntity: NetworkEntity;
	sendResponse: (packetName: string, someData: object) => void;
}
