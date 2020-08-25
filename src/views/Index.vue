<template>
    <el-container class="h-full overflow-hidden">

        <!-- header -->
        <el-header class="flex items-center justify-between bg-gray-100 border-b border-gray-300 border-solid px-3">
            <div class="flex items-center">

                <!-- brand -->
                <div class="flex items-end">
                    <el-badge :value="config.version" type="success">
                        <router-link to="/" class="text-lg">
                            <div class="flex items-center">
                                <el-avatar :src="logo" :size="28" class="inline-block mr-2"></el-avatar>
                                <span class="inline-block">{{ config.name }}</span>
                            </div>
                        </router-link>
                    </el-badge>
                    <div class="text-sm ml-1">{{ config.subName }}</div>
                </div>

                <!-- menus -->
                <div class="flex items-center text-lg ">
                    <el-menu :default-active="activeMenuRoute" @select="onMenuSelect" mode="horizontal" class="ml-5 bg-gray-100">
                        <el-menu-item v-for="(menu,index) in menus" :key="index" :index="menu.route">{{ menu.name }}</el-menu-item>
                    </el-menu>
                </div>
            </div>

            <div v-if="user" class="flex items-center space-x-3">
                <router-link to="/me" class="block">
                    <el-avatar :src="user.avatar" fit="cover" shape="circle" class="block w-10 h-10 rounded-full"></el-avatar>
                </router-link>
                <router-link to="/me" class="block">
                    <div class="text-sm">{{ user.name }}</div>
                </router-link>
                <el-tooltip content="注销登录" placement="bottom">
                    <i class="el-icon-switch-button cursor-pointer font-bold text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full" @click="onLogout"></i>
                </el-tooltip>
            </div>
        </el-header>

        <!-- main -->
        <el-main class="p-0 overflow-x-hidden overflow-y-auto relative">
            <transition :name="transition">
                <router-view class="router-view"></router-view>
            </transition>
        </el-main>

    </el-container>
</template>

<script>
import config from '@/configs/app.config'
import menus from '@/configs/menus.config'
import auth from '@/utils/auth'

export default {
    name: 'Index',
    data() {
        return {
            config,
            menus,
            logo: config.logo || 'favicon.ico',
            transition: 'slide-left',
        }
    },
    computed: {
        activeMenuRoute() {
            if (this.$route.path !== '/') {
                return this.$route.path
            }
            return this.menus.find(menu => menu.active === true).route
        },
        user() {
            return this.$store.state.user
        },
    },
    methods: {
        /**
         * On menu clicked
         * @param menu
         */
        onMenuSelect(menu) {
            if (menu !== this.$route.path) {
                this.$router.push(menu)
            }
        },

        /**
         * On user logout
         */
        onLogout() {
            auth.logout()
            this.$router.push(auth.loginPage)
        }
    },
    /**
     * Set router transition name
     * @param to
     * @param from
     * @param next
     */
    beforeRouteUpdate(to, from, next) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        next()
    },
}
</script>
