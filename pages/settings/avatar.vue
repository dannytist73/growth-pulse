<template>
    <div>
        <div class="mb-4">
            <UFormGroup
                label="Current avatar"
                class="w-full"
                help="This would be blank by default"
            >
                <UAvatar
                    src="https://avatars.githubusercontent.com/u/63273059?s=400&u=d7dec6e6ef8e281d929dac1e51c4d8a9effb3795&v=4"
                    size="3xl"
                />
            </UFormGroup>
        </div>

        <div class="mb-4">
            <UFormGroup
                label="New avatar"
                class="w-full"
                name="avatar"
                help="After choosing an image, click Save to actually upload the new avatar."
            >
                <UInput type="file" ref="fileInput" />
            </UFormGroup>
        </div>

        <UButton
            type="submit"
            color="black"
            variant="solid"
            label="Save"
            :loading="uploading"
            :disabled="uploading"
            @click="saveAvatar"
        />
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// we need to get the actual avatar URL
const { toastSuccess, toastError } = useAppToast();

const uploading = ref(false);
const fileInput = ref();

const saveAvatar = async () => {
    uploading.value = true;
    try {
        toastSuccess({
            title: "Successfully uploaded your avatar",
        });
    } catch (e) {
        toastError({
            title: "Failed to upload your avatar",
            description: e.message,
        });
    } finally {
        uploading.value = false;
    }
};
</script>

<style></style>
