<template>
     <header class="flex justify-between items-center mt-10">
          <div class="hidden md:block">
               <NuxtLink to="/" class="text-xl font-bold">
                    GrowthPulse
               </NuxtLink>
          </div>
          <Menu v-if="user" />

          <div class="flex">
               <UDropdown
                    :items="items"
                    :ui="{
                         item: { disabled: 'cursor-text select-text' },
                         width: 'w-64',
                    }"
                    v-if="user"
               >
                    <UAvatar
                         src="https://avatars.githubusercontent.com/u/63273059?s=400&u=d7dec6e6ef8e281d929dac1e51c4d8a9effb3795&v=4"
                         alt="Avatar"
                    />

                    <template #account="{ item }">
                         <div class="text-left">
                              <p>Signed in as</p>
                              <p
                                   class="font-medium text-gray-900 dark:text-white"
                              >
                                   {{ user.email }}
                              </p>
                         </div>
                    </template>

                    <template #item="{ item }">
                         <span class="truncate">{{ item.label }}</span>

                         <UIcon
                              :name="item.icon"
                              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                         ></UIcon>
                    </template>
               </UDropdown>
          </div>
     </header>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const colorMode = useColorMode();

const modes = ["light", "dark"];

const nextModeIcons = {
     light: "i-heroicons-sun",
     dark: "i-heroicons-moon",
};

const nextMode = computed(() => {
     const currentModeIndex = modes.indexOf(colorMode.preference);
     return currentModeIndex + 1 === modes.length
          ? modes[0]
          : modes[currentModeIndex + 1];
});

const nextModeIcon = computed(() => nextModeIcons[nextMode.value]);

const items = ref([]);

const updateItems = () => {
     items.value = [
          [
               {
                    label: user.value?.email,
                    slot: "account",
                    disabled: true,
               },
          ],
          [
               {
                    label: `Switch to ${nextMode.value} mode`,
                    icon: nextModeIcon.value,
                    click: () => {
                         colorMode.preference = nextMode.value;
                    },
               },
          ],
          [
               {
                    label: "Settings",
                    icon: "i-heroicons-cog-8-tooth",
                    click: () => navigateTo('/settings/profile')
               },
               {
                    label: "Sign out",
                    icon: "i-heroicons-arrow-left-on-rectangle",
                    click: async () => {
                         await supabase.auth.signOut();
                         return navigateTo("/login");
                    },
               },
          ],
     ];
};

updateItems(); // Initialize items

watch(nextMode, updateItems); // Update items when nextMode changes
</script>

<style></style>
