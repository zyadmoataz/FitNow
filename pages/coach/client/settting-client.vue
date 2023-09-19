<template>
  <div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>
    <v-responsive>
      <!-- start of nav  -->
      <v-row wrap>
        <v-col cols="12" md="12" sm="12">
          <nav>
            <v-toolbar app>
              <v-toolbar-title>
                <span >  {{ progre.name }} </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <nuxt-link class="set" to="/coach/clients/_id">
                <v-btn style="
                  background-color: white;
                    color: #5e5873;
                " elevation="0">
                  overview
                </v-btn>
              </nuxt-link>
              <nuxt-link class="set" to="/">
                <v-btn style="background-color: white; color: #5e5873" elevation="0">
                  Payment
                </v-btn>
              </nuxt-link>
              <nuxt-link class="set" to="#">
                <v-btn style="
                    background-color: white;
                  color: #34be82;
                  text-decoration: underline;
                  " elevation="0">
                  settings
                </v-btn>
              </nuxt-link>
            </v-toolbar>
          </nav>
        </v-col>
      </v-row>
      <!-- navbar  -->

      <!-- start of head  -->
      <div class="row match-height">
        <!-- start of progress  -->
        <v-col md="12">
          <v-card style="height: 100%">
            <v-card-title class="tp" style="padding:0px">
              <div class="new">Profile Settings </div>
            </v-card-title>
            <!-- <end of head -->
            <!-- units  -->
            <v-row style="padding:30px 30px 0px 30px">
              <v-col cols="12" md="3" sm="3">
                <div class="un">
                  <img src="~assets/img/icons/protractor.svg" style="padding-right:10px">
                  <h3>Units</h3>
                </div>
              </v-col>
              <v-col cols="12" md="3" sm="12">
                <Label>Weights </Label>
                <v-radio-group v-model="weight" column>
                  <v-radio label="Metric (KG)" :value="1"></v-radio>
                  <v-radio label="US/Imperial(Ib)" :value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="3" sm="12">
                <label>Distance Units</label>
                <v-radio-group v-model="distance" column>
                  <v-radio label="Metric (KM)" :value="1"></v-radio>
                  <v-radio label="US/Imperial(MLLES)" :value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="3" sm="12">
                <label>Lenght Units</label>
                <v-radio-group v-model="length" column>
                  <v-radio label="Metric (Cm)" :value="1"></v-radio>
                  <v-radio label="US/Imperial(Inch)" :value="2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <!-- <units -->
            <!-- timezone  -->
            <v-row style="padding:0px 30px 0px 30px">
              <v-col cols="12" md="3" sm="6">
                <div class="un">
                  <img src="~assets/img/icons/time-zone.svg" style="padding-right:10px">
                  <h3>Timezone</h3>
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-select  label="TimeZone" dense outlined></v-select>
              </v-col>
            </v-row>
            <!-- timezone  -->
            <!-- feateaure -->
            <v-row align-content="space-between" style="padding:0px 30px 0px 30px">
              <v-col cols="12" md="3" sm="6">
                <div class="un">
                  <img src="~assets/img/icons/layout.svg" style="padding-right:10px">
                  <h3>Features</h3>
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="6" style="display: flex;">
                <p>
                  Create a custom experience for every client by disabling or enabling certain features. When a feature
                  is disabled, it will not appear on your client's mobile app
                </p>
              </v-col>
            </v-row>
            <v-row class="pan">
              <div style="margin-right:-50px">
                <div style="display:flex;align-items: center ; justifey-content:center ;">
                  <img src="~/assets/img/icons/fitness.svg">
                  <div style="padding:10px;">Training</div>
                  <div style="padding:10px;">Assign workouts and track training progress</div>
                  <v-switch class="switchh" color="primary" style="margin-left:55px;" value input-value="true">
                  </v-switch>
                </div>
                <div style="display:flex;align-items: center ; justifey-content:center ;">
                  <img class="a" src="~/assets/img/icons/completed-task.svg">
                  <div class="a" style="padding:10px;">Task</div>
                  <div class="aa" style="padding:10px;">Schedule to-dos and deliver education material </div>
                  <v-switch class="switchh" color="primary" style=" margin-left:55px;" value input-value="true">
                  </v-switch>
                </div>
                <div style="display:flex;align-items: center ; justifey-content:center ;">
                  <img class="a" src="~/assets/img/icons/image.svg">
                  <div class="a" style="padding:10px;">
                    Photo
                  </div>
                  <div class="aa" style="padding:10px;">Visualize improvement with before and after photos</div>
                  <div>
                    <v-switch color="primary" style="margin-left: 10px;" value input-value="true">
                    </v-switch>
                  </div>
                </div>
                <div style="display:flex; align-items:center; justifey-content:center; padding-bottom: 40px;">
                  <img class="a" src="~/assets/img/icons/fitness.svg">
                  <div class="a" style="padding:10px;">Training</div>
                  <div class="aa" style="padding:10px;">Assign workouts and track training progress</div>
                  <v-switch class="switchh" color="primary" style="margin-left:55px;" value input-value="true">
                  </v-switch>
                </div>
              </div>
            </v-row>

            <!--Save Btn-->
            <div class="save">
              <v-btn color="primary" elevation="4" x-large block>Save</v-btn>
            </div>

          </v-card>
        </v-col>
      </div>
    </v-responsive>
  </div>
</template>
<script>
//import timezone from '../../plugins/countries/timezone'
export default {
  layout: 'CoachLayout',

  data() {
    return {
      myUser:null,
      weight: 1,
      distance: 1,
      length: 1,
      breadcrumbPath: [{
        text: "Home",
        disabled: false,
        href: '/',
      },
      {
        text: 'Trainee Progress',
        disabled: true,
        href: '',
      },
      ],
      progre: {
        id: 0,
        name: "Ben Andrew",
        noteContent: " Need program while traveling for 2 weeks",
        injure: "arm",
        goal: "loose weight",
        upd: "Complete His Workout for today",
        mail: "Ben.124@gmail.com",
        location: "Amirca/Los Angles",
        img_1: require("~/assets/img/icons/before.svg"),
        img_2: require("~/assets/img/icons/after.svg"),
      }
    }
  },
  mounted() {
      this.GetData();
    },
    methods:
    {
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
            console.log (this.myUser)
          })
          .catch(error => {
            myloader.close()
            console.log(error)
          })
      }
    }
}
</script>

<style>
h3 {
  color: #34be82;
  margin-top: 7px;
}

.stehead {
  background-color: #e6e6e6;
  border-radius: 20px;

}

.set {
  text-decoration: none;
}

.un {
  display: flex;
}

label {
  color: black;

}

v-btn {
  border-radius: 10px;
  width: 50px;
  justify-content: center;
}

.pan {
  justify-content: center;
}

.switchh {
  margin-left: 50px;
}

.save {
  width: 200px;
  margin-bottom: 20px;
  margin-left: 950px;
}
</style>
