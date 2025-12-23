<script setup>
    let route = useRoute();
    let items = computed(() => {
        return [
            {
                label: 'Home',
                to: '/',
                active: route.path === '/',
    
            },
            {
                label: 'Admin',
                //to: '/admin',
                active: route.path.startsWith('/admin'),
                children: [
                    {
                        label: 'Posts',
                        to: '/admin/posts',
                        active: route.path.startsWith('/admin/posts'),
                    }
                ]
            }
        ]
    });
    </script>
    <template>
        <UHeader title="Blog">
            <template #right>
                <UColorModeButton />
            </template>
         
                <UNavigationMenu :items="items" />
            
        </UHeader>
    </template>