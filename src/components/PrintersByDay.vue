<template>
    <v-container fluid>
        <v-row class="myCenter">
            <v-col class="myCenter">
                <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateFormatted"
                            label="Date"
                            hint="formato DD/MM/YYYY"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            @blur="date = parseDate(dateFormatted)"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        format="dd/MM/yyyy"
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                        locale="pt-BR"
                    ></v-date-picker>
                </v-menu>
            </v-col>
            <v-col class="myCenter">2</v-col>
            <v-col class="myCenter">3</v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: (vm) => ({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        dateFormatted: vm.formatDate(
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
        ),
        menu1: false,
        menu2: false,
    }),

    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
    },

    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },

    methods: {
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split("-")
            return `${month}/${day}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split("/")
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
        },
    },
}
</script>

<style></style>
