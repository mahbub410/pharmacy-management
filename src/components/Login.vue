<template>
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img src="/img/lock.png" class="login-card__icon" alt="" />
        <h2>User Login</h2>
      </div>
 
      <form action="#" @submit.prevent="handleSubmit">
        <label class="block" style="display:table">Email</label>
        <input type="text" placeholder="Enter your username" 
        v-model="fromData.username" ref="username"/>

        <label class="block mt-3" style="display:table">Password</label>
        <input type="password" placeholder="Enter password" 
        v-model="fromData.passwoard" required ref="passwoard"/>

        <p class="text-center mt-3" v-if="loggingIn">Logging in...</p>
        <button type="submit" class="w-100 mt-3" v-else>Login</button>

        <div class="d-flex jc-between mt-3">
          <div>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          
          <div>
            <a href="#">Forgot Password</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
          fromData:{
              username:"",
              passwoard:""
          },
          loggingIn: false,
          movedToRight: false,
          showing: false
    }
  },
  methods: {
    handleSubmit(){
      if(!this.fromData.username){
        // alert('entry your username')
        this.$eventBus.emit("toast",{
          type:"Error",
          message:"entry your username"
        })
        this.$refs.username.focus();
        return
      }
      if(this.fromData.passwoard.length<4){
        //alert('passwoard morethen 4 character or digit')
        this.$eventBus.emit("toast", {
          type:"Error",
          message:"passwoard morethen 4 character or digit"
        })
        this.$refs.passwoard.focus();
        return
      }
      // console.log('...submit..sucess..')
      //  console.log(this.fromData);
      this.loggingIn = true;
      axios.post("https://api.rimoned.com/api/pharmacy-management/v1/login",
        this.fromData
      )
      .then((res)=>{
        console.log(res.data);
        this.$eventBus.emit("toast",{
          type: "Success",
          message: res.data.message
        });
      })
      .catch((err)=>{
          let errMessage ="Something Wrong.!"
          if(err.response){
            errMessage = err.response.data.message
          }
          this.$eventBus.emit("toast",{
            type: "Error",
          message: errMessage
          })
      })
      .finally(()=>{
          this.loggingIn=false;
      });
    }
  },
};
</script>

<style>
.box {
  /* width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px;
  transition: all 0.5s; */
}

/* .box--right {
  margin-left: 222px;
} */

.box1 {
  /* width: 55px;
  height: 55px;
  background-color: greenyellow;
  margin-bottom: 22px; */
  /* animation: showhide 1s ease-in; */
}

.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="text"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}

/* @keyframes showhide {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
} */

.showhide-enter-active {
  animation: showhide 1s ease-in;
  /* transition: all 0.5s; */
}
.showhide-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.showhide-enter-to {
  opacity: 1;
  transform: scale(0.5);
}

.showhide-leave-active {
  animation: showhide 1s ease-in reverse;
  /* transition: all 0.5s; */
}
.showhide-leave-from {
  opacity: 1;
  transform: scale(1);
}

.showhide-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
