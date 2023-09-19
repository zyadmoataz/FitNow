<template>
<div class="login_form">
    <h1>Sign In </h1>
    <p>Please sign-In to your account and start the adventure</p>
    <v-form ref="form" lazy-validation class="form">
        <v-container class="pt-4 pb-4">
            <v-row class="form-container">
                <v-col cols="12" md="12">
                    <v-alert v-if="error_msg.length > 0" type="error">{{error_msg}}</v-alert>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="email" placeholder="john@mail.info" label="Email" outlined :rules="[v => !!v || 'E-mail is required',v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'" label="Password" placeholder="your password" :rules="[v => !!v || 'This filed is required']" outlined></v-text-field>
                </v-col>

                <v-col cols="12" md="12" class="mb-2 d-flex justify-end">
                    <nuxt-link to="/forgetpass"> ForgetPassword?</nuxt-link>
                </v-col>
                <v-col cols="12" md="12" class="mb-4 mt-4">
                    <v-btn block elevation="3" @click="userLogin" class="auth-btn" large color="primary">Sign In</v-btn>
                </v-col>
                <v-col cols="12" md="12">
                    <div class="d-flex justify-center" style="padding:1rem;">
                        <p style="padding-right:5px">Don`t have an account?</p>
                        <nuxt-link to="/register"> SignUp</nuxt-link>
                    </div>
                </v-col>
                <v-col cols="12" md="12" style="margin-top: -24px;">
                    <div class="d-flex justify-center" style="padding:1rem;">
                        <div class="hr"><span>OR</span></div>
                    </div>
                    <div class="d-flex justify-center login_social" style="padding:1rem;">
                        <img src="~/assets/img/icons/facebook.svg">
                        <img src="~/assets/img/icons/google.svg">
                    </div>
                </v-col>

            </v-row>
        </v-container>
    </v-form>
</div>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            show1: false,
            email: '',
            password: '',
            myloading: null,
            error_msg: "",
        }
    },
    methods: {
        async userLogin() {
            var mypage = this;
            if (this.$refs.form.validate()) {
                const myloader = this.myloading = this.$vs.loading({
                    color: '#34BE82'
                });
                var data = {
                    email: this.email,
                    password: this.password
                };
                await this.$axios.post('/login', data).then((response) => {
                   // this.$auth.$storage.setUniversal('user', response.data.data)
                  //  this.$auth.strategy.token.set(response.data.data.access_token)
                   // this.$auth.setUser(response.data);
                    this.$axios.setToken(response.data.data.access_token, 'Bearer');
                    localStorage.setItem("user", JSON.stringify(response.data.data))
                    this.$store.commit('authStore/userData', response.data.data.user)

                    myloader.close();
                    console.log(response.data.data)
                    if (response.data.data.user.type == "1") {
                        this.$router.push('/coach/jobsFeed/')
                    } else {
                        this.$router.push('/client/')
                    }
                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        mypage.error_msg = error.response.data.errors[0];
                    } else {
                        mypage.error_msg = error.response.data.message;
                    }
                    myloader.close();
                });

            }
        },
        openLoading() {
            this.myloading = this.$vs.loading({
                target: this.$refs.form,
                color: '#34BE82'
            })
        },
    },
    mounted() {
       // console.log(this.$auth)
//console.log(this.$auth.$storage.getUniversal('user'))
    }
}
</script>

<style lang="scss" scoped>
.login_form {

    a {
        text-decoration: none;
    }

    .login_social {
        img {
            padding: 0 10px;

        }
    }

    .auth-btn {
        font-size: 18px;
        font-weight: 600;
        padding-top: 1rem;
        padding-bottom: 1rem;
        height: 55px !important;
    }

    .hr {
        background: #D2D2D2;
        height: 3px;
        width: 100%;
        display: block;
        position: relative;

        span {
            background: #fff;
            display: inline-block;
            position: absolute;
            top: -11px;
            padding: 0 6px;
            left: 46%;
        }
    }

    label {
        text-align: left;
        display: block;
        margin-bottom: 8px;
    }

    .form-container {
        .col-12 {
            padding-top: 0;
            padding-bottom: 0;
        }
    }
}
</style>
