<template>
  <div class="container">
    <h3>CH1</h3>

    <el-button @click="switchStatus">switch</el-button>
    <el-button @click="resetStatus">reset</el-button>
    <transition :name="transLR" mode="out-in">
      <div class="lef" v-if="isShow">
        {{ buttonTitle }}
      </div>
    </transition>

    <div>
      <el-button @click="clickToken">clickToken</el-button>
    </div>
  </div>
</template>

<script>
  import { createToken } from "@/api/common";

  export default {
    name: "ch1",
    data() {
      return {
        buttonTitle: 'On',
        isShow: true,
        transLR: 'moveL'
      }
    },
    methods: {
      clickToken() {
        createToken({'user': 'fanlun'}).then(res => {
          console.log(res, 'response')
        })
      },

      switchStatus() {
        this.transLR = 'moveL'
        this.isShow = !this.isShow
        setTimeout(()=>{
          this.buttonTitle = 'OFF'
          this.transLR = 'moveR'
          this.isShow = !this.isShow
        }, 500)
        setTimeout(()=> {
          this.resetStatus()
        }, 2000)
      },
      resetStatus() {
        this.transLR = 'moveL'
        this.buttonTitle = 'On'
      }
    }
  }
</script>

<style scoped lang="stylus">
.container {
  width 90%
  .lef {
    width 60px;
    height 30px;
    border 1px solid rebeccapurple
  }
  .moveR-enter-active,  .moveR-leave-active {
    transition: all 1s linear;
    transform: translateX(0);
  }
  .moveR-enter,  .moveR-leave {
    transform: translateX(100%);
    opacity: 0;
  }
  .moveR-leave-to{
    transform: translateX(100%);
    opacity: 0;
  }
  .moveL-enter-active, .moveL-leave-active {
    transition: all 1s linear;
    transform: translateX(0%);
  }
  .moveL-enter, .moveL-leave {
    transform: translateX(-100%);
  }
  .moveL-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
