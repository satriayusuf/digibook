<template>
  <div>
    <router-link to="/dashboard" class="btn btn-warning"> Kembali </router-link>
    <div class="row justify-content-center mt-5">
      <div class="card">
        <div class="card-header alert-primary">
          <h3>{{ buku.namabuku }}</h3>
        </div>
        <img v-bind:src="buku.url" class="card-img-top w-100" />
        <div class="card-body" v-html="buku.isi"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      key: this.$route.params.id,
      buku: {},
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("Perpus")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.buku = doc.data();
      } else {
        alert("tidak ada");
      }
    });
  },
};
</script>