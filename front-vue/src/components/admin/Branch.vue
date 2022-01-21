<template>
    <div>
        <h2>Branch</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/branch/add"
            >Add Branch</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in branches" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.email }}</td>
                    <td class="align-middle">{{ p.address }}</td>
                    <td class="align-middle">{{ p.phone }}</td>
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
        ...mapState(["branches"]),
    },
    methods: {
        ...mapActions(["deleteBranch"]),
        handleEdit(branch) {
            this.$router.push(`/admin/branch/edit/${branch._id}`);
        },
        handleDelete(b) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteBranch(b);
            });
            
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Branch Details Report", 10, 10);

            this.branches.forEach(element => {      
                var temp = [element.name, element.email, element.address, element.phone];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Branch Name', 'Email', 'Address', 'Contact']],
                body: data
            })

            doc.save('report.pdf')
        }
        
    },
};
</script>
