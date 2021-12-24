<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }}<i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(notebook, index) in notebooks"
          :key="index"
          :command="notebook.id"
          >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";

export default {
  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: {}
    };
  },
  created() {
    Notebooks.getAll().then(res => {
          this.notebooks = res.data;
          this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) || this.notebooks[0] || {};
          return Notes.getAll({notebookId:this.curBook.id})
    }).then(res =>{
      this.notes = res.data
    })
  },
  methods: {
    handleCommand(notebookId) {
      if (notebookId != "trash") {
        Notes.getAll({ notebookId }).then(res => {
          console.log(res);
          this.notes = res.data;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/note-sidebar.less);
</style>
