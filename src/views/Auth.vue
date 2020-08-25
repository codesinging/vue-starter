<template>
    <div class="h-full flex items-center justify-center">
        <el-card class="card-medium">
            <div slot="header" class="text-center">用户登录</div>
            <el-form :disabled="$store.state.statuses.loading">
                <el-form-item>
                    <el-input v-model="item.mobile">
                        <template slot="prepend">手机号码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="item.password" show-password>
                        <template slot="prepend">登录密码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" :loading="$store.state.statuses.loading" @click="onLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
    name: "Auth",
    data() {
        return {
            item: {
                mobile: process.env.VUE_APP_USER_MOBILE,
                password: process.env.VUE_APP_USER_PASSWORD,
            }
        }
    },
    methods: {
        onLogin() {
            setTimeout(() => {
                auth.login(
                    {
                        name: '管理员'
                    },
                    'token'
                )
                this.$router.replace('/')
            }, 1000)
        }
    }
}
</script>

<style scoped>

</style>
