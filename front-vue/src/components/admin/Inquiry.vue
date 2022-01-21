<template>
    <div>
        <h2>Inquiry</h2>

<!--<router-link class="btn btn-primary mb-4" to="/admin/inquiry/add"
            >Add Inquiry</router-link
        > -->
        <table class="table">
            <thead>
                <tr>
                    <th>Customer name</th>
                    <th>Customer ID</th>
                    <th>Inquiry Content</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in inquires" :key="i">
                    <td class="align-middle">{{ p.customerName }}</td>
                    <td class="align-middle">{{ p.customerID }}</td>
                    <td class="align-middle">{{ p.inquiryContent }}</td>
                    <td class="align-middle">{{ p.contactNumber }}</td>
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
        ...mapState(["inquires"]),
    },
    methods: {
        ...mapActions(["deleteInquiry"]),
        handleEdit(inquiry) {
            this.$router.push(`/admin/inquiry/edit/${inquiry._id}`);
        },
        handleDelete(b) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteInquiry(b);
            });
            
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Inquiry Details Report", 10, 10);

            this.inquires.forEach(element => {      
                var temp = [element.customerName, element.customerID, element.inquiryContent, element.contactNumber];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Customer Name', 'Customer ID', 'Inquiry Content', 'Contact']],
                body: data
            })

            doc.save('report.pdf')
        }
        
    },
};
</script>
