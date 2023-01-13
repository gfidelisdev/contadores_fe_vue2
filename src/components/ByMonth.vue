<template>
  <div>
    <v-container fluid>
      <v-row class="myCenter">
        <v-col class="myCenter">
          <!-- Selectors for month and year, and a submit button -->
          <v-select :items="months" v-model="month" label="Mês"></v-select>
        </v-col>
        <v-col class="myCenter">
          <v-select :items="years" v-model="year" label="Ano"></v-select>
        </v-col>
        <v-col class="myCenter">
          <v-btn @click="generateReport()" color="success" fab>
            <v-icon color="white">mdi-check</v-icon>
          </v-btn>
        </v-col>
        <v-col  class="myCenter">
          <FileExporter
            v-if="printersIsNotNull"
            :json-obj-to-csv="printers"
          ></FileExporter>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="printers"
            :items-per-page="100"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FileExporter from "./FileExporter";
export default {
  components: { FileExporter },
  data() {
    return {
      month: 1,
      months: [
        { text: "Janeiro", value: 1 },
        { text: "Fevereiro", value: 2 },
        { text: "Março", value: 3 },
        { text: "Abril", value: 4 },
        { text: "Maio", value: 5 },
        { text: "Junho", value: 6 },
        { text: "Julho", value: 7 },
        { text: "Agosto", value: 8 },
        { text: "Setembro", value: 9 },
        { text: "Outubro", value: 10 },
        { text: "Novembro", value: 11 },
        { text: "Dezembro", value: 12 },
      ],
      year: new Date().getFullYear(),
      years: Array(28)
        .fill(0)
        .map((e, i) => i + 2018),
      printers: [],
      headers: [
        { text: "SN", value: "sn", align: "center", sortable: true },
        { text: "IP", value: "ip", align: "center", sortable: true },
        {
          text: "Total de Impressões",
          value: "totalPrints",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Cópias",
          value: "totalCopies",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Cópias + Impressões",
          value: "totalPrintsPlusCopies",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Impressões Coloridas",
          value: "totalPrintsColor",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Cópias Coloridas",
          value: "totalCopiesColor",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Cópias + Impressões Coloridas",
          value: "totalPrintsPlusCopiesColor",
          align: "center",
          sortable: true,
        },
        {
          text: "Total de Digitalizações",
          value: "totalScans",
          align: "center",
          sortable: true,
        },
        {
          text: "Data e hora do primeiro contador obtido do mês",
          value: "startTime",
          align: "center",
          sortable: true,
        },
        {
          text: "Data e hora do último contador obtido do mês",
          value: "endTime",
          align: "center",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    generateReport() {
      this.$axios
        .post("/bymonth", {
          month: this.month,
          year: this.year,
        })
        .then((data) => {
          this.printers = data.data.map((item) => {
            console.warn(item);
            if (item.msg) {
              return {
                sn: item.sn,
                ip: item.ip,
                totalPrints: "Sem dados para o período",
                totalCopies: "Sem dados para o período",
                totalScans: "Sem dados para o período",
                totalPrintsPlusCopies: "Sem dados para o período",
                totalPrintsColor: "Sem dados para o período",
                totalCopiesColor: "Sem dados para o período",
                totalPrintsPlusCopiesColor: "Sem dados para o período",
                startTime: "Sem dados para o período",
                endTime: "Sem dados para o período",
              };
            }
            return {
              totalPrintsPlusCopies: item.totalPrints + item.totalCopies,
              totalPrintsPlusCopiesColor: item.totalPrintsColor + item.totalCopiesColor,
              ...item,
            };
          });
        });
    },
  },
  computed: {
    printersIsNotNull() {
      return this.printers.length;
    },
  },
};
</script>

<style>

</style>
