<template>
  <!-- <Login></Login> -->
  <router-view></router-view>

  <div class="toasts">
    <TheToast 
      v-for="(tost,i) in toasts" 
      :key="i"
      :tostType="tost.type"
      :message="tost.message"
    >
    </TheToast>
  </div>
</template>

<script>
import TheToast from './components/TheToast.vue';
import {eventBus} from './utils/eventBus';

export default {
  data(){
    return{
      toasts:[
        /*{
          type:"Success",
          message:"Done Successfully!"
        },
        {
          type:"Error",
          message:"Somthing wrong"
        }*/
      ]
    }
  },
  components:{
    TheToast
  },
  mounted(){
    eventBus.on("toast",data=>{
      this.toasts.push(data);
      this.removeOneToast();
    })
  },
  methods:{
    removeOneToast(){
      setTimeout(()=>{
        this.toasts.shift();
      },2222)
    }
  }
}
</script>

<style>

</style>