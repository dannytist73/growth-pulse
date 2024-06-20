export const useFetchTransactions = (period) => {
    const supabase = useSupabaseClient();
    const transactions = ref([]);
    const pending = ref(false);

    const income = computed(() =>
        transactions.value.filter((t) => t.type === "Income")
    );
    const expense = computed(() =>
        transactions.value.filter((t) => t.type === "Expense")
    );
    const investment = computed(() =>
        transactions.value.filter((t) => t.type === "Investment")
    );
    const savings = computed(() =>
        transactions.value.filter((t) => t.type === "Savings")
    );

    const incomeCount = computed(() => income.value.length);
    const expenseCount = computed(() => expense.value.length);
    const investmentCount = computed(() => investment.value.length);
    const savingsCount = computed(() => savings.value.length);

    const incomeTotal = computed(() =>
        income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
    );
    const expenseTotal = computed(() =>
        expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
    );
    const investmentTotal = computed(() =>
        investment.value.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )
    );
    const savingsTotal = computed(() =>
        savings.value.reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    const fetchTransactions = async () => {
        pending.value = true;
        try {
            const { data, pending } = await useAsyncData(
                `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
                async () => {
                    const { data, error } = await supabase
                        .from("transactions")
                        .select()
                        .gte("created_at", period.value.from.toISOString())
                        .lte("created_at", period.value.to.toISOString())
                        .order("created_at", { ascending: false });
                    if (error) return [];
                    return data;
                }
            );
            return data.value;
        } finally {
            pending.value = false;
        }
    };

    const refresh = async () =>
        (transactions.value = await fetchTransactions());

    watch(period, async (previousValue, currentValue) => {
        if (
            previousValue.from.toISOString() ===
                currentValue.from.toISOString() &&
            previousValue.to.toISOString() === currentValue.to.toISOString()
        ) {
            return;
        }

        await refresh();
    });

    const transactionsGroupedByDate = computed(() => {
        let groupedTransactions = {};

        for (const transaction of transactions.value) {
            const date = transaction.created_at.split("T")[0];

            if (!groupedTransactions[date]) {
                groupedTransactions[date] = [];
            }

            groupedTransactions[date].push(transaction);
        }
        return groupedTransactions;
    });

    return {
        transactions: {
            all: transactions,
            groupedTransactions: {
                byDate: transactionsGroupedByDate,
            },
            income,
            expense,
            investment,
            savings,
            incomeTotal,
            expenseTotal,
            investmentTotal,
            savingsTotal,
            incomeCount,
            expenseCount,
            investmentCount,
            savingsCount,
        },
        refresh,
        pending,
    };
};
