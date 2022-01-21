<template>
    <div>
        <h2>Feedback</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/feedback/add"
            >Add Feedback</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in feedbacks" :key="i">
                    <td class="align-middle">{{ p.topic }}</td>
                    <td class="align-middle">{{ p.description }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deleteFeedback(p)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState(["feedbacks"]),
    },
    methods: {
        ...mapActions(["deleteFeedback"]),
        handleEdit(feedback) {
            this.$router.push(`/admin/feedback/edit/${feedback._id}`);
        },
    },
};
</script>
