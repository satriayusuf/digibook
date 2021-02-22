<template>
  <div class="container-fluid">
    <h2>Peminjaman Buku Perpustakaan</h2>
    <div class="row mt-5">
      <div class="col-lg-6">
        <router-link to="/dashboard" class="btn btn-warning"
          >Kembali
        </router-link>
        <router-link to="/selesaipeminjaman" class="btn ml-2 btn-success">
          Selesai Peminjaman
        </router-link>
      </div>
      <div class="col-lg-6">
        <router-link to="/tambahpeminjaman" class="btn btn-primary float-right">
          Tambah Peminjaman
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Nama Buku</th>
            <th>Nama Peminjam</th>
            <th>Kelas</th>
            <th>Tanggal Pinjam</th>
            <th>Batas Tanggal Pinjam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in peminjam" :key="user.key">
            <td>{{ user.namabuku }}</td>
            <td>{{ user.namapeminjam }}</td>
            <td>{{ user.kelas }}</td>
            <td>{{ user.tanggal }}</td>
            <td>{{ user.dikumpulkan }}</td>
            <td>
              <button
                class="btn mr-2 btn-success"
                @click.prevent="endUser(user)"
              >
                Selesai
              </button>
              <button
                @click.prevent="deleteUser(user.key)"
                class="btn mr-2 btn-danger"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDB";
export default {
  data() {
    return {
      peminjam: [],
      select: {},
      user: [],
      search: "",
    };
  },
  created() {
    db.collection("Peminjam").onSnapshot((snapshotChange) => {
      this.peminjam = [];
      snapshotChange.forEach((doc) => {
        this.peminjam.push({
          key: doc.id,
          namabuku: doc.data().namabuku,
          namapeminjam: doc.data().namapeminjam,
          kelas: doc.data().kelas,
          tanggal: doc.data().tanggal,
          dikumpulkan: doc.data().dikumpulkan,
        });
      });
    });
  },
  methods: {
    deleteUser(id) {
      if (window.confirm("Apakah Anda Ingin Menghapus?")) {
        db.collection("Peminjam")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
            alert("berhasil Dihapus");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    endUser(user) {
      if (window.confirm("Apakah Anda Yakin Sudah Selesai?")) {
        db.collection("selesai")
          .add(user)
          .then(() => {
            console.log("BErhasuil");
          });
        db.collection("Peminjam")
          .doc(user.key)
          .delete()
          .then(() => {
            console.log("Document Deleted!");
            alert("Sudah Selesai");
          });
      }
    },
  },
};
</script>