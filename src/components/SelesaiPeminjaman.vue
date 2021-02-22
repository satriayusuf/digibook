<template>
  <div class="container-fluid">
    <router-link to="/peminjaman" class="btn btn-warning">
      Kembali
    </router-link>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Nama Buku</th>
          <th>Nama Peminjam</th>
          <th>Status</th>
          <th>Dikumpulkan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in peminjam" :key="post.key">
          <td>{{ post.namabuku }}</td>
          <td>{{ post.namapeminjam }}</td>
          <td><p class="badge badge-success">Selesai</p></td>
          <td>{{ post.dikumpulkan }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <div >
      {{ post.namabuku }}
    </div> -->
  </div>
</template>
<script>
import { db } from "../firebaseDB";
export default {
  data() {
    return {
      peminjam: [],
    };
  },
  created() {
    db.collection("selesai").onSnapshot((snapshotChange) => {
      this.peminjam = [];
      snapshotChange.forEach((doc) => {
        this.peminjam.push({
          key: doc.id,
          namabuku: doc.data().namabuku,
          namapeminjam: doc.data().namapeminjam,
          dikumpulkan: doc.data().dikumpulkan,
        });
      });
    });
  },
};
</script>