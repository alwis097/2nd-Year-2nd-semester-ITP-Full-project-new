<template>
    <div>
        <h2>Supplier</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/supplier/add"
            >Add Supplier</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in suppliers" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.company_name }}</td>
                    <td class="align-middle">{{ p.contact }}</td>
                    <td class="align-middle">{{ p.email }}</td>
                    <td class="align-middle">{{ p.address }}</td>
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
        ...mapState(["suppliers"]),
    },
    methods: {
        ...mapActions(["deleteSupplier"]),
        handleEdit(s) {
            this.$router.push(`/admin/supplier/edit/${s._id}`);
        },
        handleDelete(s) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteSupplier(s);
            });
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Supplier Details Report", 10, 10);

            this.suppliers.forEach(element => {      
                var temp = [element.name, element.company_name, element.contact, element.email, element.address];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Name', 'Company Name', 'Contact', 'Email', 'Address']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
};
</script>
