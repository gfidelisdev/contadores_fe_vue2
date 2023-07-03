<template>
    <v-container fluid>
        <v-snackbar v-model="snackbar" absolute centered>
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="info" text v-bind="attrs" @click="snackbar = false">
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
        <v-row class="myCenter">
            <v-col class="myCenter d-flex flex-column">
                <!-- Select the initial time -->
                <!-- <v-text-field name="start" label="Início" id="start" v-model="startTime"></v-text-field> -->
                <v-date-picker v-model="startTime" locale="pt-br"></v-date-picker>
                <div>Início</div>

            </v-col>
            <v-col class="myCenter d-flex flex-column">
                <!-- Select the final time -->
                <!-- <v-text-field name="end" label="Final" id="end" v-model="endTime"></v-text-field> -->
                <v-date-picker v-model="endTime" locale="pt-br"></v-date-picker>
                <div>Fim</div>
            </v-col>
            <v-col class="myCenter">
                <v-btn @click="getFailures()" color="success" fab>
                    <v-icon color="white">mdi-check</v-icon>
                </v-btn>
            </v-col>
            <v-col class="myCenter">
                <!-- <FileExporter v-if="printersIsNotNull" :json-obj-to-csv="printers"></FileExporter> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col>Status</v-col>
            <v-col>
                Impressora
            </v-col>
            <v-col>Localização</v-col>
            <v-col>IP</v-col>
            <v-col>Horário da falha</v-col>
        </v-row>
        <v-row v-for="report in reports" :key="report.id">
            <v-col>
                <!-- <v-chip class="ma-2" :color="report.printer.status ? 'green' : 'red'" text-color="white">
                    {{ report.printer.status ? 'Online' : 'Offline' }}
                </v-chip> -->
                <v-btn :color="report.printer.status ? 'green' : 'red'" fab x-small>{{ report.printer.status }}</v-btn>
            </v-col>

            <v-col>
                {{ report.printer.sn }}
            </v-col>
            <v-col>{{ report.printer.location }}</v-col>
            <v-col>
                <a :href="`https://${report.printer.ip}`" target="_blank">{{ report.printer.ip }}</a>
            </v-col>
            <v-col>
                {{ report.failure_time | formatDate }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { formatDate } from "@/filters/filters"
export default {
    data() {
        return {
            startTime: '',
            endTime: '',
            reports: [],
            snackbar: false,
            text: 'Não houveram falhas',

        }
    },
    filters: {
        formatDate
    },
    methods: {
        getFailures() {
            this.$axios.post("/failures", {
                startTime: this.startTime,
                endTime: this.endTime
            })
                .then(data => {
                    this.reports = data.data
                    console.log("🚀 ~ file: FailuresList.vue:90 ~ getFailures ~ this.reports:", this.reports)
                    if (this.reports.length === 0) {
                        this.snackbar = true
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
}
</script>

<style>
.center {
    display: flex;
    justify-content: center;
}
</style>