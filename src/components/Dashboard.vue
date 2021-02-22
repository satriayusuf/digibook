<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-6 col-sm-4">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <router-link to="/peminjaman">
              <div class="card mt-5">
                <div class="card-body">
                  <p
                    class="text-center duar"
                    style="font-size: 20px; text-decoration: none"
                  >
                    Peminjaman
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <router-link to="/list">
              <div class="card mt-5">
                <div class="card-body">
                  <p
                    class="text-center duarr"
                    style="font-size: 20px; text-decoration: none"
                  >
                    Daftar Buku
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <button
            type="submit"
            class="btn btn-dark btn-lg btn-block mt-3"
            @click="logOut()"
          >
            Log out
          </button>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-4">
        <img
          src="https://media.istockphoto.com/vectors/survey-vector-illustration-flat-mini-persons-concept-with-quality-vector-id1086068730?k=6&m=1086068730&s=170667a&w=0&h=5YrISTlsK3kvmRSpzJSvSE1V2d6T0Qu1z9LRXZZSGK8="
          alt=""
          width="500"
          height="auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.$router.push("/login");
      }
    });
  },
  methods: {
    logOut() {
      console.log("TES GAN");
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>