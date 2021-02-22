<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <router-link to="/dashboard" class="btn btn-warning">
          Kembali
        </router-link>
      </div>
      <div class="col-6">
        <router-link to="/buatbuku" class="btn btn-primary float-right">
          Tambah Data
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3" v-for="user in perpus" :key="user.key">
        <router-link :to="{ name: 'buku', params: { id: user.key } }">
          <div class="card shadow-sm mt-3">
            <img class="card-img-top" v-bind:src="user.url" />
            <div class="card-body">
              <p style="color: #505050; font-size: 20px; font-weight: 500">
                {{ user.namabuku }}
              </p>
              <p style="color: #707070; font-size: 15px">
                {{ user.deskripsi }}
              </p>
              <div class="row">
                <div class="col-lg-6">
                  <router-link
                    :to="{ name: 'edit', params: { id: user.key } }"
                    class="btn btn-primary float-left"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </router-link>
                </div>
                <div class="col-lg-6">
                  <button
                    @click.prevent="deleteUser(user.key)"
                    class="btn btn-danger float-right"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseDB";
export default {
  data() {
    return {
      perpus: [],
    };
  },
  created() {
    db.collection("Perpus").onSnapshot((snapshotChange) => {
      this.perpus = [];
      snapshotChange.forEach((doc) => {
        this.perpus.push({
          key: doc.id,
          namabuku: doc.data().namabuku,
          url: doc.data().url,
        });
      });
    });
  },
  methods: {
    deleteUser(id) {
      if (window.confirm("Apakah Anda Ingin Menghapus?")) {
        db.collection("Perpus")
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
  },
};
</script>