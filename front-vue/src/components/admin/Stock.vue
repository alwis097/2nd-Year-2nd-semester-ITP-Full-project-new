<template>
    <div>
        <h2>Stock</h2>
        <button
                            class="btn btn-sm btn-primary mx-2"
                            @click="generateReport"
                        >
                            Generate Report
                        </button>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in products" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">
                        <img :src="productImages + p.image" width="100" />
                    </td>
                    <td class="align-middle">{{ p.category }}</td>
                    <td class="align-middle">{{ p.quantity }}</td>
                </tr>
            </tbody>
        </table>
        <ProductPagination />
    </div>
</template>

<script>
import jspdf from "jspdf";
import 'jspdf-autotable';
import { mapState, mapActions, mapMutations } from "vuex";
import ProductPagination from "../ProductPagination";

export default {
    components: { ProductPagination },
    computed: {
        ...mapState(["products", "productImages"]),
    },
    methods: {
        ...mapMutations(["setCurrentCategory"]),
        ...mapActions(["setProductsByCategoryAction", "deleteProduct"]),
        handleEdit(product) {
            this.$router.push(`/admin/products/edit/${product._id}`);
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Stock Report", 10, 10);

            this.products.forEach(element => {      
                var temp = [element.name, element.category, element.quantity];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Product Name', 'Category', 'Quantity']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
    created() {
        this.setCurrentCategory("all");
        this.setProductsByCategoryAction("all");
    },
};
</script>
