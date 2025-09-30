import React, { useEffect, useRef, useState } from 'react'
import { loadAMap } from '../utils/loadAMap'

type SelectPayload = {
	name: string
	address?: string
	location: { lng: number; lat: number }
}

export function SearchBar({ onSelect }: { onSelect: (p: SelectPayload) => void }) {
	const [keyword, setKeyword] = useState('')
	const autoRef = useRef<any | null>(null)

	useEffect(() => {
		let placeSearch: any | null = null
		loadAMap().then((AMap) => {
			autoRef.current = new AMap.AutoComplete({ input: 'search-input' })
			placeSearch = new AMap.PlaceSearch({ pageSize: 5 })
			autoRef.current.on('select', (e: any) => {
				const poi = e.poi
				if (!poi?.location) {
					// fallback to keyword search
					placeSearch?.search(poi?.name || keyword, (status: string, result: any) => {
						const first = result?.poiList?.pois?.[0]
						if (first?.location) {
							onSelect({
								name: first.name,
								address: first.address,
								location: { lng: first.location.lng, lat: first.location.lat },
							})
						}
					})
					return
				}
				onSelect({
					name: poi.name,
					address: poi.address,
					location: { lng: poi.location.lng, lat: poi.location.lat },
				})
			})
		})
		return () => {
			autoRef.current = null
			placeSearch = null
		}
	}, [keyword, onSelect])

	return (
		<div className="search-bar">
			<input
				id="search-input"
				placeholder="搜索地点，例如：广州塔"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
		</div>
	)
}

