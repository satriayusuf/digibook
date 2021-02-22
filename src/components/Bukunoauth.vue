<template>
  <div>
    <router-link to="/" class="btn btn-warning"> Kembali </router-link>
    <div class="row justify-content-center mt-5">
      <div class="card">
        <div class="card-body">
          <h2 style="color: #505050" class="text-center">
            {{ buku.namabuku }}
          </h2>
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