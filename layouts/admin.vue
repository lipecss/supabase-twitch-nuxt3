<template>
  <Navbar :is-authenticate="authenticated" :profile-img="avatar" />

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-52 pt-20 bg-grey-2 -64 h-screen" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-grey-2">
      <ul class="space-y-2 font-medium">
        <li>
          <NuxtLink href="/dashboard"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="/dashboard/profile"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Profile</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 ml-52">
    <slot />
  </div>
</template>

<script setup>
let authenticated = ref(false)

const { $supabase } = useNuxtApp()
const user = useSupabaseUser()

onMounted(() => {
  checkUser()
})

onBeforeMount(() => {
  $supabase.removeAllChannels()
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
