import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const raw = localStorage.getItem(key)
			return raw ? (JSON.parse(raw) as T) : initialValue
		} catch {
			return initialValue
		}
	})

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch {
			// ignore
		}
	}, [key, value])

	const clear = useCallback(() => {
		try {
			localStorage.removeItem(key)
		} finally {
			setValue(initialValue)
		}
	}, [key, initialValue])

	return { value, setValue, clear }
}
