export const useFetchTransactions = () => {
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
          expense.value.reduce(
               (sum, transaction) => sum + transaction.amount,
               0
          )
     );
     const investmentTotal = computed(() =>
          investment.value.reduce(
               (sum, transaction) => sum + transaction.amount,
               0
          )
     );
     const savingsTotal = computed(() =>
          savings.value.reduce(
               (sum, transaction) => sum + transaction.amount,
               0
          )
     );

     const fetchTransactions = async () => {
          pending.value = true;
          try {
               const { data, pending } = await useAsyncData(
                    "transactions",
                    async () => {
                         const { data, error } = await supabase
                              .from("transactions")
                              .select()
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

     return {
        transactions: {
            all: transactions,
            groupedTransactions: {
                byDate: transactionsGroupedByDate
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
            savingsCount
        },
        refresh,
        pending
     }
};
