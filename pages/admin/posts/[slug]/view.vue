<script setup>
    import { usePostsStore } from '~/store/posts';
    
    const postsStore = usePostsStore();
    const route = useRoute();
    await postsStore.getPost(route.params.slug);
    let rows = [
        {
            name: 'ID',
            value: postsStore.post.id
        },
        {
            name: 'Title',
            value: postsStore.post.title
        },
        {
            name: 'Content',
            value: postsStore.post.body
        },
        {
            name: 'Created',
            value: postsStore.post.created_at
        },
        {
            name: 'Updated',
            value: postsStore.post.updated_at
        }
    ]
    </script>
    
    <template>
        <UPageList class="mt-3">
            <UPageCard class="rounded-none"
            v-for="(row, index) in rows"
            >
                <template #body>
                    <UUser :name="row.name" :description="row.value" size="xl" class="relative" />
                </template>
            </UPageCard>
      </UPageList>
    </template>