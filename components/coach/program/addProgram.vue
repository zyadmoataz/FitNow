<template>
<v-dialog v-model="dialog" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" x-large dark class="mb-2" v-bind="attrs" v-on="on">
            Add New program
        </v-btn>
    </template>
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Add New program
        </v-card-title>

        <v-card-text style="padding:0">

            <v-form ref="form" lazy-validation class="form" style="padding:1rem 0">
                <v-row style="margin:0">
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="programName" placeholder="Add program title" label="Program Title" clearable outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-textarea outlined v-model="description" label="DESCRIPTION " placeholder="Add program description" rows="3" :rules="[v => !!v || 'This filed is required']"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="Week" type="number" min="1" class="" value="1" outlined placeholder="Weeks" :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" style="padding:0;">
                        <v-select :items="owner" label="OWNER" outlined placeholder="choose owner" v-model="owner" :rules="[v => !!v || 'This filed is required']"></v-select>
                    </v-col>

                    <v-col cols="12" md="12" style="padding:0;">
                        <v-select :items="shareWith" label="SHARE WITH ORG?" outlined placeholder="choose share with who" :rules="[v => !!v || 'This filed is required']"></v-select>
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
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data: () => ({
        owner: '',
        search: '',
        programName: '',
        Week: 1,
        owner: ['ahmed alaa','mohameddd' ],
        shareWith: ['Private to owner', 'share with another', ],
        dialog: false,
        dialogDelete: false,

    }),

    methods: {
        Preview_image() {
            this.url = URL.createObjectURL(this.image)
        },
        save(date) { //axios

        },
        save() {
            if (this.$refs.form.validate()) {
                this.$emit('save', {
                    data: {
                        programName: this.nameProgram,
                        Week: this.Week,
                        owner: this.owner,
                        shareWith: this.shareWith,

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





</style>
