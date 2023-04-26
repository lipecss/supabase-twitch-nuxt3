<template>
  <div>
    <input v-model="title" type="text">

    <button class="text-purple-600" @click="updateChannel">Atualizar</button>

    <div class="text-white">
      <pre> {{ channelInfo }}</pre>
    </div>
  </div>
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

onMounted(() => {
  const { provider_token } = data.session
  const { sub } = data.session.user.user_metadata

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
  const { provider_token } = data.session
  const { sub } = data.session.user.user_metadata

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
</script>
