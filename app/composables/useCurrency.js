export const useCurrency = (amount) => {
    const currency = computed(() => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(isRef(amount) ? amount.value : amount);
    });

    return {
        currency,
    };
};
