<template>
    <div>
        <h2>GRN</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/grn/add"
            >Add GRN</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in grns" :key="i">
                    <td class="align-middle">{{ p.product }}</td>
                    <td class="align-middle">{{ p.pname }}</td>
                    <td class="align-middle">{{ p.supplier }}</td>
                    <td class="align-middle">{{ p.quantity }}</td>
                    <td class="align-middle">{{ p.price }}</td>
                    <td class="align-middle">{{ p.date }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="handleDelete(p)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button
                            class="btn btn-sm btn-primary mx-2"
                            @click="generateReport"
                        >
                            Generate Report
                        </button>
    </div>
</template>

<script>
import jspdf from "jspdf";
import 'jspdf-autotable';
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState(["grns"]),
    },
    methods: {
        ...mapActions(["deleteGrn"]),
        handleEdit(grn) {
            this.$router.push(`/admin/grn/edit/${grn._id}`);
        },
        handleDelete(d) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteGrn(d);
            });
            
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("GRN Details Report", 10, 10);

            this.grns.forEach(element => {      
                var temp = [element.product, element.supplier, element.quantity, element.price, element.date];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Product ID', 'Supplier', 'Quantity', 'Price', 'Date']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
};
</script>
