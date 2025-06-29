type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `http://${string}` | `https://${string}` | `/${string}`;
type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';

export default async function Fetch(method: Method, endpoint: Endpoint, contentType: ContentType, bearer?: string, body?: Object) {
    try {
        const headers: Record<string, string> = {
            'Content-Type': contentType
        };
        if (bearer) {
            headers['Authorization'] = `Bearer ${bearer}`;
        }
        const response = await fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
