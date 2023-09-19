<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="40%">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed color="primary" class="fit-btn" v-bind="attrs" v-on="on">
                <v-icon size="18" class="mr-2">mdi-weight-lifter</v-icon> Create Program
            </v-btn>

        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Create New Program</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12" style="padding-bottom:0;">
                                <v-text-field label="Program Title" placeholder="" v-model="title" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                            </v-col>
                            <v-col cols=" 12" md="12" style="padding-bottom:0">
                                <v-autocomplete v-model="weeks" outlined :items="weeks_choose" item-value="value" item-text="text" label="Weeks Number" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                            </v-col>

                            <v-col cols=" 12" md="12" style="padding-bottom:0">
                                <span class="d-block mb-2 primary--text">*You can Create Programs for only 'Pending Clients'.</span>
                                <v-autocomplete :auto-select-first="true" v-model="client" @change="fetchOffers(client)" :item-value="function(obj){ return obj}" outlined :items="myclients.filter(obj => obj.status !='CONNECTED')" :item-text="obj => obj.trainee != null ?  obj.trainee.fullname  : obj.fullname " label="Select a Client" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                            </v-col>
                            <v-col cols=" 12" md="12" style="padding-bottom:0" v-if="client != null && client.trainee != null">
                                <label class="d-block mb-4">* Select an Offer for {{client.trainee.fullname}}</label>
                                <v-autocomplete :auto-select-first="true" v-model="myoffer" outlined :items="offers" item-value="id" :item-text="obj => obj.price + ' EGP (' + convertDate(obj.created_at) + ' )'" label="Select an Offer" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                            </v-col>
                            <v-col cols=" 12" md="12" style="padding-bottom:0">
                                <v-textarea label="Description" placeholder="" v-model="description" outlined :rules="[v => !!v || 'This filed is required']"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text class="fit-btn" @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="primary darken-1" class="fit-btn" @click="CreateProgram">
                    Create Program
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            dialog: false,
            packages: [],
            myclients: [],
            valid: false,
            client: null,
            mypackage: '',
            notes: '',
            price: '',
            offers: [],
            myoffer: '',
            description: '',
            weeks: '',
            weeks_choose: [{
                    text: '1 Week',
                    value: 1
                },
                {
                    text: '2 Weeks',
                    value: 2
                },
                {
                    text: '3 Weeks',
                    value: 3
                },
                {
                    text: '4 Weeks',
                    value: 4
                },
                {
                    text: '5 Weeks',
                    value: 5
                },
                {
                    text: '6 Weeks',
                    value: 6
                }, {
                    text: '7 Weeks',
                    value: 7
                },
                {
                    text: '8 Weeks',
                    value: 8
                },

            ]
        }
    },
    mounted() {
        this.fetchClients();
        if (this.$props.mytrainee != null) {
            console.log(this.$props.mytrainee)
            this.client = this.myclients.filter(obj => obj.trainee.id == this.$props.mytrainee.trainee.id);
        }
    },
    props: {
        mytrainee: Object,
    },

    methods: {
        async CreateProgram() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.form.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })
    console.log(this.$props.mytrainee)
                var data = {
                    title: this.title,
                    weeks: this.weeks,
                    description: this.description,
                    trainee_id: this.$props.mytrainee.id,
                    offer_id: this.myoffer
                }
                console.log(data)
                /* ======= Send To API  ======= */
                await this.$axios.post('/programs/CreateForTrainee', data, {
                    'Content-Type': 'multipart/form-data',
                }).then((response) => {
                    myloader.close();

                    //Send Notification if success
                    here.$vs.notification({
                        position: 'top-right',
                        title: 'Success',
                        text: 'Offer Sent Successfully',
                        color: 'success',
                        icon: '<i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-check theme--light primary--text"></i>'
                    })

                    //redirect to list
                    console.log(response)
                    this.$router.push('/coach/programs/'+ response.data.data.id)

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
        ChangeClient(obj) {
            this.client = obj;
        },
        convertDate(date) {
            var currentTime = new Date(date);
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        },
        async fetchClients() {
            await this.$axios.get('/coach-trainees/list').then((response) => {
                this.myclients = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
        },
        async fetchOffers(client) {
            if (client != null) {
                await this.$axios.get('/coach-offers/GetPaidOffersforClient/' + client.trainee.id).then((response) => {
                    this.offers = response.data.data;
                    console.log(response)

                }).catch(function (error) {
                    console.log(error.response)

                });
            }

        },

    }
}
</script>

<style lang="scss" scoped>
.offer-sent {
    padding: 0 2rem;
    background: #f5f5f5;
    /* margin: 1rem; */
    height: 100%;
    margin: 0 1rem;
    align-items: center;
    display: flex;
    border-radius: 5px;
}
</style>
