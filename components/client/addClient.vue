<template>
<v-dialog v-model="dialog" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" x-large dark class="mb-2" v-bind="attrs" v-on="on">
            Add New Client
        </v-btn>
    </template>
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Add New Client
        </v-card-title>
        <v-card-text style="padding:0">
            <v-form ref="form" lazy-validation class="form" style="padding:1rem 0">
                <v-row style="margin:0">
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="fullname" label="Full Name" clearable placeholder="Client First Name" outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="email" label="Client Email Address" clearable placeholder="john@fitnow.com" outlined :rules="[v => !!v || 'E-mail is required',v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-autocomplete v-model="country" outlined :items="$vuetify.rtl ? $countryList_Ar() : $countryList_EN()" item-text="name" label="Country" clearable :rules="[v => !!v || 'This filed is required']"></v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="12" style="padding:0">
                        <label class="d-block text-left">Gender</label>
                        <v-radio-group v-model="gender" row>
                            <v-radio label="Male" :value="1"></v-radio>
                            <v-radio label="Female" :value="2"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                      <p class="note">We will send Invitation link to client email.</p>
                    </v-col>
                </v-row>
            </v-form>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=" darken-1" text large style="padding: 1rem 2rem;"   @click="close">
                Cancel
            </v-btn>
            <v-btn color="primary" large style="padding: 1rem 2rem;"  @click="save">
                Invite
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data: () => ({
        step: '1',
        show1: false,
        fullname: '',
        country: '',
        email: '',
        gender: 1,
        dialog: false,
        dialogDelete: false,

    }),

    methods: {

        save(date) { //axios

        },
        save() {
            if (this.$refs.form.validate()) {
                this.$emit('save', {
                    data: {
                        firstName: this.firstName,
                        email: this.email,
                        lastName: this.lastName,
                        gender: this.gender,

                    }
                });
            }
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    },

}
</script>

<style lang="scss" scoped>
h2 {
    color: #34BE82;
}


</style>
