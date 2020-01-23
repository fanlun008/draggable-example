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

    <div class="use-animated-test">

      <div class="box animated rollOut infinite">
        <span>9090</span>
      </div>
    </div>
    <br/><br/><br/>

    <i class="el-icon-refresh animated-test-roll" ref="animated_roll_ref"></i>

    <div>
      <el-button @click="runorstop">running/stop</el-button>
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

      runorstop() {
        let divItem = this.$refs.animated_roll_ref
        console.log('runorstop...', divItem)
        if (divItem.style['-webkit-animation-play-state'] === 'paused') {
          divItem.style['-webkit-animation-play-state'] = 'running'
        } else {
          divItem.style['-webkit-animation-play-state'] = 'paused'
        }
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

  .use-animated-test {
    width: 200px
    height 100px
    border: 1px solid red
    display flex
    justify-content center
    align-items center
  }

  .animated-test-roll {
    -webkit-animation:run 3s linear 0s infinite;

    /*&:hover {
      -webkit-animation-play-state:paused;
    }*/
  }

  @-webkit-keyframes run{
    from{
      -webkit-transform:rotate(0deg);
    }
    to{
      -webkit-transform:rotate(360deg);
    }
  }
}
</style>
