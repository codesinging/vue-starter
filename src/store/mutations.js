import Vue from 'vue'

export default {

    /**
     * 设置状态值
     * @param state
     * @param statuses
     */
    status(state, statuses){
        Object.keys(statuses).forEach(key=>{
            Vue.set(state.statuses, key, statuses[key])
        })
    },

    /**
     * 设置接口 Token
     * @param state
     * @param token
     */
    token(state, token){
        state.token = token
    },

    /**
     * 设置登录用户
     * @param state
     * @param user
     */
    user(state, user){
        state.user = user
    }
}