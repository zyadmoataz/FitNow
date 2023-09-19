<template>
<v-card class="setting-card" v-if = "myUser != null" >
    <div class="acc-setting">
        Account Setting

    </div>
    <br>
    <br>

    <div class="base">Basic Iformation</div>

        <v-container class="form-container" >
          <v-form ref="myform" lazy-validation class="form">
            <v-row>
                <v-col cols="12" md="12" class="photo_div">
                    <div>
                        <v-img class="photo_preview" :src="photo_preview" />
                        <v-file-input v-model="myUser.coach_profile.photo" hide-input label="Upload your photo" outlined truncate-length="15" @change="onFileChange" prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/jpg"></v-file-input>
                    </div>
                    <div v-show="fileerror != ''" class="v-messages theme--light error--text" role="alert">
                        <div class="v-messages__wrapper mt-4">
                            <div class="v-messages__message">{{fileerror}} </div>
                        </div>
                    </div>
                </v-col>

                <v-col cols="12" md="6" >
                    <v-text-field v-model="myUser.user.fullname" label="First Name" placeholder="Enter your first name" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="myUser.user.email" label="Email" placeholder="johnDoe@gmail.com" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                </v-col>


                <v-col cols="12" md="12">
                    <v-textarea v-model="skillsName" label="Your Skills" placeholder="Descrip Your Capabilities"  outlined :rules="[v => !!v || 'This filed is required']" clearable></v-textarea>
                </v-col>

                <!-- start education -->
                <v-col cols="12" md="12">

                    <v-data-table :headers="headers" :items="education" sort-by="calories" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Education</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="AddEducation">
                                            Add Education
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                              <v-form ref="myform" lazy-validation class="form">
                                                <v-row>

                                                    <v-col cols="12" sm="6" md="12">
                                                        <v-text-field v-model="editedItem.Collage" label="Collage " outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.Degree" label="Degree" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field v-model="editedItem.Major" label="Major" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="12">

                                                        <v-menu ref="menu" v-model="editedItem.StartdateMenu" :close-on-content-click="false" :return-value.sync="editedItem.Startdate" transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field outlined v-model="editedItem.Startdate" label="Start date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"  clearable></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="editedItem.Startdate" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text  color="primary" @click="editedItem.Startdate = false">
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn text  color="primary" @click="$refs.menu.save(editedItem.Startdate)">
                                                                    OK
                                                                </v-btn>
                                                            </v-date-picker>
                                                        </v-menu>

                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="12">
                                                        <v-menu ref="menu" v-model="editedItem.EnddateMenu" :close-on-content-click="false" :return-value.sync="editedItem.Enddate" transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field outlined v-model="editedItem.Enddate" label="End date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="editedItem.Enddate" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text  color="primary" @click="editedItem.Enddate = false">
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn text  color="primary" @click="$refs.menu.save(editedItem.Enddate)">
                                                                    OK
                                                                </v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-col>

                                                </v-row>
                                              </v-form>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn  color="primary" text @click="save">
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn  color="primary" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn  color="primary" text @click="deleteItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">

                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>

                </v-col>
                <!-- end education -->

                <!-- start Certificate -->
                <v-col cols="12" md="12">
                    <template>
                        <v-data-table :headers="headers1" :items="Certificate" sort-by="name" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Certificate</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="AddCertification">
                                                Add Certificate
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="text-h5">{{ formTitle1 }}</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                  <v-form ref="myform" lazy-validation class="form">
                                                    <v-row>
                                                        <v-col cols="12" sm="6" md="12">
                                                            <v-text-field v-model="editedItem1.Name" label="Name " outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="12">
                                                            <v-menu ref="menu" v-model="editedItem1.DateMenu" :close-on-content-click="false" :return-value.sync="Datee" transition="scale-transition" offset-y min-width="auto">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field outlined v-model="editedItem1.Datee" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                                                                </template>
                                                                <v-date-picker v-model="editedItem1.Datee" no-title scrollable  :rules="[v => !!v || 'This filed is required']">
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn text color="primary" @click="Datee = false">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn text color="primary" @click="$refs.menu.save(editedItem1.Datee)">
                                                                        OK
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="12">
                                                            <template>
                                                                <v-file-input v-model="editedItem1.Image" label="certificate image" filled prepend-icon="mdi-camera"></v-file-input>
                                                            </template>
                                                        </v-col>

                                                    </v-row>
                                                  </v-form>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn color="blue darken-1" text @click="save1">
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                        <v-card>
                                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" text @click="closeDelete1">Cancel</v-btn>
                                                <v-btn  color="primary" text @click="deleteItem1Confirm">OK</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">

                                <v-icon small @click="deleteItem1(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">
                                    Reset
                                </v-btn>
                            </template>
                        </v-data-table>
                    </template>

                </v-col>
                <!-- end Certificate  -->

                <v-col cols="12" md="12">
                    <v-menu ref="menu" v-model="birthdatemenu" :close-on-content-click="false" :return-value.sync="birthdate" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined v-model="birthdate" label="Your Birth Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                        </template>
                        <v-date-picker v-model="myUser.coach_profile.birthdate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="birthdatemenu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(birthdate)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" md="12">
                    <h3 style="font-size: 1.25em;color: #34BE82;">Gender</h3>
                    <v-radio-group v-model="myUser.coach_profile.gender" >
                        <v-radio label=" Male" value="1"></v-radio>
                        <v-radio label="Female" value="2"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" offset-md="2">
                    <changeEmail />
                </v-col>

                <v-col cols="12" md="4">

                    <changePassword />

                </v-col>

            </v-row>
          </v-form>
        </v-container>
</v-card>
</template>

<script>
import changePassword from './changePassword.vue'
import changeEmail from './changeEmail.vue'
export default {
    layout: 'CoachLayout',
    components: {
        changePassword,
        changeEmail,
    },
    data: () => ({
        myUser:null,
        photo_preview: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        skillsName: '',
        Email: '',
        Certificate: '',
        gender: '',
        education:'',
        Collage:'',
        Degree:'',
        Major:'',
        Startdate: '',
        Enddate: '',
        description:'',
        EnddateMenu: false,
        StartdateMenu: false,
        //certification
        Name:'',
        DateMenu:'',
        Datee:'',
        birthdate: '',
        birthdatemenu: false,
        // dialog: false,
        dialogDelete: false,
        setting_form:[],

        headers: [{
                text: 'Collage',
                align: 'start',
                sortable: false,
                value: 'Collage',
            },
            {
                text: 'Start date',
                value: 'Startdate'
            },
            {
                text: 'End date',
                value: 'Enddate',
            },
            {
                text: 'Degree ',
                value: 'Degree'
            },
            {
                text: 'Major ',
                value: 'Major'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        headers1: [{
                text: 'Certificate Name',
                align: 'start',
                sortable: false,
                value: 'Name',
            },
            {
                text: 'date',
                value: 'Datee'
            },
            {
                text: 'Certificate Image',
                value: 'Image',
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        Certificate: [],
        editedIndex1: -1,
        // dialog
        editedItem1: {
            Name: '',
            Datee: '',
            Image: '',
        },
        defaultItem1: {
            Name: '',
            Datee: '',
            Image: '',
        },
        education: [],
        editedIndex: -1,
        // dialog
        editedItem: {
            Collage: '',
            Startdate: '',
            Enddate: '',
            Degree: '',
            Major: '',
        },
        defaultItem: {
            Collage: '',
            Startdate: '',
            Enddate: '',
            Degree: '',
            Major: '',
        },
    }),
    computed: {
        formTitle1() {
            return this.editedIndex1 === -1 ? 'Certificate' : 'Edit Item'
        },
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Education' : 'Edit Item'
        },
    },

    mounted() {
      this.GetData();
    },


    methods: {
      ///////dataaaaaaaa

      GetData() {
        const myloader = this.$vs.loading({
          target: this.$refs.mycontainer,
          color: '#34BE82'
        })
        this.$axios
          .get('/coach/data')
          .then(response => {
            myloader.close()
            this.myUser = response.data.data
            console.log (this.myUser)
          })
          .catch(error => {
            myloader.close()
            console.log(error)
          })
      },
             ///////dataaaaaaaa

                  //////start add education

        async AddEducation() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.myform.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data When Has File User formDataObj ======= */
                const formDataObj = new FormData()
                formDataObj.append('collage', this.Collage)
                formDataObj.append('start_date', this.Startdate)
                formDataObj.append('end_date', this.Enddate)
                formDataObj.append('degree', this.Degree)
                formDataObj.append('study', this.Major)
                formDataObj.append('description', this.description)

                /* ======= Send To API  ======= */
                await this.$axios.post('/coach-education/add', formDataObj, {
                    'Content-Type': 'multipart/form-data',
                }).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Education Added Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                here.$emit('fetchEducation');
                    //redirect to list
                    here.dialog = false;

                }).catch(function (error) {
                    myloader.close();

                    //Send Notification if error
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'danger',
                        text: error.response.data.message,
                        color: 'danger',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                    console.log(error.response)

                });
            }
        },
                               ///// end add education

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

                               ///// end Add Certification

        async AddCertification() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.myform.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                /* ======= Organize data When Has File User formDataObj ======= */
                const formDataObj2 = new FormData()
                formDataObj2.append('name', this.Name)
                formDataObj2.append('date', this.Datee)
                formDataObj2.append('image', this.Image)



                /* ======= Send To API  ======= */
                await this.$axios.post('/coach-certifications/add', formDataObj2, {
                    'Content-Type': 'multipart/form-data',
                }).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'certification Added Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                here.$emit('fetchCertification');
                    //redirect to list
                    here.dialog = false;

                }).catch(function (error) {
                    myloader.close();

                    //Send Notification if error
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'danger',
                        text: error.response.data.message,
                        color: 'danger',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })
                    console.log(error.response)

                });
            }
        },
                               ///// end Add Certification


        editItem(item) {
            this.editedIndex = this.education.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.education.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.education.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.education[this.editedIndex], this.editedItem)
            } else {
                this.education.push(this.editedItem)
            }
            this.close()
        },
        // start of Certificate methods
        editItem1(item) {
            this.editedIndex1 = this.Certificate.indexOf(item)
            this.editedItem1 = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem1(item) {
            this.editedIndex1 = this.Certificate.indexOf(item)
            this.editedItem1 = Object.assign({}, item)
            this.dialogDelete1 = true
        },
        deleteItem1Confirm() {
            this.Certificate.splice(this.editedIndex1, 1)
            this.closeDelete()
        },
        close1() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem1 = Object.assign({}, this.defaultItem1)
                this.editedIndex1 = -1
            })
        },
        closeDelete1() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem1 = Object.assign({}, this.defaultItem1)
                this.editedIndex1 = -1
            })
        },
        save1() {
            if (this.editedIndex1 > -1) {
                Object.assign(this.Certificate[this.editedIndex1], this.editedItem1)
            } else {
                this.Certificate.push(this.editedItem1)
            }
            this.close()
        },
    },
}
</script>

<style lang="scss">
.setting-card {
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
}
.base {
    font-size: 22px;
    color: #34BE82;
    font-weight: bold;
}
.acc-setting,
.username {
    font-size: 25px;
    color: #34BE82;
    text-align: center;
    font-weight: 800;
}
.photo_preview {
    height: 100px;
    width: 100px;
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid #eee;
}
.photo_div {
    position: relative;
    .v-input {
        position: absolute;
        top: 80px;
        left: 80px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 4px 0px #707070;
        height: 35px;
        width: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        .v-input__prepend-outer {
            margin: 0 !important;
            padding: 0 !important;
        }
    }
}
</style>
