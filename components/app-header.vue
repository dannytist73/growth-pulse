<template>
    <header class="flex justify-between items-center mt-10">
        <div class="hidden md:block">
            <NuxtLink to="/" class="text-xl font-bold"> GrowthPulse </NuxtLink>
        </div>
        <Menu />

        <div class="flex">
            <ClientOnly>
                <ColorModeSelector />
            </ClientOnly>
            <UAvatar
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
            />
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style></style>
