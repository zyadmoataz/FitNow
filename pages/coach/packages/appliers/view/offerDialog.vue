<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="myApplier.is_offer_sent != 1" depressed color="primary" class="fit-btn mr-4" v-bind="attrs" v-on="on">
                <v-icon size="18" class="mr-2">mdi-send</v-icon> Send Offer
            </v-btn>
           <div v-else class="offer-sent">
             You Sent the offer !
           </div>

        </template>
        <v-card  v-if="myApplier.is_offer_sent != 1">
            <v-card-title>
                <span class="text-h5">Offer Details</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>

                            <v-col cols=" 12" md="6" style="padding-bottom:0">
                                <label class="d-block mb-4">Select a Package</label>
                                <v-autocomplete v-model="mypackage" outlined :items="packages" item-value="id" item-text="title" label="Select a Package" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                            </v-col>
                            <v-col cols=" 12" md="6" style="padding-bottom:0">
                                <label class="d-block mb-4">Price</label>
                                <v-text-field label="Price" type="number" prefix="EGP" placeholder="" v-model="price" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                            </v-col>
                            <v-col cols=" 12" md="12" style="padding-bottom:0">
                                <label class="d-block mb-4">Notes</label>
                                <v-textarea v-model="notes" label="notes" clearable outlined height="100" required :rules="[v => !!v || 'Item is required']"></v-textarea>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="primary darken-1" class="fit-btn" @click="SendOffer">
                    Send
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
            dialog: false,
            packages: [],
            valid: false,
            mypackage: '',
            notes: '',
            price: ''
        }
    },
    mounted() {
        this.fethPackages();

    },
    props:{
        myApplier:Object,
    },
    methods: {
        async SendOffer() {
            /*  ======= Check if form is validate  ======= */
            if (this.$refs.form.validate()) {

                var here = this;
                /*  ======= Start Loader  ======= */
                const myloader = this.$vs.loading({
                    target: this.$refs.mycontainer,
                    color: '#34BE82'
                })

                var data = {
                    package_id: this.mypackage,
                    trainee_id: this.$props.myApplier.user.id,
                    price: this.price,
                    notes: this.notes,
                    apply_id: this.$props.myApplier.id
                }
                /* ======= Send To API  ======= */
                await this.$axios.post('/coach-offers/add', data, {
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
                    this.$router.push('/coach/packages')

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
            async fethPackages() {
                await this.$axios.get('/coach-packages/list').then((response) => {
                    this.packages = response.data.data.data;
                    console.log(response)

                }).catch(function (error) {
                    console.log(error.response)

                });
            },

        }
    }
</script>
<style lang="scss" scoped>
.offer-sent{
        padding: 0 2rem;
    background: #f5f5f5;
    /* margin: 1rem; */
    height: 100%;
    margin: 0 1rem;
    align-items: center;
    display: flex;
    border-radius: 5px;}
</style>