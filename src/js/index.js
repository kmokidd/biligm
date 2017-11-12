import * as CONFIG from './config.js';

const vmid = 13822847;

const app = new Vue({
  el: '#app',
  data:{
    favArray: []
  },
  methods: {
    getSpace: function() {
      this.$http.get(CONFIG.hostBili, {params: {
        get: CONFIG.apiBili.space,
        vmid: vmid
      }}).then(response => {
        let res = response.body;
        this.favArray = res.data.favourite.item;

        console.log(this.favArray);
      }, response => {
        console.log('ERROR: ');
        console.log(response);
      })
    }
  },
  created: function(){
    console.log('before create ------------');
    this.getSpace();
  }
})