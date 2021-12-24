<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar'
import AUTH from '@/apis/auth'
export default {
  name: 'Login',
  components:{
    NoteSidebar
  },
  data () {
    return {
      msg: '笔记详情页'
    }
  },
  created(){
    AUTH.getInfo()
      .then(res =>{
        if(!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style scoped>
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>