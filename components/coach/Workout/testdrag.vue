<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
const importupload = () => {
    if (process.client) {
        return {
            vue2Dropzone: () => import('vue2-dropzone')
        }
    }
    return {}
}


    export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    vueDropzone: Dropzone,
  },


   data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
    methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }

  }
</script>



<style lang="scss" scoped>
.newTemplate
{
  margin: 5px;
  align-items: center;
  text-align: center;
  font-size: 8px;
  height: 90%;
  padding: 15px;
  border: 1px solid #34BE82;
  border-radius:5% ;

    cursor: pointer;
}




.list-group-item
{
  padding: 10px 15px;
  box-shadow: rgb(240 240 240) 1px 1px 1px 1px;
}

.firstHalf {
    background-color: white;
    padding: 10px 0px 9px;
    padding-right: 10px;
    margin-right: 10px;
}

.secondHalf
{
background-color: rgb(246, 247, 251);
padding: 15px 9px 9px;
margin-top: 8px;




}

h2
{
  color:#34BE82;
}

.dashbox {
    background-color: transparent;
    border: dashed 2px #34BE82;
    height: 150px;
    transition: 300ms ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 20px;
    }

    &:hover {
        background-color: #34be8211;
        transition: 300ms ease-in-out;
    }
}

</style>
