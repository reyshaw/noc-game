<template>
  <section class="prompt-wrapper">
    <div class="top">
      <span>{{this.title}}</span>
    </div>
    <div class="bottom">
      <article>
        <slot name="base-query"></slot>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'warm_prompt',
  props: {
    title: {
      type: String,
      default: '筛选查询'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  section {
    border: 1px solid #cbd1e3;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 3px;
    overflow: hidden;
    height: 100%;
    padding: 25px;
    padding-left: 40px;
    .top{
      span{
        font-size: 18px;
        font-weight: 700;
        display: inline-block;
        margin-bottom: 10px;
      }
    }
    .bottom{
      ul{
        list-style-type: unset;
        li{
          color: #666;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }

</style>
