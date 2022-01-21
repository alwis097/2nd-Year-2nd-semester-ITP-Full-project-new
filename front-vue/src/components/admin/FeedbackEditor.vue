<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Feedback" : "Add Feedback" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Values Required for All Fields!
        </h4>

        <div class="form-group">
            <label for="">Topic</label>
            <input type="text" class="form-control" v-model="feedback.topic" />
        </div>
        
        <div class="form-group">
            <label for="">Description</label>
            <textarea type="text" class="form-control" v-model="feedback.description" cols="30" rows="10" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/feedback"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            feedback: {
                topic: null,
                description: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        feedback: {
            topic: { required },
            description: { required },
        },
    },
    methods: {
        ...mapActions(["addFeedback", "editFeedback"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editFeedback(this.feedback);
                } else {
                    await this.addFeedback(this.feedback);
                }

                this.$router.push("/admin/feedback");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.feedback,
                this.$store.getters.feedbackById(this.$route.params["id"])
            );
        }
    },
};
</script>
