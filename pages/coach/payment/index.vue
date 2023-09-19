<template>
<div>
         <FitBreadcumb :breadcrumbPath="breadcrumbPath"></FitBreadcumb>

    <div>
        <v-row>
            <v-col>
                <v-card class="payment-card">
                    <div class="type d-flex justify-space-between">
                        <span class="title-fit">Pending</span>
                        <v-tooltip bottom color="primary">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="d-flex align-center" elevation="2" icon rounded text color="primary" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-help</v-icon>
                                </v-btn>

                            </template>
                            <span style="color:#fff;font-size:14px">This represents the standard security hold period <br>in which funds cannot be withdrawn.

                                 <br>Payments have a 5-day security period from  <br>the time payment is made to funds availability.</span>
                        </v-tooltip>

                    </div>
                    <div class="amount">
                    500.00 EGP
                    </div>

                </v-card>
            </v-col>
            <v-col>
                <v-card class="payment-card">

                    <div class="type d-flex justify-space-between">
                        <span class="title-fit">Available</span>
                        <v-tooltip bottom color="primary">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="d-flex align-center" elevation="2" icon rounded text color="primary" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-help</v-icon>
                                </v-btn>

                            </template>
                             <span style="color:#fff;font-size:14px">These are funds available to withdraw.</span>
                        </v-tooltip>

                    </div>
                    <div class="amount">
                        100.00 EGP
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h2 style="font-size:28px">Transactions</h2>
            </v-col>
        </v-row>
        <v-row class="mb-1" style="margin-top:-10px">

            <v-col>

                <!-- Table -->
                <v-data-table :headers="headers" :items="transactions" sort-by="id" class="elevation-1">
                         <template v-slot:[`item.trainee.fullname`]="{ item }">
                        <nuxt-link :to="'/coach/client/'+item.id" class="client-name"><img :src="getClientPhoto(item)" /> {{item.trainee.fullname}}</nuxt-link>
                    </template>
  <template v-slot:[`item.amount`]="{ item }">
                        {{item.amount}} EGP
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{convertDate(item.created_at)}}
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
export default {
    layout: 'CoachLayout',
    data() {
        return {
             breadcrumbPath: [{
                    text: 'Coach',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Payments',
                    disabled: false,
                },
            ],
            transactions: [],
            wallet: null,
            headers: [
                {
                    text: 'Trainee',
                    value: 'trainee.fullname'
                },
                {
                    text: 'Amount',
                    value: 'amount'
                },
                {
                    text: 'Date',
                    value: 'created_at',
                },
                {
                    text: 'type',
                    value: 'type'
                },

            ],
        }
    },
    mounted() {
        this.fetchWallet();
        this.fetchTransActions();
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
        async fetchWallet() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/coach-payment-wallet/list').then((response) => {
                this.wallet = response.data.data.data;
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)

            });
            myloader.close();
        },
        async fetchTransActions() {
            /*  ======= Start Loader  ======= */
            const myloader = this.$vs.loading({
                target: this.$refs.mycontainer,
                color: '#34BE82'
            })
            await this.$axios.get('/coach-payment-transactions/list').then((response) => {
                this.transactions = response.data.data.data;
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
    }
}
</script>

<style lang="scss">
.payment-card {
    padding: 1.5rem;
    margin-right: 2rem;
    font-size: 30px;

    .type {
        .title-fit {
            color: #000;
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 30px;
        }
    }

    .amount {
        color: $primary-color;
        font-weight: bold;
        font-size: 30px;
    }
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
