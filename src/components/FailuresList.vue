<template>
    <v-container fluid>
        <v-row class="myCenter">
            <v-col class="myCenter">
                <!-- Select the initial time -->
                <v-text-field name="start" label="Início" id="start" v-model="startTime"></v-text-field>
            </v-col>
            <v-col class="myCenter">
                <!-- Select the final time -->
                <v-text-field name="end" label="Final" id="end" v-model="endTime"></v-text-field>
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
        <v-row v-for="report in reports" :key="report.id">
            <v-col>
                {{report.ip}} - {{report.sn}} 
            </v-col>
            <v-col>
                {{ report.endCounters?.total_copies + report.endCounters?.total_prints }}
            </v-col>
            <v-col>
                {{ report.endCounters?.total_scans }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            startTime:'',
            endTime:'',
            reports:[]
        }
    },
    methods: {
        getFailures(){
            this.$axios.post("/failures", {
                startTime: this.startTime,
                endTime: this.endTime
            })
            .then(data=>{
                this.reports = data.data
            })
            .catch(error=>{
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