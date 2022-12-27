<template>
    <v-app id="inspire">
      <v-app-bar class="px-3" color="white" flat density="compact">
        <v-avatar color="grey-darken-1" size="32"></v-avatar>
  
        <v-spacer></v-spacer>
  
        <v-tabs centered color="grey-darken-2" v-model="tab">
          <v-tab v-for="link in links" :key="link" :value="link">
            {{ link }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
  
        <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32"></v-avatar>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col cols="12" sm="1">
  
            </v-col>
  
            <v-col cols="12" sm="10">
              <v-sheet min-height="70vh" rounded="lg">
                <!--  -->
                <ByMonth />
                <!-- <ByMonth v-if="tab == 'Por mês'" /> -->
                <!-- <ByInterval v-if="tab == 'Por intervalo'" /> -->
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
// import ByInterval from '@/components/ByInterval.vue'
export default {
  components: {
    ByMonth,
    // ByInterval
  },
  data: () => ({
    tab: 'Por mês',
    links: [
      'Por mês',
    //   'Por intervalo',
    ],
  }),
}
</script>