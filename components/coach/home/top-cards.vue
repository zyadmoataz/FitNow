<template>
<v-row>
    <v-col md="4">
        <v-card to="/coach/clients/all">
            <div class="truncate">
                <h2 class="font-weight-bolder">
                    50
                </h2>
                <span> Connected Clients</span>
            </div>
            <client-only>
                <apexchart type="line" height="100" width="100%" :options="activeChartOptions" :series="seriesConnected"></apexchart>

            </client-only>
        </v-card>
    </v-col>
    <v-col md="4">
        <v-card to="/coach/clients/pending">
            <div class="truncate">
                <h2 class="font-weight-bolder" style="color:#ff9234">
                    80
                </h2>
                <span> Pending Clients</span>
            </div>
            <client-only>
                <apexchart type="line" height="100" width="100%" :options="PendingChartOptions" :series="seriesPending"></apexchart>

            </client-only>
        </v-card>
    </v-col>
    <v-col md="4">
        <v-card to="/coach/clients/all">
            <div class="truncate">
                <h2 class="font-weight-bolder" style="color:#7e7e7e">
                    10
                </h2>
                <span> DisConnected Clients</span>
            </div>
            <client-only>
                <apexchart type="line" height="100" width="100%" :options="DisconnectedChartOptions" :series="seriesDisConnected"></apexchart>

            </client-only>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    data() {
        return {
            statistic: 50,
            statisticTitle: "AAA",
            seriesConnected: [{
                name: 'count',
                data: [75, 125, 225, 175, 50, 75, 25],
            }, ],
            seriesPending: [{
                name: 'count',
                data: [5, 10, 40, 20, 50, 75, 25],
            }, ],
            seriesDisConnected: [{
                name: 'count',
                data: [200, 100, 50, 175, 50, 75, 25],
            }, ],
            activeChartOptions: {
                grid: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    sparkline: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 2.5,
                },

                xaxis: {
                    type: 'numeric',
                    lines: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false
                    },
                },
                yaxis: [{
                    y: 0,
                    offsetX: 0,
                    offsetY: 0,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                }, ],
                tooltip: {
                    x: {
                        show: false
                    },
                },
                theme: {
                    monochrome: {
                        enabled: true,
                        color: "#28c76f",
                        shadeTo: 'light',
                        shadeIntensity: 0.65,
                    },
                },
            },
            PendingChartOptions: {
                grid: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    sparkline: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 2.5,
                },

                xaxis: {
                    type: 'numeric',
                    lines: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false
                    },
                },
                yaxis: [{
                    y: 0,
                    offsetX: 0,
                    offsetY: 0,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                }, ],
                tooltip: {
                    x: {
                        show: false
                    },
                },
                theme: {
                    monochrome: {
                        enabled: true,
                        color: "#ff9234",
                        shadeTo: 'light',
                        shadeIntensity: 0.65,
                    },
                },
            },
            DisconnectedChartOptions: {
                grid: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    sparkline: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 2.5,
                },

                xaxis: {
                    type: 'numeric',
                    lines: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false
                    },
                },
                yaxis: [{
                    y: 0,
                    offsetX: 0,
                    offsetY: 0,
                    padding: {
                        left: 0,
                        right: 0,
                    },
                }, ],
                tooltip: {
                    x: {
                        show: false
                    },
                },
                theme: {
                    monochrome: {
                        enabled: true,
                        color: "#7e7e7e",
                        shadeTo: 'light',
                        shadeIntensity: 0.65,
                    },
                },
            }

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
