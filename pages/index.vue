<template>
  <LoginForm @eventLogin="signInWithTwitch" />
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})
const { $supabase } = useNuxtApp()
const config = useRuntimeConfig()

const signInWithTwitch = async () => {
  const { error, data } = await $supabase.auth.signInWithOAuth({
    provider: 'twitch',
    options: {
      redirectTo: `${config.public.baseUrl}/dashboard`,
      scopes: 'moderator:manage:chat_messages moderation:read channel:moderate chat:edit chat:read whispers:read user:edit:broadcast user:read:follows channel:edit:commercial channel:manage:broadcast user:read:broadcast user:read:email channel:manage:moderators'
    }
  })
}
</script>
