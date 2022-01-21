<template>
    <div>
        <center><h2>Vist Our Branches</h2></center>

        <p>Company called NEW KAMAL (pvt).ltd is fully grown furniture and association product sellers. They are mainly selling furniture, electric equipment, water tanks, kitchen equipment and etc. Their main shop is located in Anuradhapura and they have number of branches in different cities. Mr.Kamal mendis is the owner of this business. And his request is to build a web application to their system, because they have no proper website and management system for their business. As well as the other purpose is to grow up the business with this covid-19 situation and manage their internal activities without any affecting.</p>

        
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in branches" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.email }}</td>
                    <td class="align-middle">{{ p.address }}</td>
                    <td class="align-middle">{{ p.phone }}</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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
    },
};
</script>
