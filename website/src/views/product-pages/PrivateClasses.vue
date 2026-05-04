<template>
  <div class="dashboard">
    <h1>{{ $vuetify.lang.t('$vuetify.privateClassesPage.title') }}</h1>
    <p>
      {{ $vuetify.lang.t('$vuetify.privateClassesPage.description') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PrivateClasses',
  methods: {
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
};
</script>