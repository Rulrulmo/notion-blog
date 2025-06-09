export const viewsApi = {
  getViewCount: async (pathname: string) => {
    const response = await fetch(`/api/blog?pathname=${pathname}`);
    if (!response.ok) {
      throw new Error('Failed to fetch view count');
    }
    return response.json();
  },

  incrementViewCount: async (pathname: string) => {
    const response = await fetch(`/api/blog?pathname=${pathname}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to increment view count');
    }
    return response.json();
  },
};
