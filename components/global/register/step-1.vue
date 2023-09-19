<template>
<div class="register-step">
    <h1 class="mb-6">Join as a Coach or Trainee
    </h1>
    <v-row class="choose-box">
        <v-col class="radio-box" @click="type=1" :class="{'active' : type == 1}">
            I`m a Coach
            <v-icon color="primary" v-if=" type == 1">mdi-check-circle</v-icon>
        </v-col>
        <v-col class="radio-box" @click="type=2" :class="{'active' : type == 2}">
            I`m a Trainee
            <v-icon color="primary" v-if=" type == 2">mdi-check-circle</v-icon>
        </v-col>
        <v-col cols="12" md="12">
            <div class="d-flex justify-center" style="padding:1rem;">
                <p style="padding-right:5px">Already have an account?</p>
                <nuxt-link to="/login"> SignIn</nuxt-link>
            </div>
        </v-col>
    </v-row>

    <v-btn block elevation="3" @click="next" large class="auth-btn" color="primary">Sign Up As A {{type == 1 ? 'Coach':'Trainee'}}</v-btn>
</div>
</template>

<script>
export default {

    data() {
        return {
            error_msg: '',
            step: '1',
            user_type: 1,
            show1: false,
            email: '',
            password: '',
            type: 1
        }
    },
    methods: {
        next() {
            this.$emit('next', {
                type: this.type
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.register-step {
    h1 {
        font-size: 1.5em;
        display: block;
    }

    .choose-box {
        margin: 4rem 0;
        margin-bottom: 2rem;
    }

    .radio-box {
        border-radius: 5px;
        border: 1px solid #d7d7d7;
        padding: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin: 0 1rem;
        transition: 300ms ease-in-out;
        position: relative;

        i {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 18px;
        }

        &:hover {

         //   border-color: $primary_color;
            transition: 300ms ease-in-out;
        }
    }

    .active {
      //  border-color: $primary_color;

    }
}

.auth-btn {
    font-size: 18px;
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 55px !important;
}
</style>
