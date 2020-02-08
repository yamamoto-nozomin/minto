<template>
  <b-field grouped group-multiline>
    <b-field label="人気の投票">
      <b-table
        :data="isEmpty ? [] : rankingData"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
        default-sort="id"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="勢い" width="40" sortable numeric>{{ props.row.id }}</b-table-column>
          <b-table-column
            field="user.first_name"
            label="タイトル"
            sortable
          >{{ props.row.user.first_name }}</b-table-column>
          <b-table-column field="date" label="作成日" sortable centered>
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
          <b-table-column field="date" label="公開日" sortable centered>
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>まだ情報がありません・・・</p>
            </div>
          </section>
        </template>
      </b-table>
    </b-field>
    <b-field label="最近作成された投票">
      <b-table
        :data="isEmpty ? [] : latelyData"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
        default-sort="id"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="勢い" width="40" sortable numeric>{{ props.row.id }}</b-table-column>
          <b-table-column
            field="user.first_name"
            label="タイトル"
            sortable
          >{{ props.row.user.first_name }}</b-table-column>
          <b-table-column field="date" label="作成日" sortable centered>
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
          <b-table-column field="date" label="公開日" sortable centered>
            <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>まだ情報がありません・・・</p>
            </div>
          </section>
        </template>
      </b-table>
    </b-field>
  </b-field>
</template>

<script>
import rankingData from "~/data/sample.json";
import latelyData from "~/data/sample.json";

export default {
  data() {
    return {
      rankingData,
      latelyData,
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: false,
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 10
    };
  }
};
</script>