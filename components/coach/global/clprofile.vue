<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" rounded small>
          Open
        </v-btn>
      </template>
      <v-card>
        <v-container class="all" style=" background-color: white;">
          <div class="containerr">
            <img class="cl-pic" src="~assets/img/icons/user.png">
            <h3 style="margin-left: -105px;margin-top: 100px;" v-if = "myUser != null">{{ myUser.trainee.fullname }}</h3>
          </div>

          <form ref="form" lazy-validation class="form">
            <v-row style="margin:0; padding: 20px;">
              <v-col cols="12">
                  <h3 class="k">Full name</h3>
                  <div class="first" v-if = "myUser != null">
                    {{ myUser.trainee.fullname }}
                  </div>
                   <h3 class="k">E-mail</h3>
                  <div class="m" v-if = "myUser != null">
                     {{ myUser.trainee.email   }}
                  </div>
                  <h3 class="k">Phone Number</h3>
                  <div class="last" v-if = "myUser != null">
                    {{ clientInfo.phone }}
                  </div>
                  <h3 class="k">Birthdate</h3>
                  <div class="birth" v-if = "myUser != null">
                    {{ clientInfo.birthday }}
                  </div>

              </v-col>
            </v-row>
            <v-card-actions style="padding-bottom:20px">
              <v-spacer></v-spacer>
              <v-btn block class="clo" rounded color="primary" dark large text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      activePicker: null,
      date: null,
      menu: false,
      clientInfo: {
        id: 0,
        phone: "01002133115",
        birthday: "25/6/2000",
      },
          myUser:null
    }

  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
    mounted() {
      this.GetData();
    },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image)
    },
    save(date) {
      this.$refs.menu.save(date)
    },
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
.containerr {
  display: flex;
  justify-content: center;
  background-color: rgb(220, 220, 220);
padding: 20px;
}

.cl-pic {
  width: 100px;
  height: 100px;
  padding: 10px;
}

.all {
  border: 2px;
  border-color: #34be82;
  border-style: solid;
  display: block;
  border-radius: 3px;
    padding: 0;
}

.first,
.last,
.m,
.birth {
  border:solid 1px ;
  border-radius: 5px;
  margin: 5px;
  padding: 8px;
  background-color: white;
}

.k {
  margin: 8px;
}

.v-btn {
  color: var(primary);
}
</style>
