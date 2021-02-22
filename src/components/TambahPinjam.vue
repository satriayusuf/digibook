<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Tambah Peminjaman Buku</h3>
      <form @submit.prevent="onFormSubmit">
        <div class="form-group mt-5">
          <label>Nama Buku</label>
          <select v-model="user.namabuku" class="form-control">
            <option
              :value="user.namabuku"
              v-for="user in perpus"
              :key="user.namabuku"
            >
              {{ user.namabuku }}
            </option>
          </select>
          <!-- <input
            type="text"
            class="form-control"
            v-model="user.namabuku"
            required
          /> -->
        </div>

        <div class="form-group">
          <label>Nama Peminjam</label>
          <input
            type="text"
            class="form-control"
            v-model="user.namapeminjam"
            required
          />
        </div>
        <div class="form-group">
          <label>Kelas</label>
          <input
            type="text"
            class="form-control"
            v-model="user.kelas"
            required
          />
        </div>
        <div class="form-group">
          <label>Tanggal</label>
          <input
            type="date"
            class="form-control"
            v-model="user.tanggal"
            required
          />
        </div>
        <div class="form-group">
          <label>Dikumpulkan</label>
          <input
            type="date"
            class="form-control"
            v-model="user.dikumpulkan"
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
      perpus: [],
      peminjam: [],
    };
  },
  created() {
    db.collection("Perpus").onSnapshot((snapshotChange) => {
      this.perpus = [];
      snapshotChange.forEach((doc) => {
        this.perpus.push({
          key: doc.id,
          namabuku: doc.data().namabuku,
        });
      });
    });
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("Peminjam")
        .add(this.user)
        .then(() => {
          alert("Berhasil Menambahkan");
          this.user.namabuku = "";
          this.user.namapeminjam = "";
          this.user.kelas = "";
          this.user.tanggal = "";
          this.user.dikumpulkan = "";
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/peminjaman");
    },
  },
};
</script>