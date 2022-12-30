<template>
    <div>
        <a color="success" download="contadores.csv" :href="link">
            <v-btn color="success" fab>
                <v-icon> mdi-microsoft-excel </v-icon>
            </v-btn>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        jsonObjToCsv: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            textFile: "",
            link: "",
        }
    },
    methods: {
        createDataURL(text) {
            var data = new Blob([text], { type: "text/plain" })
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (this.textFile !== null) {
                window.URL.revokeObjectURL(this.textFile)
            }

            this.link = window.URL.createObjectURL(data)

            // return textFile;
        },

        parseToCsv(jsonArray) {
            let keys = Object.keys(jsonArray[0])
            keys = keys.filter((key) => {
                if (typeof jsonArray[0][key] !== "object") {
                    return key
                }
            })
            let headers = keys.join(";")
            console.warn(headers)
            let result = ""
            for (let line of jsonArray) {
                let objResult = []
                for (let key of keys) {
                    console.error(typeof line[key])
                    if (typeof line[key] !== "object") {
                        objResult.push(line[key])
                    } else {
                        objResult.push("-")
                    }
                }
                result = `${result}${objResult.join(";")}\r\n`
            }

            return `${headers}\r\n${result}`
        },
    },
    created() {
        this.createDataURL(this.parseToCsv(this.jsonObjToCsv))
    },
}
</script>

<style>
a {
    text-decoration: none;
}
</style>
:
