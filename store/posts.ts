import axios from "axios"
export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    pagination: null,
    posts: [],
    post: null,
  }),
  actions: {
    async getPosts(page: Number) {
        let res = await axios.get('http://127.0.0.1:8000/api/posts', {
            params: {
                page
            }
        });
        this.pagination = res.data;
        this.posts = res.data.data;
    },
    async getPost(slug: string) {
        if(this.posts.length) {
            this.post = this.posts.filter((post:any) => post.slug === slug)[0] as any;
        } else {
            let res = await axios.get('http://localhost:8000/api/post/' + slug);
            this.post = res.data;
        }
    }
  },
})