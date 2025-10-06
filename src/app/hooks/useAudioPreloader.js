import { useState, useEffect, useCallback } from 'react'
import { Howl } from 'howler'

const AUDIO_FILES = [
	'/Database_music.wav',
	'/insideDB.wav',
	'/question_1.wav',
	'/question_2.wav',
	'/question_3.wav',
	'/question_4.wav',
	'/question_5.wav',
	'/question_6.wav',
	'/question_7.wav',
	'/t1.wav',
	'/t2.wav',
	'/t3.wav',
	'/t4.wav',
]

export const useAudioPreloader = () => {
	const [loadingProgress, setLoadingProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [loadedAudio, setLoadedAudio] = useState(new Map())
	const [error, setError] = useState(null)

	const preloadAudio = useCallback(async () => {
		setIsLoading(true)
		setLoadingProgress(0)
		setError(null)

		const audioPromises = AUDIO_FILES.map((url, index) => {
			return new Promise((resolve, reject) => {
				const howl = new Howl({
					src: [url],
					preload: true,
					volume: 0, // Start silent
					onload: () => {
						setLoadedAudio((prev) => new Map(prev.set(url, howl)))
						setLoadingProgress(
							(prev) => ((index + 1) / AUDIO_FILES.length) * 100
						)
						resolve(howl)
					},
					onloaderror: (id, error) => {
						console.error(`Failed to load audio: ${url}`, error)
						setError(`Failed to load audio: ${url}`)
						resolve(null) // Continue loading other files even if one fails
					},
				})
			})
		})

		try {
			await Promise.all(audioPromises)
			setIsLoading(false)
			console.log('All audio files preloaded successfully')
		} catch (err) {
			console.error('Error preloading audio:', err)
			setError('Failed to preload audio files')
			setIsLoading(false)
		}
	}, [])

	const getPreloadedAudio = useCallback(
		(url) => {
			return loadedAudio.get(url)
		},
		[loadedAudio]
	)

	const createAudioInstance = useCallback(
		(url, options = {}) => {
			const preloadedHowl = loadedAudio.get(url)
			if (preloadedHowl) {
				// Clone the preloaded instance with new options
				return new Howl({
					src: [url],
					volume: options.volume || 0.5,
					loop: options.loop || false,
					autoplay: options.autoplay || false,
					...options,
				})
			}
			// Fallback to creating new instance if not preloaded
			return new Howl({
				src: [url],
				volume: options.volume || 0.5,
				loop: options.loop || false,
				autoplay: options.autoplay || false,
				...options,
			})
		},
		[loadedAudio]
	)

	useEffect(() => {
		preloadAudio()
	}, [preloadAudio])

	return {
		loadingProgress,
		isLoading,
		error,
		loadedAudio,
		getPreloadedAudio,
		createAudioInstance,
		retryPreload: preloadAudio,
	}
}
