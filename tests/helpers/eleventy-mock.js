/**
 * Create mock Eleventy Collection API for testing
 */
export function createEleventyCollectionApi(posts = []) {
  return {
    posts: [...posts],

    getFilteredByGlob(pattern) {
      // Simulate filtering by glob pattern
      return this.posts.filter(post => {
        // Mock blog posts matching pattern
        return pattern.includes('blog');
      });
    },

    addPost(post) {
      this.posts.push(post);
    },

    getAll() {
      return this.posts;
    }
  };
}

/**
 * Create mock post object
 */
export function createMockPost(overrides = {}) {
  return {
    data: {
      title: 'Test Post',
      date: new Date(),
      published: true,
      ...overrides.data
    },
    date: overrides.date || new Date(),
    content: overrides.content || 'Test content',
    url: overrides.url || '/blog/test-post/'
  };
}
