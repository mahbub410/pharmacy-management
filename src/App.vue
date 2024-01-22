<template>
  <Login></Login>
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
import Login from './components/Login.vue';
import TheToast from './components/TheToast.vue';
export default {
  data(){
    return{
      toasts:[
        // {
        //   type:"Success",
        //   message:"Done Successfully!"
        // },
        // {
        //   type:"Error",
        //   message:"Somthing wrong"
        // }
      ]
    }
  },
  components:{
    Login,
    TheToast
  },
  mounted(){
    this.$eventBus.on("toast",data=>{
      // console.log(data);
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