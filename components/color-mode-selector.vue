<template>
    <div class="flex space-x-2 items-center">
        <div
            class="text-gray-500 dark:text-gray-400 text-xs"
            v-if="showNextModeLabel"
        >
            {{ nextMode }} mode
        </div>
        <button
            @click="toggleMode"
            class="hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 text-gray-800 dark:text-gray-100 text-4xl md:text-base"
            @mouseenter="showNextModeLabel = true"
            @mouseleave="showNextModeLabel = false"
        >
            <UIcon :name="nextModeIcon" />
        </button>
    </div>
</template>

<script setup>
const showNextModeLabel = ref(false);
const colorMode = useColorMode();

const modes = ["light", "dark"];

const nextModeIcons = {
    // system: "",
    light: "i-heroicons-sun",
    dark: "i-heroicons-moon",
};

const nextMode = computed(() => {
    const currentModeIndex = modes.indexOf(colorMode.preference);
    let nextModeIndex = null;

    if (currentModeIndex + 1 == modes.length) {
        nextModeIndex = 0;
    } else {
        nextModeIndex = currentModeIndex + 1;
    }

    return modes[nextModeIndex];
});

const nextModeIcon = computed(() => nextModeIcons[nextMode.value]);

const toggleMode = () => {
    colorMode.preference = nextMode.value;
};
</script>

<style></style>
