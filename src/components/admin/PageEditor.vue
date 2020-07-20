<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Page" : "Add Page" }}
        </h2>

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" />
        </div>

        <div class="form-group">
            <label for="">Slug</label>
            <input type="text" class="form-control" />
        </div>

        <div class="form-group">
            <label for="">Content</label>
            <textarea class="form-control"></textarea>
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/pages"
                >Back</router-link
            >
            <button class="btn btn-primary m-1">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["pages"]),
    },
};
</script>
