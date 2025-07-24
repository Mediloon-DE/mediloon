import axios from "@/lib/axios";


export const search = async (query: string) => {
    try {
        const response = await axios.get('/search', {
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        console.error('Search failed:', error);
        throw new Error('Search failed');
    }
};