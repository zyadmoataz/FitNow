<template>
    <div class="fit_custom_bread d-flex align-center" style="padding:2px;margin-top: -25px;">
        <div class="current_path"  style="margin-inline-end:1rem;padding-inline-end:1rem;border-inline-end:1px solid #d6dce1;">
            {{breadcrumbPath.slice(-1).pop().text}}
        </div>
        <v-breadcrumbs :items="breadcrumbPath" class="fitnow_breadcrumbs">
            <template v-slot:divider>
                <v-icon>{{$vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right'}}</v-icon>
            </template>
        </v-breadcrumbs>
    </div>
</template>
<script>
export default {
  props:{
      breadcrumbPath:Array
  }
}
</script>
