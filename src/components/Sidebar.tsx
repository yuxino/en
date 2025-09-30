import React from 'react'
import type { VisitedPlace } from '../App'

type Props = {
	places: VisitedPlace[]
	selectedId: string | null
	onSelect: (id: string) => void
	onDelete: (id: string) => void
}

export function Sidebar({ places, selectedId, onSelect, onDelete }: Props) {
	return (
		<div className="places">
			{places.length === 0 && <div style={{ color: '#888', padding: 8 }}>还没有添加任何地点，试试上面的搜索框吧。</div>}
			{places.map((p) => (
				<div key={p.id} className="place-item" style={{ background: selectedId === p.id ? '#eef4ff' : undefined, borderRadius: 6 }}>
					<div className="meta" onClick={() => onSelect(p.id)} style={{ cursor: 'pointer', flex: 1, minWidth: 0 }}>
						<div className="name">{p.name}</div>
						<div className="address">{p.address || `${p.location.lng.toFixed(5)}, ${p.location.lat.toFixed(5)}`}</div>
						<div className="address">{new Date(p.visitedAt).toLocaleString()}</div>
					</div>
					<div style={{ display: 'flex', gap: 6 }}>
						<button className="secondary" onClick={() => onSelect(p.id)}>定位</button>
						<button onClick={() => onDelete(p.id)}>删除</button>
					</div>
				</div>
			))}
		</div>
	)
}

