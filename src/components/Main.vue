<template>
  <v-app>
    <v-app-bar elevation="24" rounded app class="topbar mx-auto pa-1">
      <v-tabs centered color="grey-darken-2" v-model="tab">
        <v-tab v-for="link in links" :key="link" :value="link">
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container fluid>
        <v-row color="grey lighten-3">
          <v-col cols="12" sm="1">

          </v-col>

          <v-col cols="12" sm="10">
            <v-sheet min-height="70vh" rounded="lg" elevation="18">
              <!--  -->
              <!-- <ByMonth /> -->
              <ByMonth v-if="byMonth" />
              <ByInterval v-if="byInterval" />
              <FailuresList v-if="listFailures" />
              <PrintersByDay v-if="printersByDay" />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="1">
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import ByMonth from '@/components/ByMonth.vue'
import ByInterval from '@/components/ByInterval.vue'
import FailuresList from '@/components/FailuresList.vue'
import PrintersByDay from '@/components/PrintersByDay.vue'
export default {
  components: {
    ByMonth,
    ByInterval,
    FailuresList,
    PrintersByDay
  },
  data: () => ({
    tab: 0,
    links: [
      'Por mês',
      'Por intervalo',
      'Falhas',
      'Impressoras por data'
    ],
  }),
  computed: {
    tabSel() {
      console.log('tabsel', this.tab)
      return this.tab
    },
    byMonth() {
      return this.tab == 0
    },
    byInterval() {
      return this.tab == 1
    },
    listFailures() {
      return this.tab == 2
    },
    printersByDay() {
      return this.tab == 3
    }

  },
}
</script>
<style>
  .topbar {
    width: fit-content;
    box-shadow: 0 25px 50px -12px rgba(255, 255, 255, 1);
  }
</style>