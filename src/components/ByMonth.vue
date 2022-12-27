<template>
    <div>
        <div>teste</div>
        <v-container fluid>
            <v-row>
                <v-col>
                    <!-- Selectors for month and year, and a submit button -->
                    <v-select :items="months" v-model="month" label="Mês"></v-select>
                </v-col>
                <v-col>
                    <v-select :items="years" v-model="year" label="Ano"></v-select>
                </v-col>
                <v-col>
                    <v-btn @click="generateReport()" color="success" fab>
                        <v-icon color="white">mdi-check</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div>
                        SN
                    </div>
                </v-col>
                <v-col>IP</v-col>
                <v-col>Total de Impressões</v-col>
                <v-col>Total de Cópias</v-col>
                <v-col>Total de Cópias+Impressões</v-col>
                <v-col>Total de Digitalizações</v-col>
                <v-col>Início</v-col>
                <v-col>Fim</v-col>
            </v-row>
            <v-row v-for="printer in printers" :key="printer.id">
                <template v-if="printer.msg">
                    <v-col>{{ printer.msg }}</v-col>
                </template>
                <template v-else>
                    <v-col>
                        <div>
                            {{ printer.sn }}
                        </div>
                    </v-col>
                    <v-col>{{ printer.ip }}</v-col>
                    <v-col>{{ printer.totalPrints }}</v-col>
                    <v-col>{{ printer.totalCopies }}</v-col>
                    <v-col>{{ printer.totalCopies + printer.totalPrints }}</v-col>
                    <v-col>{{ printer.totalScans }}</v-col>
                    <v-col>{{ printer.startTime }}</v-col>
                    <v-col>{{ printer.endTime }}</v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            month: 1,
            months: [
                { text: 'Janeiro', value: 1 },
                { text: 'Fevereiro', value: 2 },
                { text: 'Março', value: 3 },
                { text: 'Abril', value: 4 },
                { text: 'Maio', value: 5 },
                { text: 'Junho', value: 6 },
                { text: 'Julho', value: 7 },
                { text: 'Agosto', value: 8 },
                { text: 'Setembro', value: 9 },
                { text: 'Outubro', value: 10 },
                { text: 'Novembro', value: 11 },
                { text: 'Dezembro', value: 12 }
            ],
            year: new Date().getFullYear(),
            years: Array(28).fill(0).map((e, i) => i + 2018),
            printers: {}
        }
    },
    methods: {
        generateReport() {
            console.log(this.month)
            console.log(this.year)
            this.$axios.post('/bymonth', {
                month: this.month,
                year: this.year
            })
                .then(data => {
                    this.printers = data.data
                    console.log(this.printers)
                })

        }
    },
}
</script>
  
<style>

</style>
  