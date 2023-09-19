<template>
<v-row>
    <v-col>
        <v-card>
            <div class="truncate">
                <h2 class="font-weight-bolder">
                    50,398 EGP
                </h2>
                <span>Payment Growth</span>
            </div>
            <client-only>
                <apexchart type="line" height="450" :options="chartOptions" :series="series"></apexchart>
            </client-only>
        </v-card>

    </v-col>
</v-row>
</template>

<script>
export default {

    data() {
        return {
            series: [{
                name: 'Revenue',
                type: 'column',
                data: [5000, 7000, 4000, 6000, 9000, 4000, 4060, 6500, 3000, 2500, 10000, 6000]
            }, {
                name: 'Connected Clients',
                type: 'line',
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 60, 35],
            }],

            chartOptions: {
               colors: ['#546E7A', '#28c76f'],

                chart: {
                    height: 350,
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                },
                stroke: {
                    width: [0, 4]
                },

                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: ['01 Jan', '01 Feb', '01 Mars', '01 April', '01 May', '01 Jun', '01 July', '01 Aug', '01 Sep', '01 Oct', '01 Nov', '01 Dec'],
              
                yaxis: [{
                    type: 'number',
                      
                    labels: {
                        show: true,
                        formatter: (value) => {
                            return value + ' EGP'
                        },
                    },
                }, {
                    opposite: true,

                }]
                
            },

        }
    }
}
</script>

<style lang="scss" scoped>
.truncate {
    padding: 1rem;

    h2 {
        font-size: 2rem;
        font-weight: bold;
        color: #34be82;
    }

    span {
        font-weight: bold;
        color: #4c4b62;
        font-size: 1.1em;
    }
}
</style>
