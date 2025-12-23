import axios from "axios"
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tagsStore', {
  state: () => ({
    pagination: null as any,
    tags: [] as any[],
    tag: null as any,
    errors: null as any,
  }),
  actions: {
    async getTags(page: number = 1) {
      const res = await axios.get('/api/tags', {
        params: { page },
      });
      this.pagination = res.data;
      this.tags = res.data.data;
    },
    async getTag(slug: string) {
      if (this.tags.length) {
        this.tag = this.tags.find((tag: any) => tag.slug === slug);
      } else {
        const res = await axios.get(`/api/tag/${slug}`);
        this.tag = res.data;
      }
    },
    async createTag(payload: any) {
      this.errors = null;
      try {
        const res = await axios.post('/api/tags', payload);
        this.tag = res.data;
      } catch (err: any) {
        this.errors = err?.response?.data?.errors;
      }
    },
    async updateTag(slug: string, payload: any) {
      this.errors = null;
      try {
        const res = await axios.put(`/api/tag/${slug}`, payload);
        this.tag = res.data;
      } catch (err: any) {
        this.errors = err?.response?.data?.errors;
      }
    },
    async deleteTag(slug: string) {
      await axios.delete(`/api/tag/${slug}`);
      this.tags = this.tags.filter((tag: any) => tag.slug !== slug);
    },
  },
})

