<template>
    <div>
        <h2>Delivery</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/delivery/add"
            >Add Delivery</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Order No</th>
                    <th>Deliveryman</th>
                    <th>Vehicle Number</th>
                    <th>NIC</th>
                    <th>Deliveryman Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in deliveries" :key="i">
                    <td class="align-middle">{{ p.order }}</td>
                    <td class="align-middle">{{ p.deliveryman }}</td>
                    <td class="align-middle">{{ p.vehicleno }}</td>
                    <td class="align-middle">{{ p.nic }}</td>
                    <td class="align-middle">{{ p.contact }}</td>
                    <td class="align-middle">{{ p.status }}</td>
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
        ...mapState(["deliveries"]),
    },
    methods: {
        ...mapActions(["deleteDelivery"]),
        handleEdit(deliveries) {
            this.$router.push(`/admin/delivery/edit/${deliveries._id}`);
        },
        handleDelete(d) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteDelivery(d);
            });
            
        },
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Delivery Details Report", 10, 10);

            this.deliveries.forEach(element => {      
                var temp = [element.order, element.deliveryman, element.contact, element.status];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Order ID', 'Deliveryman', 'Contact', 'Status']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
};
</script>
