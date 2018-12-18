<template>
  <div id="app">
    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <b-col sm="5" md="6">
        <ExampleTablePagination
          id="table"
          :listpointRef="listpoint"
          @showMap="mtShowmap"
        />
      </b-col>
      <b-col sm="5" md="6">
        <!-- <Googlemap /> -->
        <!-- <Bcard /> -->
      </b-col>
    </b-row>
    <!-- </b-container>/ -->
  </div>
</template>

<script>
// import Googlemap from "./components/Googlemap.vue";
// import FindRoad from "./components/FindRoad.vue";
// import TestRoad from "./components/Testfindroad.vue";
// import NavBar from "./components/NavBar.vue";
// import ListPoint from "./components/ListPoint.vue";
// import Bcard from "./components/BCard.vue";
import ExampleTablePagination from "./components/ExampleTablePagination.vue";
import "bootstrap/dist/css/bootstrap.css";

// cấu hình firebase lấy trên trang firebase mục "setup web"
import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyBdqx0S8k9QCFChnA3G8j_7v6pRrtTX7go",
  authDomain: "socket-f4fbf.firebaseapp.com",
  databaseURL: "https://socket-f4fbf.firebaseio.com",
  projectId: "socket-f4fbf",
  storageBucket: "socket-f4fbf.appspot.com",
  messagingSenderId: "1087997439743"
};
let app = Firebase.initializeApp(config);
let db = app.database();
let listpointRef = db.ref("listPoint");

export default {
  name: "app",
  data() {
    return {
      showmapview: 0,
      center_: {
        lat: 0,
        lng: 0
      },
      place: null
    };
  },
  firebase: {
    listpoint: listpointRef
  },
  components: {
    // NavBar,
    ExampleTablePagination
  },
  methods: {
    mtShowmap(status) {
      var this_ = this;
      this_.showmapview = status;
      // if(this_.showmapview.statust > 2)
      // {

      //   this.$refs.testroadRef.getRoute();
      // }
      // console.log(this_.showmapview.statust);
    },
    updatePoint(place) {
      var this_ = this;
      this_.center_ = {
        lat: place.lat,
        lng: place.lng
      };
      console.log(place.lat);
      console.log(place.lng);
    }
  }
};
</script>

<style>
#table {
  padding: 20px;
}
</style>
