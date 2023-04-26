<template>
  <div>
    <Navbar 
      :is-authenticate="authenticated"
      :profile-img="avatar"
    />
    
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
let authenticated = ref(false)
let authListener = ref(null)

const { $supabase } = useNuxtApp()
const user = useSupabaseUser()

onMounted(() => {
  const { data } = $supabase.auth.onAuthStateChange(async (event, session) => {
    checkUser()
  })

  checkUser()   
})

onBeforeMount(() => {
  // authListener.removeChannel()
  console.log('authListener', authListener)
})

const avatar = computed(() => {
  return user.value ? user.value.user_metadata?.avatar_url : ''
})

const checkUser = async () => {
  const { data } = await $supabase.auth.getUser()

  if (data.user) authenticated.value = true 
  else authenticated.value = false
}
</script>
