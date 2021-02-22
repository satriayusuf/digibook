<template>
  <div class="container-fluid">
    <section>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6 col-sm-4">
          <p
            style="
              color: #505050;
              margin-top: 100px;
              font-size: 50px;
              font-weight: 600;
            "
          >
            Perpustakaan Online
          </p>
          <p style="color: #707070; font-weight: 500; font-size: 20px">
            Membaca jadi lebih mudah dengan <b>Perpustakaan Online</b>
          </p>

          <a href="#buku" class="mt-5 btn btn-dark shadow">Baca Buku Yuk!!</a>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-4">
          <img
            src="https://st3.depositphotos.com/29690442/34945/v/600/depositphotos_349455632-stock-illustration-modern-education-concept-flat-vector.jpg"
            alt=""
            width="620"
            height="auto"
            class="mt-5"
          />
        </div>
      </div>
    </section>
    <section>
      <h1 style="color: #505050; margin-top: 160px">
        Apa itu Perpustakaan Online?
      </h1>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
          <img
            src="https://www.mditack.co.id/wp-content/uploads/2020/06/Peranan-Video-Training-Dalam-Program-Pelatihan-Karyawan.jpg"
            alt=""
            class="w-100"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12" style="margin-top: 100px">
          <p style="font-weight: 400; color: #505050; font-size: 18px">
            Perpustakaan Online adalah Penyedia buku digital gratis yang
            berPlatform di Website, dengan adanya
            <b>Perpustakaan Online</b> Kami Berharap Bisa melestarikan gerakan
            Literasi di Indonesia
          </p>
        </div>
      </div>
    </section>
    <section id="buku" style="margin-top: 160px">
      <h2 class="text-center" style="color: #505050">Baca Buku Disini</h2>
      <div class="row justify-content-center mt-5">
        <div class="col-lg-3" v-for="user in perpus" :key="user.key">
          <router-link
            :to="{ name: 'bukunoauth', params: { id: user.key } }"
            class=""
          >
            <div class="card mt-3 bukud">
              <img v-bind:src="user.url" class="card-img-top w-100" alt="" />
              <div class="card-body">
                <h5 style="color: #505050">{{ user.namabuku }}</h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <section style="margin-top: 160px">
      <h1 style="color: #505050">Asal Perpustakaan Online</h1>
      <div class="row justify-content-center">
        <div class="col-lg-6" style="margin-top: 130px">
          <p style="color: #505050; font-weight: 600px">
            Awal Mula Saya Membangun Perpustakaan Online adalah untuk memperkaya
            akan kegiatan Literasi selama pandemi <b>COVID-19</b>yang membuat
            bosan banyak kalangan anak muda. Saya ciptakan Perpustakaan untuk
            memperkaya ilmu anak-anak muda berprestasi.
          </p>
        </div>
        <div class="col-lg-6">
          <center>
            <img
              src="https://img.freepik.com/free-vector/man-with-headphones-microphone-with-computer_113065-136.jpg?size=338&ext=jpg"
              alt=""
              class="w-75"
            />
            <h5 style="color: #505050" class="mb-3">Satria Yusuf Dwi Putra</h5>
          </center>
        </div>
      </div>
    </section>
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
};
</script>
<style scoped>
.vcc {
  height: 50vh;
  width: 60vw;
}
</style>

<style>
.bukud:hover {
  transform: scale(1.1);
}
</style>