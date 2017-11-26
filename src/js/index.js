import * as CONFIG from './config.js';
import * as UTILS from './utils.js';

const vmid = CONFIG.VMID;
let DP = {};

let curPageNum = 2,
    pageCount = 1;

let scTranslateX = 0;

const app = new Vue({
  el: '#app',
  data:{
    favArray: [],
    favItemsArray: [],
    style: {
      hide: true,
      isInSub: false,
      contTranslateX: 'translateX(' + scTranslateX + 'vw)'
    }
  },
  computed: {
    dealFavArray: function(){
      let newFavArrah = this.favArray;
      newFavArrah.forEach(fa => {
        fa.ctime = UTILS.formatDate(fa.ctime);
      })
      return newFavArrah;
    },
    dealFavItemsArray: function(){
      let newFavItemsArray = [];
      this.favItemsArray.forEach(fi => {
        if(parseInt(fi.state) >= 0){
          fi.duration = UTILS.formatHour(fi.duration);
          fi.pubdate = UTILS.formatDate(fi.pubdate);
          newFavItemsArray.push(fi);
        }
      });
      return newFavItemsArray;
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

        cb();
      }, response => {
        console.log('ERROR: ');
        console.log(response);
      })
    },
    showFavItem: function(fid){
      // favList moved out
      // listCont comes in
      window.scrollTo(0,0);
      scTranslateX = -100;
      this.style.isInSub = true;
      this.style.contTranslateX = 'translateX(' + scTranslateX + 'vw)';
      this.style.hide = true;

      console.log('u clicked on: ' + fid);
      this.$http.get(CONFIG.hostBili, {params: {
        get: CONFIG.apiBili.favlist,
        fid: fid,
        vmid: vmid,
        page: 1 + 1
      }}).then(response => {
        let res = response.data.data;
        curPageNum = res.page;
        pageCount = res.pageCount;

        this.favItemsArray = res.archives;

        console.log(this.favItemsArray);
        this.style.hide = false;
      }, response => {
        console.log('ERROR: ');
        console.log(response);
      })
    },
    getNextPage: function(){

    },
    playProg: function(aid){
      // 多 P 处理
      let dp = new DPlayer({
        container: document.querySelector('#video-wrapper'),
        screenshot: true,
        video: {
          url: CONFIG.hostPlayer + aid
        },
        danmaku: {
          addition: ['https://api.prprpr.me/dplayer/bilibili?aid='+aid]
        }
      });
      dp.play();
    }
  },
  created: function(){
    console.log('created ------------');
    this.getFavList(()=>{
      this.style.hide = false;
    });
  }
})