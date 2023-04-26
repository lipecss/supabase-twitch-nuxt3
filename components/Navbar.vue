<template>
  <header>
    <div class="flex bg-grey-2 w-full px-8 py-2 items-center" style="min-height: 56px;">
      <div class="z-50 w-1/2 text-white">Teste twitch auth supabase</div>
      <div class="w-1/2 text-right">
        <ul class="flex flex-row-reverse items-center">
          <li v-if="isAuthenticate" class="ml-5">
            <img 
              class="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              :src="profileImg"
              alt="Bordered avatar"
            >
          </li>
          <li>
            <NuxtLink v-if="!isAuthenticate" class="font-bold uppercase text-white hover:text-black hover:cursor-pointer" to="/">
              Iniciar Sessao
            </NuxtLink>

            <button 
              v-else
              class="font-bold uppercase text-white hover:text-black hover:cursor-pointer hover:cursor-pointer"
              @click="signout"
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()

const props = defineProps({
  isAuthenticate: { type: Boolean, default: false },
  profileImg: { type: String, default: '' }
})

const signout = async () => {
  const { data, error } = await supabase.auth.signOut()

  console.log('data', data)
  await navigateTo('/')

  await supabase.auth.refreshSession()
}
</script>
