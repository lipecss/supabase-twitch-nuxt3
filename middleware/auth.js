export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  let token = null

  client.auth.onAuthStateChange(async (event, session) => {
    console.log('event', event)
    if(process.client) {
      console.log('aaa')
      token = JSON.parse(localStorage.getItem(Object.keys(localStorage).find(key => key.includes('sb-') && key.includes('auth-token')))).provider_token
      await validToken(token, session.provider_refresh_token, config.public.twitchid, config.public.twitchClientSecret, client)
    }

    if (event == 'TOKEN_REFRESHED') {
      console.log('refresh', token)
    }
  })
  

  if (!user.value) {
    return navigateTo('/')
  }
})

const validToken = async (token, refresh_token, client_id, client_secret, client) => {
  try {
    const response = await useFetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${token}`
      }
    })

    // const tokenKey = Object.keys(localStorage).find(key => key.includes('sb-') && key.includes('auth-token'))
    // const dataStorage = JSON.parse(localStorage.getItem(tokenKey))

    // // renovar o token e tentar novamente a chamada              
    // const newToken = await refreshAccessToken(refresh_token, client_id, client_secret) 
               
    // dataStorage.provider_token = newToken.data.value.access_token
    // dataStorage.expires_in = newToken.data.value.expires_in

    // // const { data, error } = client.auth.setSession({
    // //   provider_token: newToken.data.value.access_token
    // // })

    // // console.log('data', data)
    // // console.log('error', error)

    // localStorage.setItem(tokenKey, JSON.stringify(dataStorage))
  
    return response
  } catch (error) {
    console.log('error', error)
    if (error.response && error.response.status === 401) {
      const tokenKey = Object.keys(localStorage).find(key => key.includes('sb-') && key.includes('auth-token'))
      const dataStorage = JSON.parse(localStorage.getItem(tokenKey))
  
      // renovar o token e tentar novamente a chamada              
      const newToken = await refreshAccessToken(refresh_token, client_id, client_secret) 
                 
      dataStorage.provider_token = newToken.data.value.access_token
      dataStorage.expires_in = newToken.data.value.expires_in
  
      client.auth.setSession({
        provider_token: newToken.data.value.access_token
      })

      return localStorage.setItem(tokenKey, JSON.stringify(dataStorage))
    } else {
      throw error
    }
  }

}

const refreshAccessToken = async (refresh_token, client_id, client_secret) => {
  const qs = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id,
    client_secret
  });

  try {
    const response = await useFetch(`https://id.twitch.tv/oauth2/token?${qs}`, {
      method: 'POST'
    })

    return response
  } catch (error) {
    throw error
  }
}
