<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sqlyog Download Pages </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <SqlyogDownloadLink
        v-for="link in sqlyogDownloadLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import SqlyogDownloadLink from "components/SqlyogDownloadLink.vue";

import { defineComponent, ref, onMounted } from "vue";
import { linkParse } from "../js/link.parser";

const linksList = [
  {
    title: "Github",
    caption: "github.com/rxcats/sqlyog-download-pages",
    icon: "code",
    link: "https://github.com/rxcats/sqlyog-download-pages",
  }
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink, SqlyogDownloadLink
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const sqlyogDownloadLinks = ref([]);

    onMounted(() => {
      linkParse().then(data => {
        sqlyogDownloadLinks.value = data.map(v => {
          return {
            caption: v.link,
            title: v.filename,
            icon: "code",
            link: v.link
          }
        });
      });
    });

    return {
      essentialLinks: linksList,
      sqlyogDownloadLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
