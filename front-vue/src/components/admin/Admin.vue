<template>
    <div class="row p-3">
        <div class="col-3 bg-secondary p-2" style="max-width:250px">
            <router-link class="btn btn-block btn-primary" to="/admin/products"
                >Products</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/pages"
                >Pages</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/orders"
                >Orders</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/delivery"
                >Delivery</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/stock"
                >Stock</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/grn"
                >GRN</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/supplier"
                >Supplier</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/branch"
                >Branch</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/user"
                >User</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/inquiry"
                >Inquiry</router-link
            >
            <router-link class="btn btn-block btn-primary" to="/admin/wishlist"
                >WishList</router-link
            >
            <!-- <router-link class="btn btn-block btn-primary" to="/admin/feedback"
                >Feedback</router-link
            > -->
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>
