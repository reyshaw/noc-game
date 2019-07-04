<template>
  <div class="licenceWrapper">
    <el-row>
      <el-col :span="7"><span class="diaTitle">牌照展示</span></el-col>
      <el-col :offset="16" :span="1"><i class="el-icon-close" @click="$emit('close')"></i></el-col>
    </el-row>
    <el-row :gutter="10">
     <el-col :span="10">
       <img style="width: 100%" src="@/assets/imgs/u295.png" alt="经营牌照">
     </el-col>
     <el-col :span="14">
       <div class="runRight">
         <div class="logo">
           <img src="@/assets/imgs/u296.png" alt="经营牌照">
         </div>
         <div class="title">
           东方游戏持有菲律宾(PAGCOR)合法博彩执照
         </div>
         <div class="content">
           东方游戏运营牌照由菲律宾娱乐及博彩公司(PAGCOR)所核发的001牌照并受该机构的监管，以便提供网上投注服务。菲律宾娱乐及博彩公司(PAGCOR)是菲律宾共和国总统办公室100%由政府拥有和控制的公司，菲律宾娱乐及博彩公司（PAGCOR）是一家拥有合法经营权的公司。
         </div>
         <div class="about">
           关于(PAGCOR):<br>

           地址:1330 PAGCOR HouseRoxas Boulevard Ermita, Manila, Philippines 1000 <br>

           联系电话:(63) 2-521-1542<br>

           邮箱:GLDD@pagcor.ph<br>

           如欲查阅更多关于菲律宾娱乐及博彩公司（PAGCOR）的资讯，进入菲律宾（PAGCOR）官网:www.pagcor.ph
         </div>
       </div>
     </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'show_licence',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.licenceWrapper {
   padding: 0 10px;
   padding-bottom: 10px;
  .diaTitle, .el-icon-close{
    font-size: 16px;
  }
  .el-icon-close{
    cursor: pointer;
  }
  .runRight{
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
    line-height: 34px;
    .logo{
      img{
        width: 160px;
      }
    }
    .title{
      font-size: 18px;
      font-weight: 700;
    }
    .content{
      font-size: 14px;
    }
    .about{
      font-size: 14px;
      color: #999;
    }
  }
 }
</style>
