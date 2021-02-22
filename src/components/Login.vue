<template>
  <div class="vue-tempalte">
    <form @submit.prevent="userLogin" class="row justify-content-center">
      <div class="card shadow-sm" style="width: 30rem">
        <div class="card-body">
          <div
            class="spinner-border text-primary"
            role="status"
            id="berhasil"
            style="display: none"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <div class="alert alert-danger" id="eror" style="display: none">
            Username / Password Anda Salah!
          </div>
          <h3>Login Admin Page</h3>

          <div class="form-group mt-4">
            <label>Email</label>
            <input
              type="email"
              class="form-control form-control-lg"
              v-model="user.email"
              placeholder="Masukan Email Anda"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="user.password"
              placeholder="*****"
            />
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">
            Masuk
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push("/dashboard");
          document.getElementById("berhasil").style.display = "block";
        })
        .catch((error) => {
          // alert(error.message);
          console.log(error);
          document.getElementById("eror").style.display = "block";
        });
    },
  },
};
</script>