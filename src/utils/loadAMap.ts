import AMapLoader from '@amap/amap-jsapi-loader'

let amapPromise: Promise<any> | null = null

function createStubAMap() {
    class Map {
        constructor(containerId: string, opts?: any) {}
        addControl(control: any) {}
        destroy() {}
        setZoomAndCenter(zoom: number, center: [number, number]) {}
    }
    class Scale {}
    class ToolBar {}
    class Marker {
        constructor(opts?: any) {}
        setMap(map: any) {}
    }
    class Polyline {
        constructor(opts?: any) {}
        setMap(map: any) {}
    }
    class AutoComplete {
        constructor(opts?: any) {}
        on(event: string, handler: any) {}
    }
    class PlaceSearch {
        constructor(opts?: any) {}
        search(keyword: string, cb: (status: string, result: any) => void) {
            cb('no_data', { poiList: { pois: [] } })
        }
    }
    class Geocoder {}
    return {
        Map,
        Scale,
        ToolBar,
        Marker,
        Polyline,
        AutoComplete,
        PlaceSearch,
        Geocoder,
    }
}

export function loadAMap(): Promise<any> {
    if (!amapPromise) {
        const key = import.meta.env.VITE_AMAP_KEY
        const securityJsCode = import.meta.env.VITE_AMAP_SECURITY_CODE
        if (!key) {
            console.warn('[AMap] VITE_AMAP_KEY is missing. Falling back to stubbed AMap.')
            amapPromise = Promise.resolve(createStubAMap())
        } else {
            const loaderOptions: any = {
                key,
                version: '2.0',
                plugins: [
                    'AMap.Scale',
                    'AMap.ToolBar',
                    'AMap.AutoComplete',
                    'AMap.PlaceSearch',
                    'AMap.Geocoder',
                ],
            }
            if (securityJsCode) {
                loaderOptions.securityJsCode = securityJsCode
            }
            amapPromise = AMapLoader.load(loaderOptions)
        }
    }
    return amapPromise!
}
