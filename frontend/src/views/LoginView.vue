<template>
    <div class="w-full h-full">
      <div class="auth-section h-full">
        <div class="flex h-full">
          <div class="w-3/12 flex items-center justify-center h-full rounded p-8">
            <div class="login-section w-full">
              <h1 class="text-center font-semibold text-gray-800 text-[36px]">
                ILearn
              </h1>
              <h1 class="text-center text-gray-500 text-[24px] my-4">
                Welcome back, Hasan!
              </h1>
              <div class="mt-8">
                  <v-form @submit.prevent>
                    <div>
                      <v-text-field
                        v-model="firstName"
                        placeholder="Email Address"
                        variant="outlined"
                        hide-details
                        color="primary"
                      ></v-text-field>
                    </div>
  
                    <div class="mt-3">
                      <v-text-field
                        variant="outlined"
                        v-model="password"
                        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        name="input-10-1"
                        placeholder="Your password"
                        hint="At least 8 characters"
                        hide-details
                        counter
                        @click:append-inner="showPassword"
                        color="primary"
                      ></v-text-field>
                    </div>
                    <div class="mt-3">
                      <v-btn size="large" color="primary" :elevation="0" type="submit" block class="mt-2" @click="login">Sign In</v-btn>
                    </div>
                  </v-form>
              </div>
            </div>
          </div>
          <div class="w-9/12 p-2 bg-image">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            saepe incidunt optio ipsa in similique iure, impedit ipsum odio
            aperiam reiciendis quasi magnam voluptas iusto quod ut quisquam quidem
            maiores.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        firstName: "",
        password: "",
        show: false,
      };
    },
    methods: {
      showPassword() {
        this.show = !this.show;
      },
      login() {
        console.log('hello')
      }
    },
  });
  </script>
  
  <style>
  .bg-image {
    background-image: url("https://images.unsplash.com/photo-1516575355332-d2934104e253?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
  }
  </style>
  