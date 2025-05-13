import { useMutation } from '@tanstack/react-query'

export const useSaveData = () => {
	return useMutation({
		mutationFn: async (data) => {
			const response = await fetch('/api/save-data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) {
				throw new Error('failed to save data')
			}
		},
	})
}
