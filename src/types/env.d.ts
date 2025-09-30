interface ImportMetaEnv {
	readonly VITE_AMAP_KEY: string
	readonly VITE_AMAP_SECURITY_CODE?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module '@amap/amap-jsapi-loader' {
	const AMapLoader: any
	export default AMapLoader
}
