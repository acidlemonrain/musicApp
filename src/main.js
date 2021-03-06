import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

 
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faDrum } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import {  faDiceOne} from '@fortawesome/free-solid-svg-icons'
import {  faSpinner} from '@fortawesome/free-solid-svg-icons'
import {  faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {  faCaretUp} from '@fortawesome/free-solid-svg-icons'
import {  faPlus} from '@fortawesome/free-solid-svg-icons'
import {  faVideo} from '@fortawesome/free-solid-svg-icons'
import {  faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {  faThumbsUp} from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp,faArrowsAlt,faVideo,faPlus,faCaretUp,faCaretDown,faSpinner,faDiceOne,faListOl,faRandom,faArrowRight,faArrowCircleUp,faSearch,faPlayCircle,faPauseCircle,faBars,faArrowCircleLeft,faArrowCircleRight,faFire,faDrum,faMusic,faUser,faUserCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
export const EventBus = new Vue();
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
