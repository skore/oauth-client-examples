<template>
  <div class="main">
    <div v-if="authenticated">
      <h3>Congrats! You are authenticated!</h3>
      <br>
      <div style="text-align: left">
        <h4>Last request JSON response:</h4>
        <vue-json-pretty :deep="3" :highlightMouseoverNode="true" :data="recentRequestContent"></vue-json-pretty>
      </div>
      <hr>
      <input type="text" v-model="workspaceSlug" placeholder="Enter the workspace slug">
      <input type="button" @click="listProcesses" value="List processes">
      <br><br>
      <input type="button" @click="refreshToken" value="Manually refresh token">
      <input type="button" @click="logout" value="Logout">
    </div>
    <div v-else>
      <h3>Here is your auth code:</h3>
      <br>
      <input type="text" :value="code" readonly>
      <input type="button" @click="issueToken" value="Issue token">
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
 
export default {
  name: 'MainApp',

  components: {
    VueJsonPretty
  },

  data() {
    return {
      workspaceSlug: '',
      recentRequestContent: {},
      authenticated: false,
      code: null,
      scopes: [],
    }
  },

  mounted() {
    this.code = this.$route.query.code
    const auth = JSON.parse(window.localStorage.getItem('currentAuth'))

    if (auth) {
      this.authenticated = true
      this.recentRequestContent = auth
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
        redirect_uri: window.location.href.split('?')[0],
        // scope: this.scopes.join(',')
      }).then(res => {
        this.recentRequestContent = res.data
        window.localStorage.setItem('currentAuth', JSON.stringify(res.data))
        this.authenticated = true
        location.reload()
      })
    },

    refreshToken() {
      // 
    },
    
    logout() {
      this.authenticated = false
      window.localStorage.clear()
      this.$router.push('/')
    },

    listProcesses() {
      if (! this.workspaceSlug) {
        return;
      }

      this.$http.get(`api/workspaces/${this.workspaceSlug}/processes`).then(res => {
        this.recentRequestContent = res.data
      });
    }
  }
}
</script>
