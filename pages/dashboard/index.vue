<template> 
  <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
    <div class="flex items-center p-8 bg-grey-3 shadow rounded-lg" style="border: 1px solid #53535f7a">
      <div
        class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <span class="block text-2xl text-white font-bold">{{ user.user_metadata.custom_claims.view_count }}</span>
        <span class="block text-white">Views</span>
      </div>
    </div>
  </section>

  <section>
    <h1 class="text-purple-700 text-3xl my-10">Description</h1>
    <h2 class="text-white">
      {{ user.user_metadata.custom_claims.description }}
    </h2>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})
const { $supabase } = useNuxtApp()
const user = useSupabaseUser()
// const supabase = useSupabaseClient()
// if (process.client) {
//   const user = localStorage.getItem('sb-rikpkaholmbclsrznwbk-auth-token')
const { data } = await $supabase.auth.getSession()

console.log('user', user)
</script>
