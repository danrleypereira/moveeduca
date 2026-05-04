<template>
  <div class="dashboard">
    <v-container fluid ma-0 pa-0 xs12 md12 class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row">
      <v-flex xs12 md9 lg9 class="">
        <v-snackbar v-model="snackbar">
          {{ snackText }}

          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
            {{ this.$vuetify.lang.t('$vuetify.utils.close') }}
            </v-btn>
          </template>
        </v-snackbar>
        <h1>{{ this.getTextFromI18n('$vuetify.contactPage.title') }}</h1>
        <v-flex ma-4>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules"
              :label="this.getTextFromI18n('$vuetify.contactForm.name.label')"
              :hint="this.getTextFromI18n('$vuetify.contactForm.certo')" required></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required
              :hint="this.getTextFromI18n('$vuetify.contactForm.certo')"></v-text-field>

            <v-text-field v-model="phone" :rules="phoneRules"
              :label="this.getTextFromI18n('$vuetify.contactForm.phone.label')"
              :hint="this.getTextFromI18n('$vuetify.contactForm.certo')"></v-text-field>

            <v-select v-model="select" :items="items()"
              :rules="[v => !!v || this.getTextFromI18n('$vuetify.contactForm.item.required')]"
              :label="this.getTextFromI18n('$vuetify.contactForm.item.label')" required></v-select>

            <v-textarea v-model="description"
              :rules="descriptionRules"
              :label="this.getTextFromI18n('$vuetify.contactForm.description.label')"
              :hint="this.getTextFromI18n('$vuetify.contactForm.description.hint')"></v-textarea>

            <v-checkbox v-model="checkbox"
              :rules="[v => !!v || this.getTextFromI18n('$vuetify.contactForm.agree.required')]"
              :label="this.getTextFromI18n('$vuetify.contactForm.agree.message')" required></v-checkbox>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
              {{ this.getTextFromI18n('$vuetify.contactForm.actions.submit') }}
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              {{ this.getTextFromI18n('$vuetify.contactForm.actions.clearForm') }}
            </v-btn>
          </v-form>
        </v-flex>
      </v-flex>
      <v-flex xs12 md3 lg3 secondary class="scribble-background">
        <Aside />
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Aside from "../../components/Aside";

export default {
  components: {
    Aside,
  },
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || this.getTextFromI18n('$vuetify.contactForm.name.required'),
        v => (v && v.length <= 100) || this.getTextFromI18n('$vuetify.contactForm.name.notValid'),
      ],
      email: '',
      emailRules: [
        v => !!v || this.getTextFromI18n('$vuetify.contactForm.email.required'),
        v => /.+@.+\..+/.test(v) || this.getTextFromI18n('$vuetify.contactForm.email.notValid'),
      ],
      phone: '',
      phoneRules: [
        v => !!v || this.getTextFromI18n('$vuetify.contactForm.phone.required'),
        v => /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(v) || this.getTextFromI18n('$vuetify.contactForm.phone.notValid'),
      ],
      select: null,
      items: () => this.getItems(),
      description: '',
      descriptionRules: [
        v => !v || v.length <= 500 || this.getTextFromI18n('$vuetify.contactForm.description.tooLong'),
      ],
      checkbox: false,
      snackbar: false,
      snackText: '',
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          subject: this.select,
          description: this.description
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
            this.snackText =  "Failed to send the email.";
          })
          .finally(() => this.snackbar = true );
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
    getItems: function () {
      const items = [];
      const maxItems = 20; // Limite seguro
      for (let i = 0; i < maxItems; i++) {
        const item = this.$vuetify.lang.t(`$vuetify.contactForm.item.items[${i}]`);
        if (item === `$vuetify.contactForm.item.items[${i}]`) {
          break; // Item não encontrado
        }
        items.push(item);
      }
      return items;
    },
  },
};
</script>
