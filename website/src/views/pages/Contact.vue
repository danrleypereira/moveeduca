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
        <h1>Contact</h1>
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

            <v-checkbox v-model="checkbox"
              :rules="[v => !!v || this.getTextFromI18n('$vuetify.contactForm.agree.required')]"
              :label="this.getTextFromI18n('$vuetify.contactForm.agree.message')" required></v-checkbox>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
              {{ this.getTextFromI18n('$vuetify.contactForm.actions.submit') }}
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              {{ this.getTextFromI18n('$vuetify.contactForm.actions.resetInputs') }}
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
              {{ this.getTextFromI18n('$vuetify.contactForm.actions.resetValidation') }}
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
        v => (v && v.length <= 10) || this.getTextFromI18n('$vuetify.contactForm.name.notValid'),
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
          phone: this.phone, // Make sure to add the phone input in your form
          subject: this.select
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
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
    getItems: function () {
      let i = 0;
      const items = []
      while (i < Infinity) {
        let item = this.$vuetify.lang.t(`$vuetify.contactForm.item.items[${i}]`);
        if (item === `$vuetify.contactForm.item.items[${i++}]`) //item not found
          break;
        items.push(item);
      }
      return items;
    },
  },
};
</script>
