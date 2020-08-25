import Vue from 'vue'

const Message = Vue.prototype.$message

// Show error message
Vue.prototype.$error = (message) => {
    Message({
        message,
        type: 'error',
        showClose: true
    })
}

// Show success message
Vue.prototype.$success = (message) => {
    Message({
        message,
        type: 'success',
        showClose: true
    })
}

// Show info message
Vue.prototype.$info = (message) => {
    Message({
        message,
        type: 'info',
        showClose: true
    })
}

// Show warning message
Vue.prototype.$warning = (message) => {
    Message({
        message,
        type: 'warning',
        showClose: true
    })
}
