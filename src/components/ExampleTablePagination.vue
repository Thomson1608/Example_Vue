<template>
  <div>
    <!-- <b-container> -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          :total-rows="listpoint.length"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      class="table"
      bordered
      small
      striped
      hover
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :fields="fields"
      :items="listpoint"
      :current-page="currentPage"
      :per-page="perPage"
      @row-clicked="activeMap"
    >
      <template slot="_statust" slot-scope="row">
        <p style="color:black" v-if="row.item.statust == 1">Chưa định vị</p>
        <p style="color:#008000" v-else-if="row.item.statust == 2">
          Đã định vị
        </p>
        <p style="color:#0040ff" v-else-if="row.item.statust == 3">Đã nhận</p>
        <p style="color:#ffbf00" v-else-if="row.item.statust == 4">
          Đang di chuyển
        </p>
        <p style="color:red" v-else-if="row.item.statust == 5">Hoàn thành</p>
      </template>
      <template slot="points" slot-scope="row">
        <p>
          điểm đầu lat: {{ row.item.startpoint.lat }} lng:{{
            row.item.startpoint.lng
          }}
        </p>
        <p>
          điểm cuối lat: {{ row.item.endpoint.lat }} lng:{{
            row.item.endpoint.lng
          }}
        </p>
      </template>
      <template slot="_isaction" slot-scope="row" v-if="row.item.statust > 2">
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
        <!--
          <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
          Details via check
          </b-form-checkbox>
        -->
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card bg-variant="info" text-variant="white">
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Địa chỉ:</b></b-col>
            <b-col class="text-sm-left">{{ row.item.infodriver.adress }}</b-col>
            <b-col sm="2" class="text-sm-right"><b>Tên:</b></b-col>
            <b-col class="text-sm-left">{{
              row.item.infodriver.fullname
            }}</b-col>
          </b-row>
          <b-row class="mb">
            <b-col sm="2" class="text-sm-right"><b>Sđt:</b></b-col>
            <b-col class="text-sm-left">{{ row.item.infodriver.phone }}</b-col>
            <b-col sm="4" class="text-sm-right"><b>Tọa độ:</b></b-col>
            <b-col class="text-sm-left"
              >lat: {{ row.item.infodriver.lat }} lng:
              {{ row.item.infodriver.lng }}</b-col
            >
            <b-col class="text-sm-left"></b-col>
          </b-row>
          <!--
            <b-button size="sm" @click="row.toggleDetails">show map</b-button>
          -->
        </b-card>
      </template>
    </b-table>
    <!-- </b-container> -->

    <!--
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>Add Book</h3>
        </div>

        <div class="panel-body">
          <form id="form" class="form-inline" v-on:submit.prevent="addBook">
            <div class="form-group">
              <label for="bookTitle">Title:</label>
              <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
            </div>
            <div class="form-group">
              <label for="bookAuthor">Author:</label>
              <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author">
            </div>
            <div class="form-group">
              <label for="bookUrl">URL:</label>
              <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
            </div>
            <div class="form-group">
              <label for="bookIsbn">ISBN:</label>
              <input type="text" id="bookIsbn" class="form-control" v-model="newBook.isbn">
            </div>
            <input type="submit" class="btn btn-primary" value="Add Book">
          </form>
        </div>
      </div>
    -->
  </div>
</template>

<script>
export default {
  /// thuộc tính này truyền firebase cho vào đây, được truyền từ conponent App.vue
  props: ["listpointRef"],
  name: "ExampleTablePagination",

  data() {
    return {
      /// dữ liệu lấy từ firebase cho vào đây, được truyền từ conponent App.vue
      listpoint: this.listpointRef,
      points: this.points,
      sortBy: "date",
      sortDesc: true,
      currentPage: 1,
      perPage: 5,
      pageOptions: [0, 5, 10, 15],
      // totalRows: books.length,
      newBook: {
        title: "",
        author: "",
        url: "http://",
        isbn: ""
      },
      fields: [
        { key: "date", label: "Ngày Nhập", sortable: true },
        { key: "points", label: "Tọa độ", sortable: false },
        { key: "_statust", label: "Trạng thái", sortable: false },
        { key: "_isaction", label: "Chi Tiết", sortable: false }
      ]
    };
  },
  methods: {
    addBook: function() {
      booksRef.push(this.newBook);
      (this.newBook.title = ""),
        (this.newBook.author = ""),
        (this.newBook.url = "http://"),
        (this.newBook.isbn = "");
    },
    removeBook: function(book) {
      booksRef.child(book[".key"]).remove();
    },
    activeMap: function(books) {
      // console.log(books.author)
      // this.$emit('showMap',this.booknull);
      this.$emit("showMap", books);
    }
  }
};
</script>

<style lang="css" scoped>
b-table {
  padding-top: 20px;
}
</style>
