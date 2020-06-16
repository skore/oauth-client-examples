<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <button type="button" @click="goOAuth">
      Login using Skore
    </button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      skoreOAuthURI: process.env.SKORE_OAUTH_URL,
      oauthClient: {
        redirect_uri: process.env.SKORE_OAUTH_REDIRECT_URI || null,
        client_id: process.env.SKORE_OAUTH_CLIENT,
        response_type: process.env.SKORE_OAUTH_RESPONSE_TYPE || 'code',
        scope: process.env.SKORE_OAUTH_SCOPE || '*',
      },
    }
  },
  mounted() {
    this.oauthClient.redirect_uri = window.location.href + 'main'
    this.skoreOAuthURI = new URL(this.skoreOAuthURI + '/oauth/authorize')

    for (let key in this.oauthClient) {
      this.skoreOAuthURI.searchParams.append(key, this.oauthClient[key])
    }

    console.log(this.skoreOAuthURI.href)
  },
  methods: {
    goOAuth(e) {
      e.preventDefault()
      window.location.href = this.skoreOAuthURI
    }
  }
}
</script>
