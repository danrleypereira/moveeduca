<template>
  <v-container fluid ma-0 pa-0>
    <v-container
      fluid ma-0 pa-0 xs12 md12
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md7 lg7>
        <v-container>
          <v-card class="pa-4">

        <v-snackbar v-model="snackbar">
          {{ snackText }}
          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
              {{ this.$vuetify.lang.t('$vuetify.utils.close') }}
            </v-btn>
          </template>
        </v-snackbar>

        <!-- Título -->
        <h2 v-if="tipo === 'mover'">
          {{ getTextFromI18n('$vuetify.projects.formulario.mover.title') }}
        </h2>
        <h2 v-else-if="tipo === 'particular'">
          {{ getTextFromI18n('$vuetify.projects.formulario.particular.title') }}
        </h2>
        <h2 v-else-if="tipo === 'familia'">
          {{ getTextFromI18n('$vuetify.projects.formulario.familia.title') }}
        </h2>
        <h2 v-else>
          {{ getTextFromI18n('$vuetify.projects.formulario.erro.titulo') }}
        </h2>

        <!-- Formulário do Projeto Mover -->
        <v-form v-if="tipo === 'mover'" ref="formMover" v-model="validMover" lazy-validation>
          <v-text-field
            v-model="mover.nome"
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.nome')"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
          />
          <v-text-field
            v-model="mover.areaInteresse"
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.areaInteresse')"
          />
          <v-textarea
            v-model="mover.motivo"
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.motivo')"
          />
          <v-btn color="primary" :disabled="!validMover" @click="validateMover">
            {{ getTextFromI18n('$vuetify.projects.formulario.mover.fields.botao') }}
          </v-btn>
        </v-form>

        <!-- Formulário da Aula Particular -->
        <v-form v-else-if="tipo === 'particular'" ref="formParticular" v-model="validParticular" lazy-validation>
          <v-text-field
            v-model="particular.nome"
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.nome')"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
          />
          <v-text-field
            v-model="particular.idade"
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.idade')"
            type="number"
          />
          <v-select
            v-model="particular.materia"
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.materia')"
            :items="materias"
          />
          <v-btn color="primary" :disabled="!validParticular" @click="validateParticular">
            {{ getTextFromI18n('$vuetify.projects.formulario.particular.fields.botao') }}
          </v-btn>
        </v-form>

        <!-- Formulário Família Carente -->
        <v-form v-else-if="tipo === 'familia'" ref="formFamilia" v-model="validFamilia" lazy-validation>
          <p class="mb-4">{{ getTextFromI18n('$vuetify.projects.formulario.familia.description') }}</p>
          
          <v-text-field
            v-model="familia.nomeResponsavel"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.nomeResponsavel')"
            :rules="[v => !!v || 'Nome do responsável é obrigatório']"
            required
          />
          
          <v-text-field
            v-model="familia.cpf"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.cpf')"
            :rules="[v => !!v || 'CPF é obrigatório']"
            required
          />
          
          <v-text-field
            v-model="familia.telefone"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.telefone')"
            :rules="[v => !!v || 'Telefone é obrigatório']"
            required
          />
          
          <v-text-field
            v-model="familia.email"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.email')"
            type="email"
          />
          
          <v-text-field
            v-model="familia.endereco"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.endereco')"
            :rules="[v => !!v || 'Endereço é obrigatório']"
            required
          />
          
          <v-text-field
            v-model="familia.numFamiliares"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.numFamiliares')"
            type="number"
          />
          
          <v-text-field
            v-model="familia.rendaFamiliar"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.rendaFamiliar')"
          />
          
          <v-textarea
            v-model="familia.necessidades"
            :label="getTextFromI18n('$vuetify.projects.formulario.familia.fields.necessidades')"
            rows="3"
          />
          
          <v-btn color="primary" :disabled="!validFamilia" @click="validateFamilia" class="mb-4">
            {{ getTextFromI18n('$vuetify.projects.formulario.familia.fields.botao') }}
          </v-btn>
        </v-form>

        <!-- Mensagem de erro -->
        <div v-else>
          <p>{{ getTextFromI18n('$vuetify.projects.formulario.erro.instrucoes') }}</p>
          <div
            v-for="exemplo in getTextFromI18n('$vuetify.projects.formulario.erro.exemplos')"
            :key="exemplo"
          >
            <code>{{ exemplo }}</code>
          </div>
        </div>

      </v-card>
      </v-container>
      </v-flex>
      <v-flex xs12 md5 lg5 secondary class="scribble-background">
        <Aside />
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import Aside from "../../components/Aside";

export default {
  components: {
    Aside,
  },
  data() {
    return {
      validMover: true,
      validParticular: true,
      validFamilia: true,
      mover: {
        nome: '',
        areaInteresse: '',
        motivo: '',
      },
      particular: {
        nome: '',
        idade: '',
        materia: null,
      },
      familia: {
        nomeResponsavel: '',
        cpf: '',
        telefone: '',
        email: '',
        endereco: '',
        numFamiliares: '',
        rendaFamiliar: '',
        necessidades: '',
      },
      snackbar: false,
      snackText: '',
    };
  },
  computed: {
    tipo() {
      return this.$route.query.tipo;
    },
    materias() {
      return this.$vuetify.lang.locales.pt.projects.formulario.particular.fields.materias;
    }
  },
  methods: {
    getTextFromI18n(elementName) {
      return this.$vuetify.lang.t(elementName);
    },
    validateMover() {
      if (this.$refs.formMover.validate()) {
        const formData = {
          name: this.mover.nome,
          email: '',
          phone: '',
          subject: `Projeto Mover — Área: ${this.mover.areaInteresse} | Motivo: ${this.mover.motivo}`,
        };

        fetch('https://us-central1-moveeduca-org.cloudfunctions.net/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            this.snackText = data.message;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Failed to send the email:', error);
            this.snackText = 'Failed to send the email.';
          })
          .finally(() => this.snackbar = true);
      }
    },
    validateParticular() {
      if (this.$refs.formParticular.validate()) {
        const formData = {
          name: this.particular.nome,
          email: '',
          phone: this.particular.idade,
          subject: `Aula Particular — Matéria: ${this.particular.materia}`,
        };

        fetch('https://us-central1-moveeduca-org.cloudfunctions.net/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            this.snackText = data.message;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Failed to send the email:', error);
            this.snackText = 'Failed to send the email.';
          })
          .finally(() => this.snackbar = true);
      }
    },
    validateFamilia() {
      if (this.$refs.formFamilia.validate()) {
        const formData = {
          name: this.familia.nomeResponsavel,
          email: this.familia.email,
          phone: this.familia.telefone,
          subject: `Família Carente — CPF: ${this.familia.cpf} | Membros: ${this.familia.numFamiliares} | Renda: ${this.familia.rendaFamiliar} | Necessidades: ${this.familia.necessidades}`,
        };

        fetch('https://us-central1-moveeduca-org.cloudfunctions.net/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            this.snackText = data.message;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Failed to send the email:', error);
            this.snackText = 'Failed to send the email.';
          })
          .finally(() => this.snackbar = true);
      }
    },
  },
}
</script>
