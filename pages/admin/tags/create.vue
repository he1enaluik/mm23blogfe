<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const router = useRouter();

const formData = ref({
  name: '',
  slug: '',
});

async function createTag() {
  await tagsStore.createTag(formData.value);
  if (!tagsStore.errors) {
    router.push('/admin/tags');
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Create Tag">
    <UFormField label="Name" :error="tagsStore.errors?.name?.find(() => true)">
      <UInput v-model="formData.name" class="w-full" placeholder="Name" />
    </UFormField>
    <UFormField label="Slug" :error="tagsStore.errors?.slug?.find(() => true)">
      <UInput v-model="formData.slug" class="w-full" placeholder="Slug" />
    </UFormField>
    <UButton block @click="createTag">Create</UButton>
  </UPageCard>
</template>

