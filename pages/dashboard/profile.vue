<template>
  <div>
    <label for="title" class="font-bold">Title</label>
    <textarea
      v-model.trim="title"
      id="title"
      type="text"
      maxlength="140"
      class="mt-2 w-full resize-none h-20 bg-grey-2 border border-white text-white p-2 focus:outline-none focus:border-4 focus:border-violet-600"
      @keyup="teste"
      />
    <div class="the-count text-right">
      <span class="text-white">{{ totalTitle }}</span>
      <span class="text-white">/ 140</span>
    </div>
  </div>

  <button 
    class="disabled:opacity-25 bg-purple-600 p-2 rounded"
    :disabled="!totalTitle"
    @click="updateChannel"
    >
    Atualizar
  </button>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { $supabase } = useNuxtApp()
const { data } = await $supabase.auth.getSession()
const config = useRuntimeConfig()

let channelInfo = ref({})
let title = ref('')

const totalTitle = computed(() => {
  return title.value.length
})

onMounted(() => {
  const { provider_token } = data.session
  const { sub } = data.session.user?.user_metadata

  console.log('data.session', data.session)

  nextTick(async () => {
    const { data: channel } = await useFetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${sub}`, {
      method: 'GET',
      headers: {
        'client-id': config.public.twitchid,
        'Authorization': `Bearer ${provider_token}`
      },
    })

    channelInfo.value = channel.value.data[0]

    title.value = channel.value.data[0].title
  })
})

const updateChannel = async () => {
  const { provider_token } = data?.session
  const { sub } = data.session.user?.user_metadata

  try {
    const channel = await useFetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${sub}`, {
      method: 'PATCH',
      headers: {
        'client-id': config.public.twitchid,
        'Authorization': `Bearer ${provider_token}`
      },
      body: {
        title: title.value
      }
    })

    console.log('channel', channel)
  } catch (error) {
    console.log('e', error)
  }
}

const teste = (event) => {
  if (event.target.value.length >= 140) event.preventDefault()
}
</script>
