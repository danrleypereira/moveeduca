<template>
  <v-container fluid ma-0 pa-0>
    <v-container
      fluid ma-0 pa-0 xs12 md12
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md7 lg7>
      </v-flex>
      <v-flex xs12 md5 lg5 flex-column secondary>
      </v-flex>
    </v-container>

    <v-container>
      <v-card class="pa-4">

        <!-- Título -->
        <h2 v-if="tipo === 'mover'">
          {{ getTextFromI18n('$vuetify.projects.formulario.mover.title') }}
        </h2>
        <h2 v-else-if="tipo === 'particular'">
          {{ getTextFromI18n('$vuetify.projects.formulario.particular.title') }}
        </h2>
        <h2 v-else>
          {{ getTextFromI18n('$vuetify.projects.formulario.erro.titulo') }}
        </h2>

        <!-- Formulário do Projeto Mover -->
        <v-form v-if="tipo === 'mover'">
          <v-text-field
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.nome')"
            required
          />
          <v-text-field
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.areaInteresse')"
          />
          <v-textarea
            :label="getTextFromI18n('$vuetify.projects.formulario.mover.fields.motivo')"
          />
          <v-btn color="primary">
            {{ getTextFromI18n('$vuetify.projects.formulario.mover.fields.botao') }}
          </v-btn>
        </v-form>

        <!-- Formulário da Aula Particular -->
        <v-form v-else-if="tipo === 'particular'">
          <v-text-field
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.nome')"
            required
          />
          <v-text-field
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.idade')"
            type="number"
          />
          <v-select
            :label="getTextFromI18n('$vuetify.projects.formulario.particular.fields.materia')"
            :items="['Matemática', 'Português', 'Física']"
          />
          <v-btn color="primary">
            {{ getTextFromI18n('$vuetify.projects.formulario.particular.fields.botao') }}
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

  </v-container>
</template>

<script>
export default {
  computed: {
    tipo() {
      return this.$route.query.tipo;
    }
  },
  methods: {
    getTextFromI18n(elementName) {
      return this.$vuetify.lang.t(elementName);
    }
  }
}
</script>
