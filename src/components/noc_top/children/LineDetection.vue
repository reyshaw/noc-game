<template>
  <div class="lineWrapper">
    <el-row>
      <el-col :span="7"><span class="diaTitle">线路检测</span></el-col>
      <el-col :offset="16" :span="1"><i class="el-icon-close" @click="$emit('close')"></i></el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-row v-for="(item, index) in lines" :key="index" :gutter="14">
          <el-col :span="10"><div class="textContent">{{item.url}}</div></el-col>
          <el-col :span="1"><div class="arrow"><i class="el-icon-caret-right"></i></div></el-col>
          <el-col :span="4"><div class="textContent"><span :class="{spotRed:item.ping>30,spotGreen:item.ping<30,spot: true}"></span>{{item.ping}}</div></el-col>
          <el-col :span="1"> </el-col>
          <el-col :span="8"><el-button type="primary" class="goUrl">前往网址</el-button></el-col>
        </el-row>
        <el-row>
         <el-col :span="24"><el-button type="success" style="width: 96%"><i class="el-icon-refresh" style="font-size: 20px"></i></el-button></el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="reminder">
          <div class="title">
            温馨提示
          </div>
          <div class="content">
            <ul>
              <li>1.ms数据越小，标识所需载入越少，代表执行网页的速度就会越快！</li>
              <li>2.如果出现视频卡可情况，请切换其他线路看看，请在您的游戏页面选择一个新的线路使用！</li>
            </ul>
          </div>
          <div class="footer">
            建议使用最小ms的线路，同时请您按Ctrl+D收藏该线路方便您后续使用！
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'line_detection',
  data () {
    return {
      lines: [
        {url: 'www.og001orientserver.com', ping: 26},
        {url: 'www.og002orientserver.com', ping: 12},
        {url: 'www.og003orientserver.com', ping: 132},
        {url: 'www.og004orientserver.com', ping: 23},
        {url: 'www.og005orientserver.com', ping: 13}
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.lineWrapper{
  padding:0 10px;
  padding-bottom: 10px;
  .diaTitle, .el-icon-close{
    font-size: 16px;
  }
  .el-icon-close{
    cursor: pointer;
  }
  .el-row {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col-offset-16{
    text-align: right;
  }
  .arrow{
    .el-icon-caret-right{
      transform: translate(-5px,4px);
      font-size: 24px;
    }
  }
  .goUrl{
    width: 100%;
    line-height: 16px;
    transform: translate(0,-2px);
  }
  .textContent{
    background-color: #f3f3f3;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    line-height: 45px;
    position: relative;
    .spot{
      position: absolute;
      left: 10px;
      top: 18px;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
    .spotRed{
      background-color: red;
    }
    .spotGreen{
      background-color: #3cff00;
    }
  }
  .reminder{
    line-height: 30px;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 20px;
    .title{
      font-size: 20px;
    }
    .content{
      color: #999;
      ul{
        li{
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
    .footer{
      margin-top: 15px;
      font-size: 14px;
    }
  }
}
</style>
