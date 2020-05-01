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
      skoreOAuthURI: 'https://skoreappdev.com',
      oauthClient: {
        redirect_uri: null,
        client_id: 3,
        response_type: 'code',
        scope: '*',
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
