<template>
  <div class="general-form">
    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          {{ this.$vuetify.lang.t('$vuetify.utils.close') }}
        </v-btn>
      </template>
    </v-snackbar>

    <h2>{{ this.$vuetify.lang.t('$vuetify.generalForm.title') }}</h2>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        :label="this.getTextFromI18n('$vuetify.generalForm.name.label')"
        :hint="this.getTextFromI18n('$vuetify.generalForm.certo')"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        :label="this.getTextFromI18n('$vuetify.generalForm.email.label')"
        required
        :hint="this.getTextFromI18n('$vuetify.generalForm.certo')"
      ></v-text-field>

      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        :label="this.getTextFromI18n('$vuetify.generalForm.phone.label')"
        :hint="this.getTextFromI18n('$vuetify.generalForm.certo')"
      ></v-text-field>

      <v-text-field
        v-model="subject"
        :label="this.getTextFromI18n('$vuetify.generalForm.subject.label')"
        readonly
        disabled
        :hint="this.getTextFromI18n('$vuetify.generalForm.subject.hint')"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || this.getTextFromI18n('$vuetify.generalForm.agree.required')]"
        :label="this.getTextFromI18n('$vuetify.generalForm.agree.message')"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        {{ this.getTextFromI18n('$vuetify.generalForm.actions.submit') }}
      </v-btn>

      <v-btn color="error" class="mr-4" @click="cancel">
        {{ this.getTextFromI18n('$vuetify.generalForm.actions.cancel') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'GeneralForm',
  props: {
    projectType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || this.getTextFromI18n('$vuetify.generalForm.name.required'),
        v => (v && v.length <= 10) || this.getTextFromI18n('$vuetify.generalForm.name.notValid'),
      ],
      email: '',
      emailRules: [
        v => !!v || this.getTextFromI18n('$vuetify.generalForm.email.required'),
        v => /.+@.+\..+/.test(v) || this.getTextFromI18n('$vuetify.generalForm.email.notValid'),
      ],
      phone: '',
      phoneRules: [
        v => !!v || this.getTextFromI18n('$vuetify.generalForm.phone.required'),
        v => /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(v) || this.getTextFromI18n('$vuetify.generalForm.phone.notValid'),
      ],
      checkbox: false,
      snackbar: false,
      snackText: '',
    }
  },
  computed: {
    subject() {
      const projectNames = {
        'robotica': 'Robótica',
        'mlh': 'MLH',
        'coaching': 'Assessoria e Treinamento',
        'graduation': 'Graduação',
        'sicatroli': 'SICATROLI',
        'familia': 'Família Carente',
        'particular': 'Aula Particular',
        'mover': 'Projeto Mover'
      };
      return projectNames[this.projectType] || this.projectType;
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          subject: `[${this.subject}] Contato via formulário`
        };

        fetch('https://us-central1-moveeduca-org.cloudfunctions.net/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              this.snackText = data.message;
            } else {
              this.snackText = data.message;
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error("Failed to send the email:", error);
            this.snackText = "Failed to send the email.";
          })
          .finally(() => this.snackbar = true);
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
};
</script>

<style scoped>
.general-form {
  padding: 20px;
}
</style>
