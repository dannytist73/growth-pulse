<template>
     <div>
          <div class="mb-4">
               <UFormGroup
                    label="Current avatar"
                    class="w-full"
                    help="This would be blank by default"
               >
                    <UAvatar
                         :src="url"
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

const {url} = useAvatarUrl()

const uploading = ref(false);
const fileInput = ref();

const saveAvatar = async () => {
     const file = fileInput.value.input.files[0];

     if (!file) {
          toastError({ title: "Select a file to upload first" });
          return;
     }

     const fileExt = file.name.split(".").pop();

     const fileName = `${Math.random()}.${fileExt}`;

     try {
          uploading.value = true;

          const currentAvatarUrl = user.value.user_metadata?.avatar_url;

          const { error } = await supabase.storage
               .from("avatars")
               .upload(fileName, file);

          if (error) throw error;

          await supabase.auth.updateUser({
               data: {
                    avatar_url: fileName,
               },
          });

          if (currentAvatarUrl) {
            const {error} = await supabase.storage.from('avatars').remove([currentAvatarUrl])
            if (error) throw error
          }

          fileInput.value.input.value = null;

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
