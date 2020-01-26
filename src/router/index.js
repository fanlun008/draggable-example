import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from '@/components/Hello'
import DraggableDemo from 'components/DraggableDemo'
import Ch1 from 'components/ch1'
import Ch2 from 'components/Ch2'
import { createToken, validateToken } from "@/api/common";
import Cookies from 'js-cookie'


const VueRouter =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/ch1-flex'
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
    },
    {
      name: 'ch1-flex',
      path: '/ch1-flex',
      component: Ch1
    }
  ]
})

VueRouter.beforeEach(async (to, from, next) => {
  if (to.path === '/ch1-flex') {
    console.log('router...before.../ch1-flex...')
    /*createToken({'user': 'fanlun'}).then(res => {
      console.log(res, 'response')
      localStorage.setItem('token', res.data.token);
    })*/
    if (Cookies.get("token")) {
      console.log("get token from Cookie...", Cookies.get("token"))
      await validateToken({'token': Cookies.get("token")}).then(res => {
        console.log('validation token, result...', res)
        if (res.data.message.indexOf("expired") > 0) {
          next({'path': '/dragDemo'})
        }
      }).catch(err => {
        console.log('error...', err)
      })
      next()
    } else {
      next({'path': '/dragDemo'})
    }
  }
  next()
})


export default VueRouter
