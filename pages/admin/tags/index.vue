<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const router = useRouter();
const route = useRoute();

const page = ref(parseInt(route.query.page ?? 1));
await tagsStore.getTags(page.value);

async function to(pageNumber: number) {
  router.push({ query: { page: pageNumber } });
  await tagsStore.getTags(pageNumber);
}

function go(path: string) {
  router.push(path);
}

const columns = [
  { accessorKey: 'id', header: '#', cell: (cell) => '#' + cell.getValue() },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'slug', header: 'Slug' },
  { accessorKey: 'created_at', header: 'Created' },
  { accessorKey: 'updated_at', header: 'Updated' },
  {
    id: 'actions',
    cell: ({ row }) => h(
      'div',
      { class: 'text-right' },
      h(
        UDropdownMenu,
        { content: { align: 'end' }, items: getRowItems(row.original), 'aria-label': 'Actions dropdown' },
        () => h(UButton, {
          icon: 'i-lucide-ellipsis-vertical',
          color: 'neutral',
          variant: 'ghost',
          class: 'ml-auto',
          'aria-label': 'Actions dropdown'
        })
      )
    )
  }
];

function getRowItems(tag: any) {
  return [
    { label: 'View', click: () => go(`/admin/tags/${tag.slug}/view`) },
    { label: 'Edit', click: () => go(`/admin/tags/${tag.slug}/edit`) },
    { label: 'Delete', click: async () => { await tagsStore.deleteTag(tag.slug); } },
  ]
}
</script>

<template>
  <div class="flex justify-between items-center my-4">
    <h1 class="text-xl font-semibold">Tags</h1>
    <UButton icon="i-lucide-plus" @click="go('/admin/tags/create')">New Tag</UButton>
  </div>
  <UPagination
    class="my-4 flex justify-center"
    v-model:page="page"
    @update:page="to"
    show-edges
    :sibling-count="2"
    :itemsPerPage="tagsStore.pagination?.per_page"
    :total="tagsStore.pagination?.total ?? 0"
  />
  <UTable :data="tagsStore.tags" :columns="columns" class="flex-1" />
</template>

