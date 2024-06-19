<template>
  <UForm :state="state" :schema="schema" @submit=saveSettings>
    <UFormGroup label="Transaction View" class="mb-4" help="Choose how you would like to view transactions">
        <USelect v-model="state.timePreference" :options="timeOptions" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending" />
  </UForm>
</template>

<script setup>
import {z} from 'zod'
import { timeOptions } from '~/constants';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const {toastSuccess, toastError} = useAppToast()
const pending = ref(false)

const state = ref({
    timePreference: user.value.user_metadata?.time_preferences ?? timeOptions[3]
})

const schema = z.object({
    timePreference: z.enum(timeOptions)
})

const saveSettings = async () => {
    pending.value = true
    try {
        const {error} = await supabase.auth.updateUser({
            data: {
                time_preferences: state.value.timePreference
            }
        })
        if (error) throw error
        toastSuccess({
            title: 'Settings updated'
        })
    } catch(e) {
        toastError({
            title: 'Error updating settings',
            description: e.message
        })
    } finally {
        pending.value = false
    }
}

</script>

<style>

</style>