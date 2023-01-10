<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <!-- Select the initial time -->
                <v-text-field name="start" label="Início" id="start" v-model="startTime"></v-text-field>
            </v-col>
            <v-col>
                <!-- Select the final time -->
                <v-text-field name="end" label="Final" id="end" v-model="endTime"></v-text-field>
            </v-col>
            <v-col>
                <v-btn @click="generateReport()" color="success" fab>
                    <v-icon color="white">mdi-check</v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <!-- <FileExporter v-if="printersIsNotNull" :json-obj-to-csv="printers"></FileExporter> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select :items="printers" v-model="printersModel" multiple label="Impressoras">
                    <template v-slot:prepend-item>
                        <v-list-item ripple @mousedown.prevent @click="toggle">
                            <v-list-item-action>
                                <v-icon :color="printersModel.length > 0 ? 'indigo darken-4' : ''">
                                    {{ icon }}
                                </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Selecionar todas
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                    </template>
                </v-select>
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
            printers: [],
            printersModel: [],
            startTime: '',
            endTime: '',
            reports: []
        };
    },
    methods: {
        generateReport() {
            this.$axios.post("/byInterval", {
                startTime: this.startTime,
                endTime: this.endTime,
                printers: this.printersModel
            })
                .then((data) => {
                    this.reports = data.data
                })
        },
        toggle() {
            this.$nextTick(()=>{
                if (this.allPrintersSelected) this.printersModel=[]
                else this.printersModel = this.printers.slice()
            })
        }
    },
    computed: {
        printersIsNotNull() {
            return this.printers.length;
        },
        allPrintersSelected(){
            return this.printersModel.length == this.printers.length
        },
        somePrintersSelected(){
            return this.printersModel.length>0 && !this.allPrintersSelected
        },
        icon () {
        if (this.allPrintersSelected) return 'mdi-close-box'
        if (this.somePrintersSelected) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    created() {
        this.$axios.get("printers")
            .then((data) => {
                this.printers = data.data.map(printer => {
                    return {
                        ...printer,
                        text: `${printer.ip} : ${printer.sn}`,
                        value: printer.id
                    }
                })
            })
    },
};

</script>

<style>

</style>