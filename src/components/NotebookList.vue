<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"
        ><i class="iconfont icon-plus"></i>新建笔记本</a
      >
    </header>
    <main>
      <div class="layout">
        <h3>笔记本({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" to='notebook/1' class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="data">3天前</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AUTH from "@/apis/auth";
import Notebooks from "@/apis/notebooks";

export default {
  data() {
    return {
      notebooks:[]
    };
  },
  created() {
    AUTH.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    Notebooks.getAll().then(res=>{
      this.notebooks = res.data
    })
    });
  },
  methods: {
    onCreate() {
      let title = window.prompt('创建笔记本')
      if(title.trim() === ''){
        alert('标题不能为空')
        return
      }
      Notebooks.addNotebooks({title})
        .then(res => {
          alert(res.msg)
          this.notebooks.unshift(res.data)
        })
    },
    onEdit(notebook) {
      let title = window.prompt('修改笔记本', notebook.title)
      Notebooks.updateNotebooks(notebook.id, {title})
        .then(res =>{
          console.log(res)
          notebook.title = title
        })
    },
    onDelete(notebook) {
      console.log(notebook)
      let isConfirm = window.confirm('你确定要删除吗')
      if(isConfirm){
        Notebooks.deleteNotebooks(notebook.id)
          .then(res =>{
            console.log(res)
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
          })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/notebook-list.less);
</style>
