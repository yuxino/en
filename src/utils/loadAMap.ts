import AMapLoader from '@amap/amap-jsapi-loader'

let amapPromise: Promise<any> | null = null

export function loadAMap(): Promise<any> {
	if (!amapPromise) {
		const key = import.meta.env.VITE_AMAP_KEY
		const securityJsCode = import.meta.env.VITE_AMAP_SECURITY_CODE
		if (!key) {
			throw new Error('Missing VITE_AMAP_KEY in environment')
		}
		const loaderOptions: any = {
			key,
			version: '2.0',
			plugins: [
				'AMap.Scale',
				'AMap.ToolBar',
				'AMap.AutoComplete',
				'AMap.PlaceSearch',
				'AMap.Geocoder',
				'AMap.DistrictSearch',
			],
		}
		if (securityJsCode) {
			loaderOptions.securityJsCode = securityJsCode
		}
		amapPromise = AMapLoader.load(loaderOptions)
	}
	return amapPromise as Promise<any>
}
