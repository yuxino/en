import AMapLoader from '@amap/amap-jsapi-loader'

let amapPromise: Promise<any> | null = null

export function loadAMap(): Promise<any> {
	if (!amapPromise) {
		const key = import.meta.env.VITE_AMAP_KEY
		if (!key) {
			throw new Error('Missing VITE_AMAP_KEY in environment')
		}
		amapPromise = AMapLoader.load({
			key,
			version: '2.0',
			plugins: [
				'AMap.Scale',
				'AMap.ToolBar',
				'AMap.AutoComplete',
				'AMap.PlaceSearch',
				'AMap.Geocoder',
			],
			// securityJsCode: '', // if security is enabled
		})
	}
	return amapPromise
}
