<template>
    <div class="login">
        <div class="login-box" v-if="islogin">
            <h1>管理后台登录系统</h1>
            <p><span>用户名</span><input type="text" autofocus="autofocus" v-model="login.loginName"></p>
            <p><span>密  码</span><input type="password" v-model="login.password"></p>
            <Button class="submit" @click="submit">登录</Button>
            <Button class="sign" @click="toSign">注册</Button>
        </div>
        <div class="login-box" v-else>
            <h1>管理后台登录系统</h1>
            <p><span>用户名</span><input type="text" v-model="sign.loginName"></p>
            <p><span>密  码</span><input type="password" v-model="sign.password"></p>
            <p><span>确认密码</span><input type="password" v-model="sign.passwordTwo"></p>
            <Button class="sign" @click="signUp">注册</Button>
            <Button class="back" @click="back">返回</Button>
        </div>
    </div>
</template>
<script>
import * as loginActions from 'app_src/actions/login';
export default {
    data(){
        return {
            islogin: true,
            login:{
                loginName: '',
                password: ''
            },
            sign: {
                loginName: '',
                password: '',
                passwordTwo: ''
            }
        }
    },
    methods:{
        submit(){
            if(this.login.loginName == ''){
                this.$Message.warning('用户名不能为空');
            }else if(this.login.password == ''){
                this.$Message.warning('密码不能为空');
            }else{
                loginActions.login({
                    loginName: this.login.loginName,
                    password: this.login.password,
                    success: res=> {
                        this.$store.dispatch('memberId',res.memberId);
                        this.$store.dispatch('userName',this.login.loginName);
                        this.$Message.success("登录成功");
                        this.$router.push({path:'/home'});
                    },
                    error: err=> {
                        this.$Message.warning('登录失败');
                    }
                })
            }
        },
        signUp(){
            if(this.sign.loginName == ''){
                this.$Message.warning('用户名不能为空');
            }else if(this.sign.password == ''){
                this.$Message.warning('密码不能为空');
            }else if(this.sign.password != this.sign.passwordTwo){
                this.$Message.warning('两次密码不同');
            }else{
                loginActions.signUp({
                    loginName: this.sign.loginName,
                    password: this.sign.password,
                    success: res =>{
                        console.log(res);
                        if(res.login){
                            this.$Message.success("注册成功")
                            this.back();
                        }
                    },
                    error: err=>{
                        this.$Message.warning("网络错误")
                    }
                })
            }
        },
        toSign(){
            this.islogin = false;
            this.login = {loginName: '',password: ''}
        },
        back(){
            this.islogin = true;
            this.sign = {loginName: '',password: '',passwordTwo:''}
        },
    },
    mounted(){
        this.$Message.config({top: 50,duration: 1});
    }
}
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-image: url('~app_assets/images/login_bg.jpg');
        background-size: 100% 100%;
        position: absolute;
        .login-box{
            width: 400px;
            background: rgba(255,255,255,0.6);
            border-radius: 5px;
            box-shadow: 2px 2px 2px 2px rgba(167, 167, 167,0.5);
            position: relative;
            margin: 0 auto;
            top: 50%;
            transform: translateY(-60%);
            padding: 15px 15px 20px 15px;
            text-align: center;
            h1{
                font-size: 18px;
                text-align: center;
            }
            p{
                margin-top: 20px;
                padding: 0 10px;
                span{
                    display: inline-block;
                    width: 70px;
                    text-align: left;
                }
                input{
                    margin-left: 5px;
                    width: 250px;
                    height: 25px;
                    border: 1px solid #f5f5f5;
                    border-radius: 3px;
                }
            }
            .submit{
                margin-top: 15px;
                margin-right: 40px;
                padding: 5px 20px 6px;
            }
            .sign{
                margin-top: 15px;
                padding: 5px 20px 6px;
            }
            .back{
                margin-left: 40px;
                margin-top: 15px;
                padding: 5px 20px 6px;
            }
        }
    }
</style>
