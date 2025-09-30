import React, { useEffect, useRef } from 'react'
import { loadAMap } from '../utils/loadAMap'
import type { VisitedPlace } from '../App'

type Props = {
	places: VisitedPlace[]
	path: [number, number][]
	selectedPlace: VisitedPlace | null
}

export function MapView({ places, path, selectedPlace }: Props) {
	const mapRef = useRef<any | null>(null)
	const markersRef = useRef<any[]>([])
	const polylineRef = useRef<any | null>(null)

	useEffect(() => {
		let isMounted = true
		loadAMap().then((AMap) => {
			if (!isMounted) return
			const map = new AMap.Map('map-container', {
				viewMode: '3D',
				zoom: 4,
				center: [104.195397, 35.86166], // China center
			})
			map.addControl(new AMap.Scale())
			map.addControl(new AMap.ToolBar())
			mapRef.current = map
		})
		return () => {
			isMounted = false
			if (mapRef.current) {
				mapRef.current.destroy()
				mapRef.current = null
			}
		}
	}, [])

	// Render markers
	useEffect(() => {
		if (!mapRef.current) return
		loadAMap().then((AMap) => {
			markersRef.current.forEach(m => m.setMap(null))
			markersRef.current = []
			const markers = places.map(p => new AMap.Marker({
				position: [p.location.lng, p.location.lat],
				title: p.name,
			}))
			markers.forEach(m => m.setMap(mapRef.current))
			markersRef.current = markers
		})
	}, [places])

	// Render polyline
	useEffect(() => {
		if (!mapRef.current) return
		loadAMap().then((AMap) => {
			if (polylineRef.current) {
				polylineRef.current.setMap(null)
				polylineRef.current = null
			}
			if (path.length >= 2) {
				polylineRef.current = new AMap.Polyline({
					path,
					strokeColor: '#1677ff',
					strokeWeight: 4,
				})
				polylineRef.current.setMap(mapRef.current)
			}
		})
	}, [path])

	// Fly to selected
	useEffect(() => {
		if (!mapRef.current || !selectedPlace) return
		mapRef.current.setZoomAndCenter(12, [selectedPlace.location.lng, selectedPlace.location.lat])
	}, [selectedPlace])

	return null
}

