<script setup>
    defineProps(['post', 'snippet']);
    </script>
    <template>
      <UBlogPost :title="post.title" :description="snippet ? post.snippet : post.body" :to="'/post/' + post.slug"></UBlogPost>
    </template>
    