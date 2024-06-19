<template>
  <UForm :state="state" :schema="schema" @submit="saveProfile">
    <UFormGroup label="Full Name" class="mb-4" name="name">
        <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Email" class="mb-4" name="email" help="You will receive a confirmation email on both the old and the new addresses if you modify your email address.">
        <UInput v-model="state.email" />
    </UFormGroup>
    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending"/>
  </UForm>
</template>

<script setup>
import { use } from 'h3';
import {z} from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const {toastSuccess, toastError} = useAppToast()
const pending = ref(false)

const state = ref({
    name: user.value.user_metadata?.full_name,
    email: user.value.email
})

const schema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email()
})

const saveProfile = async() => {
    pending.value = true
    try {
        const data = {
            data: {
                full_name: state.value.name
            }
        }

        if (state.value.email !== user.value.email) {
            data.email = state.value.email
        }

        const {error} = await supabase.auth.updateUser(data)
        if (error) throw error
        toastSuccess({
            title: 'Profile successfully updated'
        })
    } catch (e) {
       toastError({
        title: 'Error in updating profile',
        description: e.message
       }) 
    } finally {
        pending.value = false
    }
}
</script>

<style>

</style>