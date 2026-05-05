<template>
    <v-container>
        <v-col cols="auto">
            <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600">
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary text-h3" dark>
                            {{ currentDialog.title }}
                        </v-toolbar>
                        <v-card-text>
                            <div class="text-h5 pa-12">{{ currentDialog.description }}</div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="dialog.value = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
        <v-flex>
            <v-container>
                <v-row class="text-center">
                    <v-col cols="12">
                        <h1>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.welcome') }} Move&Educa</h1>
                    </v-col>
                </v-row>

                <v-row class="mt-5">
                    <v-col cols="12">
                        <h2>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.mission.head') }}</h2>
                        <p>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.mission.content') }}</p>

                        <h2>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.vision.head') }}</h2>
                        <p>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.vision.content') }}</p>
                    </v-col>
                </v-row>

                <v-row class="mt-5">
                    <v-col cols="12">
                        <h2>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.values') }}</h2>

                        <v-list>
                            <v-list-item-group>
                                <v-list-item v-for="value in getValues()" :key="value.title" @click="openDialog(value)" class="clickable-item">
                                    <template v-slot:prepend>
                                        <v-icon color="primary" class="mr-2">mdi-chevron-right</v-icon>
                                    </template>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="value.title"></v-list-item-title>
                                        <v-list-item-subtitle v-text="value.description"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>

                <v-row class="mt-5">
                    <v-col cols="12">
                        <h2>{{ this.$vuetify.lang.t('$vuetify.organanizationPage.twentyOneCenturySkills.head') }}</h2>

                        <v-list>
                            <v-list-item-group>
                                <v-list-item v-for="skill in getSkills()" :key="skill" @click="openSkillDialog(skill)" class="clickable-item">
                                    <template v-slot:prepend>
                                        <v-icon color="primary" class="mr-2">mdi-chevron-right</v-icon>
                                    </template>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="skill"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-container>
</template>
  
<script>

export default {
    data() {
        return {
            currentDialog: {
                title: '',
                description: ''
            },
            dialog: false,
        };
    },
    methods: {
        openDialog(item) {
            this.currentDialog.title = item.title;
            this.currentDialog.description = item.description;
            // To open the dialog programmatically:
            this.dialog = true;
        },
        openSkillDialog(skill) {
            this.currentDialog.title = this.$vuetify.lang.t('$vuetify.organanizationPage.twentyOneCenturySkills.dialogTitle');
            this.currentDialog.description = skill; // Assuming there's no description for skills
            this.dialog = true;
        },
        getSkills: function () {
            let i = 0;
            const skills = []
            while (i < Infinity) {
                let skill = this.$vuetify.lang.t(`$vuetify.skills[${i}]`);
                if (skill === `$vuetify.skills[${i++}]`) //skill not found
                    break;
                skills.push(skill);
            }
            return skills;
        },
        getValues: function () {
            let i = 0;
            const values = [];
            while (i < Infinity) {
                let title = this.$vuetify.lang.t(`$vuetify.values[${i}].title`);
                if (title === `$vuetify.values[${i}].title`) //value index not found
                    break;
                let description = this.$vuetify.lang.t(`$vuetify.values[${i++}].description`);
                values.push({ title: title, description: description });
            }
            return values;
        }
    }
};
</script>

<style scoped>
.clickable-item {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin-bottom: 4px;
}

.clickable-item:hover {
    background-color: rgba(25, 118, 210, 0.12) !important;
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.clickable-item:hover .v-icon {
    animation: bounce-right 0.5s ease infinite;
}

@keyframes bounce-right {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
}
</style>
  