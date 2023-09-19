<template>
<v-dialog v-model="dialog" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
         <v-icon small class="mr-2" v-bind="attrs" v-on="on">
                mdi-pencil
            </v-icon>
    </template>
    <v-card class="fit-dailog-card">
        <v-card-title class="fit-card-title-dialog">
            Edit Program
        </v-card-title>
        <v-card-text style="padding:0">

            <v-form ref="form" lazy-validation class="form" style="padding:1rem 0">
                <v-row style="margin:0">
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="editedItem.programName" placeholder="Add program title" label="Program Title" clearable outlined :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-textarea outlined v-model="editedItem.description" label="DESCRIPTION " placeholder="Add program description" rows="3" :rules="[v => !!v || 'This filed is required']"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="12" style="padding:0">
                        <v-text-field v-model="editedItem.Week" type="number" min="1" class="" value="1" outlined placeholder="Weeks" :rules="[v => !!v || 'This filed is required']"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" style="padding:0;">
                        <v-select :items="owner" label="OWNER" outlined placeholder="choose owner" v-model="editedItem.owner" :rules="[v => !!v || 'This filed is required']"></v-select>
                    </v-col>

                    <v-col cols="12" md="12" style="padding:0;">
                        <v-select :items="shareWith" v-model="editedItem.shareWith" label="SHARE WITH ORG?" outlined placeholder="choose share with who" :rules="[v => !!v || 'This filed is required']"></v-select>
                    </v-col>

                </v-row>
                </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=" darken-1" text large style="padding: 1rem 2rem;"   @click="close">
                Cancel
            </v-btn>
            <v-btn color="primary" large style="padding: 1rem 2rem;"  @click="save">
                Save
            </v-btn>
        </v-card-actions>

                </v-card>
            </v-dialog>

</template>


<script>

  export default {
    data: () => ({

    search: '',
    programName:'',
    description:'',
    Week:1,
    owner: ['ahmed alaa', ],
    shareWith: ['Private to owner', 'share with another', ],
    dialog: false,
    dialogDelete: false,

   }),
   props:{
editedItem:Object
   },

     methods: {
       Preview_image() {
      this.url= URL.createObjectURL(this.image)
    },
    async Register() {
            const myloader = this.myloading = this.$vs.loading({
                color: '#34BE82'
            });
            const data = {
              name:this.name
            }

          /*  await this.$axios.post('/register', mydate).then((response) => {

                myloader.close();
                console.log(response)

            }).catch(function (error) {
                console.log(error.response)


                myloader.close();

            });*/
        },
     save () {
        if (this.$refs.form.validate()) {
                this.$emit('save', {
                    data: {
                        programName: this.programName,
                        Week: this.Week,
                        owner: this.owner,
                        shareWith: this.shareWith,
                    }
                });
                  var mydata = this.$props.editedItem;
                  this.close();
            }
      },
      close() {
            this.dialog = false

        },
  },

  }
</script>

<style lang="scss" scoped>
.firstHalf {
    background-color: white;
    padding: 15px 0px 9px;
    padding-right: 10px;
    margin-right: 5px;
}
.aa
{
  background-color: rgb(246, 247, 251);

}
.secondHalf
{
background-color: rgb(246, 247, 251);
padding: 15px 9px 9px;


}
.media
{
  display: flex;
    align-items: center;
    justify-content: center;

}
h2
{
  color:#34BE82;
}

.abc
{

  position: relative;
  overflow: hidden;

}

.x {
    position: absolute;
    background: #34BE82;
    top: -10px;
    right: -10px;

}

</style>
