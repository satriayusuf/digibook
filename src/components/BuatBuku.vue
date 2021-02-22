<template>
  <div class="container-fluid">
    <div class="form-group">
      <label for="nama">
        <h3>Nama Buku</h3>
      </label>
      <input
        type="text"
        v-model="image.namabuku"
        class="form-control"
        placeholder="Contoh: Januari Tanpamu"
      />
    </div>
    <div class="form-group">
      <label for="cove">
        <h3>Cover Buku</h3>
      </label>
      <input
        type="file"
        @change="processFile($event)"
        class="form-control"
        accept="image/*"
      />
    </div>

    <div class="form-group">
      <vue-editor v-model="image.isi"></vue-editor>
    </div>
    <button @click="save" class="btn btn-primary mt-3 float-right">
      Simpan
    </button>
    <div
      class="alert alert-primary"
      role="status"
      id="berhasil"
      style="display: none"
    >
      <div class="spinner-border text-primary">
        <span class="sr-only"> </span>
      </div>
      <p class="text-primary">Sedang Upload</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../router";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      img: firebase.firestore().collection("Perpus"),
      imageData: null,
      image: {
        namabuku: "",
        url: "",
        isi: "",
      },
    };
  },
  methods: {
    processFile(event) {
      this.imageData = event.target.files[0];
    },
    save() {
      console.log(this.imageData);
      var loader = document.getElementById("berhasil");
      loader.style.display = "block";
      const storageRef = firebase.storage().ref("image/" + this.imageData.name);
      storageRef.put(this.imageData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.image);
          this.image.url = downloadURL;
          this.img.add(this.image).then(() => {
            console.log(downloadURL);
            console.log("tes");
          });
          alert("berhasil");
          router.push("/list");
        });
      });
    },
  },
};
</script>