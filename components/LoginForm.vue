<template>
  <div class="mx-auto flex items-center justify-center bg-black" style="min-height: 70vh;">
    <div>
      <p class="text-center text-md text-gray-400 font-light">Sign in with</p>
      <div>
        <div class="flex items-center justify-center space-x-4 mt-3">
          <button
            class="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            @click="emitEventLogin"
          >
            <ClientOnly >
              <font-awesome-icon class="mr-3" :icon="['fab', 'twitch']" size="lg" />
            </ClientOnly>
            Twitch
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['eventLogin'])

const emitEventLogin = () => {
  emit('eventLogin')
}
</script>
