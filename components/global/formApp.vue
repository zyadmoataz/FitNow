<template>
<div class="formApp">
    <h1>form application</h1>
    <form class="form">
        <v-container class="pt-4 pb-4">
            <v-row class="form-container">


                <v-col cols="12" md="6">
                        <div class="media-aside  ">
                            <img :src="url"
                            style="width: 90px; height:90px;" alt="avater">
                        </div>

                </v-col>



                <v-col cols="12" md="6">
                   <div class="media-body ali" >
                          <v-file-input

                            label="your picture"
                            outlined
                            @change="Preview_image"
                            v-model="image"

                        >
                        </v-file-input>

                        </div>

                </v-col>





                <v-col cols="12" md="12">
                    <div>
                      <div class="mb-6"><!--Active picker: <code>{{ activePicker || 'null' }}</code>--></div>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Birthday date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          :active-picker.sync="activePicker"
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>

                </v-col>

                <v-col cols="12" md="12">
                    <label>gender</label>
                    <v-radio-group v-model="user_type" row>
                        <v-radio label="Male" :value="1"></v-radio>
                        <v-radio label="Female" :value="2"></v-radio>
                    </v-radio-group>
                </v-col>


                <v-col cols="12" md="12">
                    <v-btn block elevation="3" large color="primary" to="/login">send</v-btn>
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
      user_type: 1,
      url: "../../assets/img/blank-profile-picture-973460__340.webp",
      image: null,
      activePicker: null,
      date: null,
      menu: false,
    }
  },
   watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
  methods: {
    Preview_image() {
      this.url= URL.createObjectURL(this.image)
    },
     save (date) {
        this.$refs.menu.save(date)
      },
  }

}
</script>




<style lang="scss" scoped>
.formApp {
    background-color: #fff;
    width: 70%;
    padding: 1rem 1.5rem;
    margin: 1rem auto;
    border-radius: 10px;

    @media (max-width:760px) {
        width: 90%;
    }

    .form {
        margin: 2rem 0;
    }

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
    .ali
    {
      background-image: url('~/assets/img/aa.png');
    }

}
</style>
