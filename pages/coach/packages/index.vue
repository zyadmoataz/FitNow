<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card">
        <v-card-title class="fit-card-title">
            All Packages
        </v-card-title>
        <v-row class="justify-end">
            <v-col md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" large outlined></v-text-field>
            </v-col>
            <v-col md="" style="displey:flex;justify-content:end">
                <v-btn color="primary" x-large dark class="mb-2" to="/coach/packages/add">
                    Add New Pacakage
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">
            <v-col>
                <!-- Table -->
                <v-data-table sort-desc :headers="headers" :items="packages" :search="search" sort-by="id" class="elevation-1">
                    <template v-slot:[`item.weeks`]="{ item }">
                        {{item.weeks}} {{item.weeks == 1 ? 'Week' : 'Weeks'}}
                    </template>
                    <template v-slot:[`item.appliers`]="{ item }">
                        {{item.appliers != null ? item.appliers.length : 0}} Person
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon size="20" class="mr-2" @click="$router.push('/coach/packages/edit/'+item.id)">
                            mdi-pencil
                        </v-icon>
                        <v-icon size="20" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:[`item.actions2`]="{ item }">
                        <v-btn depressed color="primary" @click="$router.push('/coach/packages/appliers/'+item.id)">
                            <v-icon size="20" class="mr-2">
                                mdi-account-group
                            </v-icon> View Appliers
                        </v-btn>

                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-card>
</div>
</template>

<script>
import addClient from "@/components/client/addClient.vue"
import editClient from "@/components/client/editClient.vue"
export default {
    components: {
        addClient,
        editClient,

    },
    layout: 'CoachLayout',

    data: () => ({
        breadcrumbPath: [{
                text: 'Coach',
                disabled: false,
                href: '/',
            },
            {
                text: 'Pacakges',
                disabled: false,
            },
        ],
        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Package Name',
                sortable: false,
                value: 'title',
            },
            {
                text: 'Type',
                value: 'type'
            },
            {
                text: 'Payment Type',
                value: 'payment_type'
            },

            {
                text: 'Weeks',
                value: 'weeks'
            },
            {
                text: 'Appliers',
                value: 'appliers'
            },

            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
            {
                text: 'View Appliers',
                value: 'actions2',
                sortable: false
            },
        ],
        packages: [],
        editedIndex: -1,
        editedItem: {
            fullname: '',
            program: 0,
            date: '',
            id: 0,
            status: 0,
        },
        defaultItem: {
            fullname: '',
            program: 0,
            date: '',
            id: 0,
            status: 0,
        },
    }),

    mounted() {
        this.fethPackages();
    },

    methods: {
        async fethPackages() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/coach-packages/list').then((response) => {
                this.packages = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },

        editItem(item) {
            this.editedIndex = this.packages.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        closeDelete() {
            this.dialogDelete = false
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
