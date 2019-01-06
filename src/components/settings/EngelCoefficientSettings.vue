<template lang="pug">
.engel-coefficient-settings
  el-card
    .card-header(slot="header")
      span {{title}}
      el-switch(v-model="aaaaaa")
    div Which category(or sub-category) did you use to record food?
    el-cascader(
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
    )

</template>

<script>
export default {
  name: "EngelCoefficientSettings",
  inject: ["$api"],
  data() {
    return {
      title: "Engel's Coefficient",
      categories: [],
      selectedOptions: null,
      // TODO $store
      aaaaaa: false
    };
  },
  computed: {
    options() {
      return this.categories.map(cate => {
        return {
          value: cate.category,
          label: cate.category,
          children: [
            {
              value: null,
              label: "ALL"
            },
            ...cate.subCategory.map(subCate => ({
              value: subCate,
              label: subCate
            }))
          ]
        };
      });
    }
  },
  created() {
    this.$api.get("/categories", { params: { type: "expense" } }).then(res => {
      this.categories = res.data.results;
    });
  },
  methods: {
    handleChange() {}
  }
};
</script>
