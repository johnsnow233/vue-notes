<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note" title="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>
      <router-link to="/notebooks" title="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/trash" title="回收站"
        ><i class="iconfont icon-trash"></i
      ></router-link>
    </div>
    <div class="logout" >
      <i class="iconfont icon-logout" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import avatar from "@/components/Avatar";
import AUTH from '@/apis/auth';


export default {
  components: {
    avatar
  },
  methods:{
    logout(){
      AUTH.logout().then(data=>{
        console.log(data)
      })
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;
}
.icons {
  margin-top: 15px;

  .icons a {
    padding: 6px 0;
    display: block;
  }
  a {
    padding: 6px 0;
    display: block;
  }

  .icons .router-link-active {
    background-color: #5e6266;
  }
  .router-link-active {
    background-color: #5e6266;
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}

.logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }

</style>
