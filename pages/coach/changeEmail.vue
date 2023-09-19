<template>
<v-row>
    <v-col cols="auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">Change Mail</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Change Mail </v-toolbar>


                        <v-container class="form-container">
                          <v-form ref="myform" lazy-validation class="form">
                            <v-row>
                                <v-col cols="12" md="12">

                                    <v-text-field v-model="NewMail" label="New Mail" placeholder="Enter your new mail" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                                </v-col>

                                <v-col cols="12" md="12">

                                    <v-text-field v-model="ConfirmMail" label="Confirm Mail" placeholder="confirm mail" outlined :rules="[v => !!v || 'This filed is required']" clearable></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" style="display: flex; justify-content: center;">
                                    <v-btn color="primary" x-large dark class="mb-2">
                                        Change your mail
                                    </v-btn>

                                </v-col>
                                <v-col cols="12" md="6" style="display: flex; justify-content: center;">

                                    <v-btn color="primary" x-large dark class="mb-2" @click="dialog.value = false">Close</v-btn>

                                </v-col>
                            </v-row>
                          </v-form>
                        </v-container>


                </v-card>
            </template>
        </v-dialog>
    </v-col>
</v-row>

</template>

<script>
export default {
    layout: 'CoachLayout',
    data() {
        return {

            NewMail: '',
            ConfirmMail: '',

        }
    },

}
</script>

<style>
.mail-card {
    width: 50%;
    margin: 0 auto;
    padding: 1rem;

}
</style>
