<template>
  <div class="home">
    <img alt="Skore logo" src="../assets/logo.png">
    <br>
    <button type="button" @click="authorize">
      Login using Skore
    </button>
    <br><br>
    <h4>Scopes (click to add):</h4>
    <input type="text" :value="oauthClient.scope">
    <input type="button" @click="oauthClient.scope = []" value="Clear">
    <br>
    <input v-for="(scope, index) in scopesAvailable" :key="index" type="button" @click="addScope(scope)" :value="scope">
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      skoreOAuthURI: process.env.VUE_APP_SKORE_URL,
      scopesAvailable: [
        "view-profile", "edit-profile", "view-workspace-content",
        "edit-workspace-content", "view-workspace-users", "edit-workspace-users",
        "view-process-revisions", "edit-process-revisions", "approve-process-revisions", "*"
      ],
      oauthClient: {
        redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI || window.location.href,
        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
        response_type: process.env.VUE_APP_OAUTH_RESPONSE_TYPE || 'code',
        scope: [],
      },
    }
  },

  mounted() {
    this.oauthClient.redirect_uri += 'main'
    this.skoreOAuthURI = new URL(this.skoreOAuthURI + 'oauth/authorize')
  },

  methods: {
    authorize() {
      this.oauthClient.scope = this.oauthClient.scope.join(' ')

      for (let key in this.oauthClient) {
        this.skoreOAuthURI.searchParams.append(key, this.oauthClient[key])
      }

      window.location.href = this.skoreOAuthURI
    },
    
    addScope(scope) {
      this.oauthClient.scope.push(scope)
    },
  }
}
</script>
