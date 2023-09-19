<template>
<v-row>
    <v-col>
        <v-card>
            <div class="truncate">
                <h2 class="font-weight-bolder">
                    12 Month Transformation
                </h2>
                <span>Weight Analysis</span>
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
                name: 'Current Weight',
                type: 'column',
                data: [130, 150, 115, 125, 160, 110, 120, 140, 100, 90, 170, 120]
            }, {
                name: 'Target Weight',
                type: 'line',
                data: [80, 145, 125, 100, 150, 75, 65, 115, 85, 80, 200, 120],
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
                            return value + ' Kilogram'
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
