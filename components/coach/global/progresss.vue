<template>
<div>
    <v-responsive>
        <!-- start of nav  -->
        <v-row wrap>
            <v-col cols="12" md="12" sm="12">
                <nav>
                    <v-toolbar app>
                        <v-toolbar-title>
                            <span v-if="myUser != null"> {{ myUser.trainee.fullname }}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <nuxt-link class="set" to="#">
                            <v-btn style="
                  background-color: white;
                  color: #34be82;
                  text-decoration: underline;
                " elevation="0">
                                overview
                            </v-btn>
                        </nuxt-link>
                        <nuxt-link class="set" to="/">
                            <v-btn style="background-color: white; color: #5e5873" elevation="0">
                                Payment
                            </v-btn>
                        </nuxt-link>
                        <nuxt-link class="set" to="/coach/settting-client">
                            <v-btn style="
                    background-color: white;
                    color: #5e5873;
                  " elevation="0">
                                settings
                            </v-btn>
                        </nuxt-link>
                    </v-toolbar>
                </nav>
            </v-col>
        </v-row>
        <!-- end of nav  -->
        <div class="row match-height">
            <!-- start of progress  -->
            <v-col md="8">
                <v-card style="height: 100%">
                    <v-card-title class="tp" style="padding: 0;">
                        <div class="new">Progress</div>
                    </v-card-title>
                    <clientsChart></clientsChart>
                </v-card>
            </v-col>
            <!-- end of progress  -->
            <v-col md="4" style="display: flex; flex-direction: column;">
           
                <v-col>
                    <v-card style="height: 100%;  ">
                        <v-card-title class="tp" style="padding: 0;">
                            <div class="new">Notes</div>
                        </v-card-title>
                        <div class="information" style="padding-top: 20px;">
                            <ul>
                                <li>{{ progre.noteContent }}</li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card style="height:100%; ">
                        <v-card-title class="tp" style="padding: 0;">
                            <div class="new">Goals</div>
                        </v-card-title>
                        <div class="information" style="padding-top: 20px;">
                            <ul>
                                <li>{{ progre.goal }}</li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card style="height: 100%;  ">
                        <v-card-title class="tp" style="padding: 0;">
                            <div class="new">Updates</div>
                        </v-card-title>
                        <div class="information" style="padding-top: 20px;">
                            <ul>
                                <li>{{ progre.upd }}</li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>
            </v-col>

           
          
   
      
            <!-- end of nav  -->

            <div class="row match-height">
       
                <!-- end of progress  -->

             
                <v-col md=4>
                    <v-card style="height:100%;border-raduis:20px;border-radius: 17px; 20px;padding: 10px;padding-bottom: 20px;">
                        <v-card-title class="tp">Photo</v-card-title>
                        <v-container class="pic">

                            <img :src="progre.img_1">
                            <img :src="progre.img_2">

                        </v-container>
                    </v-card>
                </v-col>
                <v-col md="3" align="center">
                    <v-card style="height:100%;border-raduis:20px;border-radius: 17px;">

                        <v-card-title class="tp">Profile <svg class="star" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 32 30.53">
                                <path id="Icon_feather-star" data-name="Icon feather-star" d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(-2 -2)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            </svg>
                            <clprofile style="font-size: 15px;" />

                        </v-card-title>

                        <div class="information" style="display:center;">

                            <div class="pro-info" style=" padding: 10px;padding-bottom: 20px;">
                                <div class="e-mail" style="display: flex; ">
                                    <svg class="mailPic" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
                                        <path id="Icon_zocial-email" data-name="Icon zocial-email" d="M.072,17.739V5.4q0-.021.058-.407L6.668,11.2.149,18.168a2,2,0,0,1-.077-.429ZM.94,4.132a.758.758,0,0,1,.328-.064H18.876a.994.994,0,0,1,.347.064l-6.557,6.236-.868.771L10.082,12.7,8.365,11.139,7.5,10.368ZM.959,19,7.536,12l2.546,2.293L12.627,12,19.2,19a.844.844,0,0,1-.328.064H1.268A.8.8,0,0,1,.959,19ZM13.5,11.2l6.519-6.214a1.41,1.41,0,0,1,.058.407V17.739a1.812,1.812,0,0,1-.058.429Z" transform="translate(-0.072 -4.068)" fill="#5e5873" />
                                    </svg>
                                    <h5 style="margin-top: 2px;">{{progre.mail}}</h5>
                                </div>
                                <div class="loc" style="display:flex">

                                    <svg class="locPic" xmlns="http://www.w3.org/2000/svg" width="20.867" height="17.898" viewBox="0 0 20.867 17.898">
                                        <path id="Icon_metro-home" data-name="Icon metro-home" d="M23.438,13.64,13,5.983,2.571,13.64V10.518L13,2.861l10.434,7.657Zm-2.608-.278v7.4H15.613V15.828H10.4V20.76H5.179v-7.4L13,7.813Z" transform="translate(-2.571 -2.861)" fill="#5e5873" />
                                    </svg>
                                    <h5 style="margin-top: 6px;">{{progre.location}}</h5>
                                </div>
                            </div>

                        </div>
                    </v-card>
                </v-col>
            </div>
        </div>
    </v-responsive>
</div>
</template>

<script>
import clprofile from "~/components/coach/global/clprofile";
import clientsChart from "@/components/coach/home/client-chart2.vue";
export default {
    components: {
        clprofile,
        clientsChart,
    },
    props: {
        client: Object
    },
    data() {
        return {
            progre: {
                id: 0,
                name: "Ben Andrew",
                noteContent: " Need program while traveling for 2 weeks.",
                injure: "arm",
                goal: "loose weight",
                upd: "Complete His Workout for today",
                mail: "Ben.124@gmail.com",
                location: "  El Nozha / Cairo / Egypt",
                img_1: require("~/assets/img/icons/before.svg"),
                img_2: require("~/assets/img/icons/after.svg"),
            },
            myUser: null
        }
    },
    mounted() {
        this.GetData();
    },
    methods: {
        GetData() {
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            this.$axios
                .get('/coach-trainees/show/' + this.$route.params.id)
                .then(response => {
                    myloader.close()
                    this.myUser = response.data.data
                    console.log(this.myUser)
                })
                .catch(error => {
                    myloader.close()
                    console.log(error)
                })
        }
    }
};
</script>

<style>
  .v-tabs {
    margin-left: 400px;
  }
  .tp {
    background-color: white;
    color: #34be82;
    font-weight: 800;
    font-size: 70px;
  }
  .card {
    padding: 20px;
  }
  .information {
    background-color: white;
    color: var(#5e5873);
  }
  .op {
    margin-left: auto;
  }
  .message {
    margin-left: 20px;
  }
  .document {
    margin-left: 40px;
  }
  .mailPic,
  .locPic {
    margin: 5px;
  }
  .trainCard {
    width: 130px;
    height: 100px;
    color: var(#34be82);
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    margin: 0 1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #34be82;
    font-family: cursive;
    font-size: small;
  }
  .days {
    font: bold;
    font-size: medium;
    font-family: cursive;
  }
  li {
    color: #5e5873;
    font-size: 15px;
  }
  .pic {
    display: inline-flex;
    justify-content: space-evenly;
  }
  .new {
    width: 100%;
    height: 10%;
    background-color: rgb(250, 250, 250);
    border-radius: 5px;
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
  }
