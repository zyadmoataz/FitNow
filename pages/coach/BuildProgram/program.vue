<template>
<div>
    <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <v-card class="fit-card">
        <v-card-title class="fit-card-title">
            All programs
        </v-card-title>
        <v-row class="justify-space-between">
            <v-col md="4">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" large outlined></v-text-field>
            </v-col>
            <v-col md="8" style="displey:flex;justify-content:end">
                <CreateProgram />
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">
            <v-col>

                <!-- Table -->

                <v-data-table :headers="headers" :items="programs" :search="search" sort-by="Program" class="elevation-1 program-table" @click:row="handleClick">
                    <template v-slot:[`item.program_small.title`]="{ item }">
                        <div class="workout-title-table d-flex" @click="$router.push('/coach/programs/'+item.id)">
                            <div class="img mr-4">
                                <img src="@/assets/img/dark.png" />
                            </div>
                            <div class="content">
                                <div class="title">
                                    {{item.program_small.title}}
                                </div>
                                <div class="description">
                                    {{item.program_small.description}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:[`item.trainee.user.fullname`]="{ item }">
                        <nuxt-link :to="'/coach/clients/' + item.trainee.user_id" class="client-name"><img :src="getClientPhoto(item)" /> {{item.trainee.user.fullname}}</nuxt-link>
                    </template>
                    <template v-slot:[`item.weeks`]="{ item }">
                        {{item.program_small.weeks}} {{item.program_smallweeks == 1 ? 'Week' : 'Weeks'}}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip style="color:#fff !important" v-if="item.assigned_trainee" :color="getColor(item.assigned_trainee.status)" text>
                            {{ item.assigned_trainee.status }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{convertDate(item.created_at)}}
                    </template>
                </v-data-table>

            </v-col>
        </v-row>
    </v-card>
</div>
</template>

<script>
import CreateProgram from "@/components/coach/program/CreateProgram.vue";

export default {
    components: {

        CreateProgram
    },
    layout: 'CoachLayout',

    data: () => ({
        breadcrumbPath: [{
                text: 'coach',
                disabled: false,
                href: '/',
            },
            {
                text: 'program',
                disabled: false,
            },
        ],
        dialogDelete: false,
        search: '',
        headers: [{
                text: 'Program',
                width: '60%',
                sortable: true,
                value: 'program_small.title',
            },
            {
                text: 'Trainee',
                value: 'trainee.user.fullname'
            },
            {
                text: 'Status',
                value: 'status'
            },
              {
                text: 'Weeks',
                value: 'weeks'
            },
            {
                text: 'Creation Date ',
                value: 'created_at'
            },

        ],
        programs: [],
        editedIndex: -1,
        editedItem: {
            programName: '',
            description: '',
            Week: '',
            mostRecent: 0,
        },
        defaultItem: {
            programName: '',
            description: '',
            Week: '',
            mostRecent: 0,
        },
    }),

    mounted() {
        this.fetchPrograms()
    },

    methods: {
        handleClick(row) {
            this.$router.push('/coach/programs/' + row.id)

        },
        getClientPhoto(item) {
            if (item.trainee != null) {
                if (item.trainee.photo != null) {
                    return item.trainee.photo;
                }

            }
            return 'https://www.gravatar.com/avatar/' + item.trainee.email + '?d=mp&s=200';
        },
        async fetchPrograms() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/assign-program/list').then((response) => {
                this.programs = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },
        convertDate(date) {
            var currentTime = new Date(date);
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
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
    },

}
</script>

<style lang="scss">
.workout-title-table {
    .title {
        font-size: 18px;
        color: rgb(13, 20, 25);
        font-weight: 600;
        margin-bottom: 5px;
    }

    .description {
        font-size: 12px;
        color: rgb(13, 20, 25);
    }
    .content{
            max-width: 80%;
    }
    .img {
          height: 60px;
            width: 60px;
        img {
            height: 60px;
            width: 60px;
            border-radius: 10px;
        }
    }

}

.client-name {
    color: #000 !important;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 300ms;

    img {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 8px;
    }

    &:hover {
        color: $primary-color !important;
        transition: 300ms;
    }
}

.program-table {
    tr {
        cursor: pointer;
    }
}
.v-chip .v-chip__content{
    color:#fff !important
}
</style>
