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
      <input type="text" :value="code" readonly>
      <br>
      <input type="button" @click="issueToken" value="Issue token">
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'MainApp',
  data() {
    return {
      authenticated: false,
      authTokens: {}, 
      code: null
    }
  },
  mounted() {
    this.code = this.$route.query.code
    console.dir(this.$route.query.code)

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
        code: this.code,
        redirect_uri: window.location.href
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(res => {
        this.authTokens = res.data
        window.localStorage.setItem('currentAuth', res.data)
      })
    }
  }
}
</script>
