<template>
  <div class="container-fluid">
    <form @submit.prevent="onUpdateForm">
      <div class="form-group">
        <label>Nama</label>
        <input
          type="text"
          class="form-control"
          v-model="perpus.namabuku"
          required
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
      <img v-bind:src="perpus.url" class="w-25" alt="" />

      <div class="form-group">
        <vue-editor v-model="perpus.isi"></vue-editor>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block">Ubah</button>
      </div>
      <div
        class="spinner-border text-primary"
        role="status"
        id="berhasil"
        style="display: none"
      >
        <span class="sr-only alert alert-primary"> Telah Diubah</span>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../firebaseDB";
import firebase from "firebase";
import router from "../router";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      perpus: {
        isi: "",
        url: ",",
      },
    };
  },
  mounted() {
    let dbRef = db.collection("Perpus").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.perpus = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    processFile(event) {
      this.imageData = event.target.files[0];
    },
    onUpdateForm(event) {
      event.preventDefault();
      const updateRef = db.collection("Perpus").doc(this.$route.params.id);
      if (this.imageData != null) {
        let image_old = firebase.storage().refFromURL(this.perpus.url);
        console.log(image_old);
        image_old.delete().then(() => {
          console.log("foto terhapus");
        });
        var storageRef = firebase
          .storage()
          .ref("image/" + "cover" + Math.floor(10000 + Math.random() * 90000));
        storageRef.put(this.imageData).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(this.perpus);
            var loader = document.getElementById("berhasil");
            loader.style.display = "block";
            this.perpus.url = downloadURL;
            updateRef
              .set(this.perpus)
              .then(() => {
                this.key = "";
                this.perpus.namabuku;
                this.perpus.isi;
                router.push({
                  name: "list",
                });
                alert("berhasil");
                document.getElementById("berhasil");
              })
              .catch((error) => {
                alert("error");
                console.log(error);
              });
          });
        });
      } else {
        console.log(this.perpus);
        var loader = document.getElementById("berhasil");
        loader.style.display = "block";

        updateRef
          .set(this.perpus)
          .then(() => {
            this.key = "";
            this.perpus.namabuku;
            this.perpus.isi;
            router.push({
              name: "list",
            });
            alert("berhasil");
            document.getElementById("berhasil");
          })
          .catch((error) => {
            alert("error");
            console.log(error);
          });
      }
      // db.collection("perpus")
      //   .doc(this.$route.params.id)
      //   .update(this.perpus)
      //   .then(() => {
      //     console.log("Berhasil di ubah");
      //     alert("Berhasil Diubah");
      //     router.push("/");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     alert("error");
      //   });
    },
  },
};
</script>