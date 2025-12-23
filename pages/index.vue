<script setup>
    import axios from 'axios';
    let router = useRouter();
    let route = useRoute();
    
    let pagination = ref(null);
    let posts = ref([]);
    
    await getPosts(route.query.page);
    
    
    
    let page = ref(parseInt(route.query.page ?? 1) );
    
    async function getPosts(page) {
        let res = await axios.get('http://127.0.0.1:8000/api/posts', {
            params: {
                page
            }
        });
        console.log(res.data);
        pagination.value = res.data;
        posts.value = res.data.data;
        console.log(res.data);
    }
    
    async function to(page) {
        router.push({
            query: {
                page: page
            }
        });
        await getPosts(page);
    }
    </script>
    
    <template>
        <UPagination v-model:page="page" @update:page="to" show-edges :sibling-count="2" :itemsPerPage="pagination.per_page" :total="pagination.total" />
        <UPageColumns>
            <PostCard v-for="post in posts" :post="post" :snippet="true"></PostCard>
        </UPageColumns>
    </template>