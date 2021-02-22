<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Tambah Buku</h3>
      <form @submit.prevent="onFormSubmit">
        <div class="form-group mt-5">
          <label>Nama Buku</label>
          <input
            type="text"
            class="form-control"
            v-model="user.namabuku"
            required
          />
        </div>

        <div class="form-group">
          <label>Isi</label>
          <textarea
            v-model="user.isi"
            required
            cols="30"
            rows="10"
            class="form-control"
          ></textarea>
          <!-- <input
            type="email"
            class="form-control"
            v-model="user.email"
            required
          /> -->
        </div>

        <div class="form-group">
          <label>deskripsi</label>
          <input
            type="text"
            class="form-control"
            v-model="user.deskripsi"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Tambahkan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDB";
import router from "../router";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("Perpus")
        .add(this.user)
        .then(() => {
          alert("Berhasil Menambahkan");
          this.user.namabuku = "";
          this.user.isi = "";
          this.user.deskripsi = "";
          this.user.genre = "";
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/list");
    },
  },
};
</script>