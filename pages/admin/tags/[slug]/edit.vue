<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const route = useRoute();
const router = useRouter();

await tagsStore.getTag(route.params.slug as string);

const formData = ref({
  name: tagsStore.tag?.name,
  slug: tagsStore.tag?.slug,
});

async function updateTag() {
  await tagsStore.updateTag(route.params.slug as string, formData.value);
  if (!tagsStore.errors) {
    router.push('/admin/tags');
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Edit Tag">
    <UFormField label="Name" :error="tagsStore.errors?.name?.find(() => true)">
      <UInput v-model="formData.name" class="w-full" placeholder="Name" />
    </UFormField>
    <UFormField label="Slug" :error="tagsStore.errors?.slug?.find(() => true)">
      <UInput v-model="formData.slug" class="w-full" placeholder="Slug" />
    </UFormField>
    <UButton block @click="updateTag">Update</UButton>
  </UPageCard>
</template>

