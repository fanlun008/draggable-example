<template>
  <div class="container">

    <div class="left-container">
      <h3>CH1-left</h3>
      <el-button @click="switchStatus">switch</el-button>
      <el-button @click="resetStatus">reset</el-button>
      <transition :name="transLR" mode="out-in">
        <div class="lef" v-if="isShow">
          {{ buttonTitle }}
        </div>
      </transition>

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
      <div>
        <el-button @click="runRotate">run rotate</el-button>
      </div>


      <i @click="runRotate" class="el-icon-refresh animated-test-roll2" ref="animated_roll_ref2"></i>
    </div>
    <div class="right-container">
      <h2>CH1-right</h2>
      <transition>
        <div class="box-change-size" @click="changeBoxSize"></div>
      </transition>
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
        transLR: 'moveL',
        Intervaller: {}
      }
    },
    methods: {
      changeBoxSize() {
        this.$message.success('change...')
      },

      runRotate() {

        let iconItem = this.$refs.animated_roll_ref2
        iconItem.style['-webkit-animation-play-state'] = 'running'
        setTimeout(() => {
          iconItem.style['-webkit-animation-play-state'] = 'paused'
        }, 1000)
      },

      stopRotateWhenCreated() {
        let iconItem = this.$refs.animated_roll_ref2
        iconItem.style['-webkit-animation-play-state'] = 'paused'
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
        setTimeout(()=> {
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
    },

    mounted() {
      this.stopRotateWhenCreated()
    }
  }
</script>

<style scoped lang="stylus">
.container {
  width 90%
  display flex
  flex-direction row
  justify-content space-around
  .right-container {
    .box-change-size {
      width 200px
      height: 200px
      background-color red
      transition: all 0.6s
      &:hover {
        transform: rotate(-180deg) scale(1.4)
      }
    }

  }
  .left-container {
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

    .animated-test-roll2 {
      cursor pointer
      -webkit-animation:run 1s linear 0s infinite

      &:hover {
        color red
        font-size: 16px
      }
    }

    @-webkit-keyframes run{
      from{
        -webkit-transform:rotate(0deg);
      }
      to{
        -webkit-transform:rotate(-360deg);
      }
    }
  }

}
</style>
