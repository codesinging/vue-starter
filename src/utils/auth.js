import Vue from 'vue'
import store from '../store'
import config from '../configs/auth.config'

const TOKEN = 'token'
const USER = 'user'

const TAG = '===auth==='

/**
 * Check whether user has authenticated
 * @returns {boolean}
 */
const check = () => {
    if (store.state.token != null && store.state.user != null) {
        return true
    }

    // Get token and user from local storage
    const token = Vue.ls.get(TOKEN)
    const user = Vue.ls.get(USER)

    if (token != null && user != null) {
        store.commit(TOKEN, token)
        store.commit(USER, user)

        console.log(TAG, 'User authenticated from local storage')
        return true
    }

    return false
}

/**
 * Set authenticated user and token
 * @param user
 * @param token
 */
const login = (user, token) => {
    if (user) {
        store.commit(USER, user)
        Vue.ls.set(USER, user, config.expire)

        console.log(TAG, 'User authenticated')
    }
    if (token) {
        store.commit(TOKEN, token)
        Vue.ls.set(TOKEN, token, config.expire)

        console.log(TAG, 'Token authenticated')
    }
}

/**
 * User logout and remove authenticate user and token
 */
const logout = () => {
    store.commit(TOKEN, null)
    store.commit(USER, null)

    Vue.ls.remove(TOKEN)
    Vue.ls.remove(USER)

    console.log(TAG, 'Authenticated user logout')
}

/**
 * Get authenticated token
 * @returns {string}
 */
const token = () => {
    return store.state.token
}

/**
 * Get authenticated user
 * @returns {Object}
 */
const user = () => {
    return store.state.user
}

/**
 * Update authenticated user and token
 * @param user
 * @param token
 */
const update = (user, token) => {
    user = Object.assign(store.state.user, user)
    login(user, token)
}

/**
 * Get authenticated user's config
 * @param key
 * @param def
 * @returns {*}
 */
const get = (key, def) => {
    let user = store.state.user
    return user[key] === undefined ? def : user[key]
}

export default {
    check, login, logout, token, user, update, get, loginPage: config.loginPage
}
