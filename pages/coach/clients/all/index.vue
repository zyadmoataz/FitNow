<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card">
        <v-card-title class="fit-card-title">
            All Clients
        </v-card-title>
        <v-row class="justify-space-between">
            <v-col md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" large outlined></v-text-field>
            </v-col>
            <v-col md="8" style="displey:flex;justify-content:end">
                <addClient :editedItem="editedItem" />
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">
            <v-col>

                <!-- Table -->
                <v-data-table :headers="headers" :items="clients.filter(obj => obj.status != 'PENDING')" :search="search" sort-by="id" class="elevation-1">
                    <template v-slot:[`item.trainee.fullname`]="{ item }">
                        <nuxt-link :to="'/coach/client/'+item.id" class="client-name"><img :src="getClientPhoto(item)" /> {{item.trainee.fullname}}</nuxt-link>
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{convertDate(item.created_at)}}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="getColor(item.status)" text>
                            {{ item.status }}
                        </v-chip>
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
                text: 'Clients',
                disabled: false,
            },
        ],
        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Client Name',
                value: 'trainee.fullname',
            },
            {
                text: 'Program',
                value: 'program.title'
            },
            {
                text: 'Date',
                value: 'created_at'
            },
            {
                text: 'Status',
                value: 'status'
            },
  
        ],
        clients: [],
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
        this.fetchclients();
    },
    methods: {
        getClientPhoto(item) {
            if (item.trainee != null) {
                if (item.trainee.profile != null) {
                    if (item.trainee.photo != null) {
                        return item.trainee.photo;
                    }
                }
            }
             return 'https://www.gravatar.com/avatar/' + item.trainee.email + '?d=mp&s=200';
        },

    async fetchclients() {
        /*  ======= Start Loader  ======= */
        const myloader = this.$vs.loading({
            target: this.$refs.mycontainer,
            color: '#34BE82'
        })
        await this.$axios.get('/coach-trainees/list').then((response) => {
            this.clients = response.data.data.data;
            console.log(response)

        }).catch(function (error) {
            console.log(error.response)

        });
        myloader.close();
    },
    getColor(status) {
        if (status == 'CONNECTED') {
            return 'green'
        } else if (status == 'DISCONNECTED') {
            return 'gray'
        } else {
            return 'orange'
        }
    },
    convertDate(date) {
        var currentTime = new Date(date);
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date;
    },

},
}
</script>

<style lang="scss">
.v-chip .v-chip__content {
    color: #fff
}

.client-name {
    color: #000 !important;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
       transition: 300ms;
    img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 8px;
    }
    &:hover{
        color:$primary-color !important;
        transition: 300ms;
    }
}
</style>
