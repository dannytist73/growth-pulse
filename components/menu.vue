<template>
    <nav>
        <div class="flex justify-between items-center p-4 md:p-0">
            <button @click="toggleMenu" class="md:hidden focus:outline-none">
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>
        </div>
        <ul
            :class="{
                hidden: !isMenuOpen,
                flex: isMenuOpen,
                'flex-col': true,
                'md:flex': true,
                'md:flex-row': true,
                'md:space-x-4': true,
            }"
        >
            <li>
                <NuxtLink class="link" to="/">🪙</NuxtLink>
            </li>
            <li>
                <NuxtLink class="link" to="/fitness">💪🏼</NuxtLink>
            </li>
            <li>
                <NuxtLink class="link" to="/habits">🌱</NuxtLink>
            </li>
            <li>
                <NuxtLink class="link" to="/weight">⚖️</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from "vue";
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.link {
    @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-2xl md:text-base;
}
</style>
