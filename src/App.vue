<template>
  <div>
    <nav
      class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand float-left">
          <div class="row">
            <div class="col-lg-3">
              <img
                src="http://dispusarda-metro.com/media/icon/opac.png"
                width="50"
                alt=""
              />
            </div>
            <div class="col-lg-2 mt-2">Perpustakaan</div>
          </div>
        </router-link>
        <ul class="nav navbar-nav flex-row float-right"></ul>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>
    <footer class="bg-dark pb-2 pt-2" style="margin-top: 250px">
      <center>
        <a style="text-decoration: none; color: white; text-align: center"
          >Copyright 2021 - Satria Yusuf Dwi Putra</a
        >
      </center>
    </footer>
  </div>
</template>
<style>
* {
  scroll-behavior: smooth;
}
</style>
