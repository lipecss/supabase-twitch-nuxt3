<template>
  <LoginForm @eventLogin="signInWithTwitch" />
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})
const { $supabase } = useNuxtApp()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signInWithTwitch = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'twitch',
    options: {
      redirectTo: '/dashboard',
      scopes: 'moderator:manage:chat_messages moderation:read channel:moderate chat:edit chat:read whispers:read user:edit:broadcast user:read:follows channel:edit:commercial channel:manage:broadcast user:read:broadcast user:read:email channel:manage:moderators'
    }
  })

  // const { error, data } = await $supabase.auth.signInWithOAuth({
  //   provider: 'twitch',
  //   scopes: 'moderator:manage:chat_messages moderation:read channel:moderate chat:edit chat:read whispers:read user:edit:broadcast channel:edit:commercial user:read:broadcast user:read:email channel:manage:moderators'
  // })
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})

const signout = async () => {
  const { error } = await supabase.auth.signOut()

  supabase.auth.refreshSession()
}
</script>
