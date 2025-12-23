<script setup>
    import axios from 'axios';
    let route = useRoute();
    let res = await axios.get('http://localhost:8000/api/post/' + route.params.slug);
    let post = ref(res.data);
    </script>
    <template>
        <PostCard :post="post"></PostCard>
    </template>