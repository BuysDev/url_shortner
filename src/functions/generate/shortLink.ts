import Fetch from '@/controllers/fetch'

export const generateShortLink = async (longLink: string) => {
    try {
        const response = await Fetch('POST', 'http://localhost:8080/generate_short_link', 'application/json', undefined, { longLink: longLink })
        if (!response || !response.shortLink) {
            throw new Error('Failed to generate short link')
        }

        return response.shortLink as string
    } catch (error) {
        console.error('Error generating short link:', error)
        return null
    }
}