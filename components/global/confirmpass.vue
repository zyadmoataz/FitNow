<template>
<div class="confirmpass_form">
    <h1>FORGET PASSWORD</h1>
    <p>Reset your password</p>
    <form>
        <v-container>
            <v-row class="form-container">

                 <v-col cols="12" md="12">
                    <label>Password</label>
                    <v-text-field :type="show1 ? 'text' : 'password'" v-model="createPass" placeholder="Create new password" outlined></v-text-field>
                </v-col>

                 <v-col cols="12" md="12">
                    <label>Confirm Password</label>
                    <v-text-field :type="show1 ? 'text' : 'password'" v-model="confirmPass" placeholder="Confirm new password" outlined></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                    <v-btn block elevation="3" large color="primary" to="/login">Reset</v-btn>
                </v-col>

                <v-col cols="12" md="12">
                    <div class="d-flex justify-center" style="padding:1rem;">
                        <p style="padding-right:5px">Don`t` have an account?</p>
                        <nuxt-link to="/login"> SignIn</nuxt-link>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            user_type: 1
        }
    }
}
</script>

<style lang="scss" scoped>
.confirmpass_form {
    background-color: #fff;
    width: 80%;
    padding: 1rem 1.5rem;
    margin: 0 auto;
    margin-top: 50px;
    border-radius: 10px;

    h1 {
        text-transform: uppercase;
    }
    .login_social{
        img{
            padding:0 10px;
        }
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
