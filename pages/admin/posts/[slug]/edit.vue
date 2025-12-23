<script setup>
    import { usePostsStore } from '~/store/posts';
    
    const postsStore = usePostsStore();
    const route = useRoute();
    await postsStore.getPost(route.params.slug);
    const router = useRouter();
    let formData = ref({
       title: postsStore.post.title,
       body: postsStore.post.body, 
    });
    async function update() {
        await postsStore.updatePost(route.params.slug, formData.value);
        if(!postsStore.errors) {
            router.push('/admin/posts');
        }
    }
    </script>
    
    <template>
        <UPageCard class="mt-3" title="Tailwind CSS" >
            <UFormField  label="Title" :error="postsStore.errors?.title?.find(() => true)">
                <UInput v-model="formData.title" class="w-full" placeholder="Title" />
            </UFormField>
            <UFormField label="Content">
                <UTextarea v-model="formData.body" class="w-full" :rows="12" placeholder="Content"  :error="postsStore.errors?.body?.find(() => true)" />
            </UFormField>
            <UButton block @click="update">Update</UButton>
        </UPageCard>
    </template>