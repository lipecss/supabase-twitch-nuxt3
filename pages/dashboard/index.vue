<template> 
  <section class="flex content-center items-center w-full justify-center">
    <nuxt-link :to="twitchUrl" target="_blank">
      <img 
        :src="avatarUrl"
        alt="avatar"
        title="avatar"
        class="shadow-lg rounded-full max-w-full h-auto align-middle border-none mb-6"
      >
    </nuxt-link>
  </section>

  <section class="bg-grey-2 p-8">
    <h1 class="text-white text-2xl mb-6 font-bold">About you channel</h1>
    <h2 class="text-white">
      {{ channelDescription }}
    </h2>
  </section>

  <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
    <div class="flex items-center p-8 bg-grey-3 shadow rounded-lg" style="border: 1px solid #53535f7a">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <span class="block text-2xl text-white font-bold">{{ channelViewers }}</span>
        <span class="block text-white">Views</span>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const user = useSupabaseUser()

const avatarUrl = computed(() => {
  return user.value ? user.value.user_metadata.avatar_url : ''
})

const twitchUrl = computed(() => {
  return user.value ? `https://www.twitch.tv/${user.value.user_metadata.name}` : ''
})

const channelDescription = computed(() => {
  return user.value ? user.value.user_metadata.custom_claims.description : ''
})

const channelViewers = computed(() => {
  return user.value ? user.value.user_metadata.custom_claims.view_count : ''
})
</script>
