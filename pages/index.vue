<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">Summary</h1>
        <div>
            <USelectMenu v-model="selectedView" :options="timeOptions" />
        </div>
    </section>

    <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
    >
        <Trend
            color="green"
            title="Income"
            :amount="12838"
            :last-amount="8273"
            :loading="false"
        />
        <Trend
            color="red"
            title="Expense"
            :amount="4536"
            :last-amount="6728"
            :loading="false"
        />
        <Trend
            color="green"
            title="Investments"
            :amount="4000"
            :last-amount="3000"
            :loading="false"
        />
        <Trend
            color="red"
            title="Savings"
            :amount="2000"
            :last-amount="3000"
            :loading="false"
        />
    </section>

    <section>
        <div
            v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
            :key="date"
            class="mb-10"
        >
            <DailyTransactionSummary
                :date="date"
                :transactions="transactionsOnDay"
            />
            <Transaction
                v-for="transaction in transactionsOnDay"
                :key="transaction.id"
                :transaction="transaction"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { timeOptions } from "~/constants";
const selectedView = ref(timeOptions[0]);
const transactions = ref([]);

const supabase = useSupabaseClient();

const { data, pending } = await useAsyncData("transactions", async () => {
    const { data, error } = await supabase.from("transactions").select();
    if (error) return [];
    return data;
});

transactions.value = data.value;

const transactionsGroupedByDate = computed(() => {
    let groupedTransactions = {};

    for (const transaction of transactions.value) {
        const date = new Date(transaction.created_at)
            .toISOString()
            .split("T")[0];

        if (!groupedTransactions[date]) {
            groupedTransactions[date] = [];
        }

        groupedTransactions[date].push(transaction);
    }
    return groupedTransactions;
});

console.log(transactionsGroupedByDate.value);
</script>

<style></style>
