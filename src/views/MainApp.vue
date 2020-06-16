<template>
  <div class="main">
    <div v-if="authenticated">
      <h3>Congrats! You are authenticated!</h3>
      <br>
      <textarea cols="30" rows="10" v-model="authTokens"></textarea>
    </div>
    <div v-else>
      <h3>Here is your auth code:</h3>
      <br>
      <input type="text" v-model="authCode" readonly>
      <br>
      <input type="button" @click="issueToken" value="Issue token">
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'MainApp',
  props: ['code', 'session'],
  data() {
    return {
      authenticated: false,
      authTokens: {}, 
      authCode: this.code
    }
  },
  mounted() {
    console.dir(this.code)

    if (window.localStorage.getItem('currentAuth')) {
      this.authenticated = true
    }
  },
  methods: {
    issueToken() {
      window.localStorage.clear()

      this.$http.post('oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
        code: this.authCode,
        redirect_uri: window.location.href
      }).then(res => {
        this.authTokens = res.data
        window.localStorage.setItem('currentAuth', res.data)
      })
    }
  }
}
</script>
