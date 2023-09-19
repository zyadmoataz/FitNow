<template>
<div>
    <v-dialog v-model="dialog" max-width="40%">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" x-large dark class="mb-2" v-bind="attrs" v-on="on">
                Create Workout

            </v-btn>
        </template>
        <v-card class="fit-dailog-card">
            <h2 class="d-block primary--text fit-card-title-dialog" style="padding-bottom:5px !important"> Create Workout</h2>
            <span class="d-block secondary--text mb-6">Please select how you would like to start
            </span>

            <v-row style="margin:0">

                <v-col cols="12" md="6" sm="12" style="padding:0">
                    <fromTemplate @close="dialog = false" />
                </v-col>

                <v-col cols="12" md="6" sm="12" style="padding:0">
                    <newTemplate @close="dialog = false" />
                </v-col>

            </v-row>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
import fromTemplate from '../../coach/Workout/fromTemplate.vue'

import newTemplate from '../../coach/Workout/newTemplate.vue'

export default {
    components: {
        fromTemplate,
        newTemplate

    },
    data: () => ({

        dialog: false,
        dialogDelete: false,

    }),

    methods: {
        Preview_image() {
            this.url = URL.createObjectURL(this.image)
        },
        save(date) { //axios

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
