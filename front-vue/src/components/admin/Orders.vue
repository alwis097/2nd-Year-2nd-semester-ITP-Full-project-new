<template>
    <div>
        <h2>Orders</h2>
            <button
                            class="btn btn-sm btn-primary mx-2"
                            @click="generateReport"
                        >
                            Generate Report
                        </button>
        <table class="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Order Content</th>
                    <th>Total</th>
                    <th>Feedback</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, i) in orders" :key="i">
                    <td class="align-middle">{{ o.date }}</td>
                    <td class="align-middle">{{ o.name }}</td>
                    <td class="align-middle">{{ o.address }}</td>
                    <td class="align-middle">
                        <ul class="list-group">
                            <li
                                class="list-group-item"
                                v-for="(item, index) in JSON.parse(o.cart)"
                                :key="index"
                            >
                                {{ item.product.name }}
                                {{ item.product.price | currency }}
                                {{ "x " + item.quantity }}
                            </li>
                        </ul>
                    </td>                    
                    <td class="align-middle">{{ o.total | currency }}</td>
                    <td class="align-middle">{{ o.feedback }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import jspdf from "jspdf";
import 'jspdf-autotable';
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState({ orders: (state) => state.orders.orders }),
    },
    methods: {
        ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
        generateReport(){
            const doc = new jspdf();
            var data = [];

            doc.text("Order Details Report", 10, 10);

            this.orders.forEach(element => {      
                var temp = [element.date, element.name, element.email, element.contact, element.address, element.total, element.feedback];
                data.push(temp);

            });

            doc.autoTable({ html: '#my-table' })

            doc.autoTable({
                head: [['Date', 'Name', 'Email', 'Contact', 'Address', 'Total', 'Feedback']],
                body: data
            })

            doc.save('report.pdf')
        }
    },
    created() {
        this.setOrdersAction();
    },
};
</script>
