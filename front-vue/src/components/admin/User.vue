<template>
    <div>
        <h2>User</h2>

        

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in users" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.address }}</td>
                    <td class="align-middle">{{ p.contact }}</td>
                    <td class="align-middle">{{ p.email }}</td>
                    <td class="align-middle">****</td>
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
        ...mapState(["users"]),
    },
    methods: {
        ...mapActions(["deleteUser"]),
        handleEdit(d) {
            this.$router.push(`/admin/user/edit/${d._id}`);
        },
        handleDelete(d) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteUser(d);
            });
            
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("User Details Report", 10, 10);

            this.users.forEach(element => {      
                var temp = [element.name,element.address, element.contact, element.email];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Name', 'Address', 'Contact', 'Email']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
};
</script>
