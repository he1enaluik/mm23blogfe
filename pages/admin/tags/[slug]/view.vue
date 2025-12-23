<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const route = useRoute();

await tagsStore.getTag(route.params.slug as string);

const rows = computed(() => [
  { name: 'ID', value: tagsStore.tag?.id },
  { name: 'Name', value: tagsStore.tag?.name },
  { name: 'Slug', value: tagsStore.tag?.slug },
  { name: 'Created', value: tagsStore.tag?.created_at },
  { name: 'Updated', value: tagsStore.tag?.updated_at },
]);
</script>

<template>
  <UPageList class="mt-3">
    <UPageCard
      v-for="row in rows"
      :key="row.name"
      class="rounded-none"
    >
      <template #body>
        <UUser :name="row.name" :description="row.value" size="xl" class="relative" />
      </template>
    </UPageCard>
  </UPageList>
</template>

