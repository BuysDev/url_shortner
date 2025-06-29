import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

export default async function RedirectLink() {
    const router = useRouter()

    const shortLink = router.query.id

    const getOriginalUrl = async (short: string) => {
        try {
            const response = await fetch(`http://localhost:8080/get_original_link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shortLink: short }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            return data.originalUrl.originalUrl as string
        } catch (error) {
            console.error('Error fetching original URL:', error)
            return '/error'
        }
    }

    const originalUrl = await getOriginalUrl(shortLink as string)
    
    return redirect(originalUrl)
}