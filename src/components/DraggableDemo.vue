<template>

  <div class="container">
    <h1>draggableDemo</h1>
    <el-row :span="24">
      <div class="rowDiv">
        <el-card :body-style="cardStyle">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </el-row>
    <draggable v-model="list" tag="div" v-bind="dragOptions" :move="onMove" @start="isDragging=true"
               @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
        <el-row :span="24" v-for="item of list" :key="item.order">
          <div class="rowDiv">
            <el-card :body-style="cardStyle">
              <div v-for="o in 1" :key="o" class="text item">
                {{'列表内容 ' + item.name + o }}
              </div>
            </el-card>
          </div>
        </el-row>
      </transition-group>

    </draggable>

  </div>
</template>

<script>
  import draggable from "vuedraggable";

  const message = [
    "vue.draggable",
    "draggable",
    "component",
    "for",
    "vue.js 2.0",
    "based",
    "on",
    "Sortablejs"
  ];

  export default {
    name: "DraggableDemo",
    components: {
      draggable
    },
    data() {
      return {
        cardStyle: {'padding': '10px 20px', 'margin': '0px 0'},
        list: message.map((item, index) => {
          return {name: item + ' ' + this.generateUUID(), order: index + 1, fixed: false}
        }),
        isDragging: false
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          ghostClass: "ghost"
        }
      }
    },
    methods: {
      onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },
      generateUUID() {
        let d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }
    }

  }
</script>

<style scoped lang="stylus">
  .container
    margin 0 auto
    width: 90%

    .flip-list-move
      transition: transform 0.5s;

    .no-move
      transition: transform 0s;

    .rowDiv
      margin 10px 0

    .el-card, .el-message
      border-radius 10px

    h1
      text-align center

    .text
      font-size: 14px;

    .item
      padding: 18px 0;

</style>
