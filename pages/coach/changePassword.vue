<template>
<v-row>
    <v-col cols="auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">Change Password</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Change Password </v-toolbar>

                        <v-container class="form-container">
                          <v-form ref="myform" lazy-validation class="form">
                            <v-row>
                                <v-col cols="12" md="12">

                                    <v-text-field v-model="currentPassword" label="current password" placeholder="Enter current password" outlined clearable :rules="[v => !!v || 'This filed is required']" prepend-icon="mdi-eye"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="12">

                                    <v-text-field v-model="newPassword" label="Enter new password" placeholder="Enter new password" outlined clearable :rules="[v => !!v || 'This filed is required']" prepend-icon="mdi-eye"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="12">

                                    <v-text-field v-model="confirmNewPassword" label="confirm password" placeholder="confirm password" outlined clearable :rules="[v => !!v || 'This filed is required']" prepend-icon="mdi-eye"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" style="display: flex; justify-content: center;">
                                    <v-btn color="primary" x-large dark class="mb-2">
                                        change
                                        password
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
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',

        }
    },

}
</script>

<style>

</style>
