import Vue from 'vue'

import {timeStr, dateFormat} from './datetime'

Vue.filter('timeStr', timeStr)
Vue.filter('dateFormat', dateFormat)
