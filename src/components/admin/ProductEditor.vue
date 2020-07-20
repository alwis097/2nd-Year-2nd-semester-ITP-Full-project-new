<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Product" : "Add Product" }}
        </h2>

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="form-group">
            <label for="">Description</label>
            <textarea
                class="form-control"
                v-model="product.description"
            ></textarea>
        </div>

        <div class="form-group">
            <label for="">Price</label>
            <input type="text" class="form-control" v-model="product.price" />
        </div>

        <div class="form-group">
            <label for="">Image</label>
            <input type="file" class="form-control" @change="onFileSelected" />

            <p v-if="editMode" class="mt-3">
                Current image:
                <img :src="productImages + product.image" width="100" />
            </p>
        </div>

        <div class="form-group">
            <label for="">Category</label>
            <select class="form-control" @change="onChange">
                <option :value="null">Choose a category</option>
                <option
                    v-for="(c, i) in categories"
                    :key="i"
                    :value="c.slug"
                    :selected="c.slug == product.category"
                >
                    {{ c.name }}
                </option>
            </select>
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/pages"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            product: {
                name: null,
                description: null,
                price: null,
                image: null,
                category: null,
            },
        };
    },
    computed: {
        ...mapState(["categories", "productImages"]),
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    methods: {
        ...mapActions(["addPage", "editPage"]),
        async handlePage() {
            if (this.editMode) {
                await this.editPage(this.page);
            } else {
                await this.addPage(this.page);
            }

            this.$router.push("/admin/pages");
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.page,
                this.$store.getters.pageById(this.$route.params["id"])
            );
        }
    },
};
</script>
