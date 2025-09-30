import React, { useCallback, useMemo, useRef, useState } from 'react'
import { MapView } from './components/MapView'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'
import { useLocalStorage } from './hooks/useLocalStorage'

export type VisitedPlace = {
	id: string
	name: string
	address?: string
	location: { lng: number; lat: number }
	visitedAt: string
}

export function App() {
	const { value: places, setValue: setPlaces, clear } = useLocalStorage<VisitedPlace[]>(
		'visited-places',
		[],
	)
	const [selectedId, setSelectedId] = useState<string | null>(null)

	const path = useMemo(() => places.map(p => [p.location.lng, p.location.lat] as [number, number]), [places])

	const onAddPlace = useCallback((place: Omit<VisitedPlace, 'id' | 'visitedAt'>) => {
		const id = `${place.location.lng},${place.location.lat}-${Date.now()}`
		const visitedAt = new Date().toISOString()
		const next: VisitedPlace = { id, visitedAt, ...place }
		setPlaces(prev => [next, ...prev])
		setSelectedId(id)
	}, [setPlaces])

	const onDeletePlace = useCallback((id: string) => {
		setPlaces(prev => prev.filter(p => p.id !== id))
		if (selectedId === id) setSelectedId(null)
	}, [setPlaces, selectedId])

	const onImport = useCallback((json: string) => {
		try {
			const data = JSON.parse(json) as VisitedPlace[]
			if (!Array.isArray(data)) throw new Error('格式不正确')
			setPlaces(data)
		} catch (e) {
			alert('导入失败，请检查 JSON 文件')
		}
	}, [setPlaces])

	const onExport = useCallback(() => {
		const blob = new Blob([JSON.stringify(places, null, 2)], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'visited-places.json'
		a.click()
		URL.revokeObjectURL(url)
	}, [places])

	const selectedPlace = useMemo(() => places.find(p => p.id === selectedId) || null, [places, selectedId])

	return (
		<div className="app">
			<div className="sidebar">
				<h2>去过的地方</h2>
				<SearchBar onSelect={(p) => onAddPlace(p)} />
				<div className="actions">
					<button className="secondary" onClick={onExport}>导出 JSON</button>
					<label>
						<input type="file" accept="application/json" style={{ display: 'none' }} onChange={(e) => {
							const file = e.target.files?.[0]
							if (!file) return
							file.text().then(onImport)
						}} />
						<span className="secondary" style={{ padding: 8, border: '1px solid #eee', borderRadius: 6, cursor: 'pointer' }}>导入 JSON</span>
					</label>
					<button onClick={() => { if (confirm('确定清空所有数据？')) clear() }}>清空</button>
				</div>
				<Sidebar
					places={places}
					selectedId={selectedId}
					onSelect={(id) => setSelectedId(id)}
					onDelete={onDeletePlace}
				/>
			</div>
			<div className="map-wrap">
				<div id="map-container" />
				<MapView
					path={path}
					places={places}
					selectedPlace={selectedPlace}
				/>
			</div>
		</div>
	)
}

