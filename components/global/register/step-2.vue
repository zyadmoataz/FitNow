<template>
<div class="register-step">
    <h1 class="mb-6">Sign Up to {{type == 1 ? 'Find & Mange Clients' : 'Find Your Coach'}}
    </h1>
    <v-row class="reg-box">
        <v-form ref="form" lazy-validation class="form">
            <v-container class="form-container">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-alert v-if="error_msg.length > 0" type="error">{{error_msg}}</v-alert>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="full_name" label="Full Name" placeholder="Your Full Name" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="email" label="Your Email Address" placeholder="john@fitnow.com" outlined :rules="[v => !!v || 'E-mail is required',v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'" label="Create Password" placeholder="Create Password" :rules="[v => !!v || 'This filed is required']" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-autocomplete v-model="country" outlined :items="$vuetify.rtl ? $countryList_Ar() : $countryList_EN()" item-text="name" label="Country" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="12">
                        <vue-tel-input-vuetify v-model="mobile" :inputOptions="{ showDialCode: true, tabindex: 0 }" outlined clearable label="Your Mobile Number" defaultCountry="EG" :rules="[v => !!v || 'This filed is required']" />

                    </v-col>
                    <v-col cols="12" md="12">
                        <label class="d-block text-left">Gender</label>
                        <v-radio-group v-model="gender" row>
                            <v-radio label="Male" :value="1"></v-radio>
                            <v-radio label="Female" :value="2"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-btn block elevation="3" @click="next" large color="primary" class="auth-btn">Sign Up 
                        </v-btn>
                    </v-col>

              
                </v-row>
            </v-container>
        </v-form>
    </v-row>

</div>
</template>

<script>
export default {

    data() {
        return {
           
            step: '1',
            user_type: 1,
            show1: false,
            full_name: '',
            email: '',
            password: '',
            country: '',
            mobile: '',
            gender: 1
        }
    },
    props: {
        type: Number,
        error_msg:String
    },
    methods: {
        next() {
            if (this.$refs.form.validate()) {
                this.$emit('next', {
                    data: {
                        fullname: this.full_name,
                        email: this.email,
                        password: this.password,
                        country: this.country,
                        mobile: this.mobile,
                        gender: this.gender,

                    }
                });
            }
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

       //     border-color: $primary_color;
            transition: 300ms ease-in-out;
        }
    }

    .active {
     //   border-color: $primary_color;

    }
}

.auth-btn {
    font-size: 18px;
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 55px !important;
}

.login_social {

    img {
        padding: 0 10px;

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
</style>
