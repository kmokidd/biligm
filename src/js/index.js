import * as CONFIG from './config.js';

const vmid = 13822847;
let pageNum = 2;

const app = new Vue({
  el: '#app',
  data:{
    favArray: [],
    style: {
      hide: true
    }
  },
  methods: {
    getFavList: function(cb) {
      this.$http.get(CONFIG.hostBili, {params: {
        get: CONFIG.apiBili.space,
        vmid: vmid
      }}).then(response => {
        let res = response.body;
        this.favArray = res.data.favourite.item;
        console.log(this.favArray);

        cb();
      }, response => {
        console.log('ERROR: ');
        console.log(response);
      })
    },
    showFavListDetail: function(){
      // favList moved out
      // listCont comes in
    },
    playProg: function(){
      // 多 P 处理
    }
  },
  beforeCreate:function() {

  },
  created: function(){
    console.log('before create ------------');
    this.getFavList(()=>{
      this.style.hide = false;
    });
  }
})