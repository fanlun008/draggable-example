import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from '@/components/Hello'
import DraggableDemo from 'components/DraggableDemo'
import Ch1 from 'components/ch1'
import Ch2 from 'components/Ch2'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'hello'
    },
    {
      name: 'hello',
      path: '/hello',
      component: Hello,
      children: [
        {
          path: '/',
          redirect: 'ch1'
        },
        {
          path: 'ch1',
          name: 'ch1',
          component: Ch1
        },
        {
          name: 'ch2',
          path: '/hello/ch2',
          component: Ch2
        }
      ]
    },
    {
      name: 'dragDemo',
      path: '/dragDemo',
      component: DraggableDemo
    }
  ]
})
