import {startOfYear, endOfYear, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, sub} from 'date-fns'

export const useSelectedTimePeriod = (period) => {
    const current = computed(() => {
        switch (period.value) {
            case 'Yearly':
                return {
                    current: {
                        from: startOfYear(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfYear(sub(new Date(), {years: 1})),
                        to: endOfYear(sub(new Date(), {years: 1}))
                    }
                }
            case 'Monthly':
                return {
                    current: {
                        from: startOfMonth(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfMonth(sub(new Date(), {months: 1})),
                        to: endOfMonth(sub(new Date(), {months: 1}))
                    }
                }
            case 'Weekly':
                return {
                    current: {
                        from: startOfWeek(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfWeek(sub(new Date(), {weeks: 1})),
                        to: endOfWeek(sub(new Date(), {weeks: 1}))
                    }
                }
            case 'Daily':
                return {
                    current: {
                        from: startOfDay(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfDay(sub(new Date(), {days: 1})),
                        to: endOfDay(sub(new Date(), {days: 1}))
                    }
                }
        }
    })

    const previous = computed(() => {
        switch (period.value) {
            case 'Yearly':
                return {
                    current: {
                        from: startOfYear(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfYear(sub(new Date(), {years: 1})),
                        to: endOfYear(sub(new Date(), {years: 1}))
                    }
                }
            case 'Monthly':
                return {
                    current: {
                        from: startOfMonth(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfMonth(sub(new Date(), {months: 1})),
                        to: endOfMonth(sub(new Date(), {months: 1}))
                    }
                }
            case 'Weekly':
                return {
                    current: {
                        from: startOfWeek(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfWeek(sub(new Date(), {weeks: 1})),
                        to: endOfWeek(sub(new Date(), {weeks: 1}))
                    }
                }
            case 'Daily':
                return {
                    current: {
                        from: startOfDay(new Date()),
                        to: new Date()
                    },
                    previous: {
                        from: startOfDay(sub(new Date(), {days: 1})),
                        to: endOfDay(sub(new Date(), {days: 1}))
                    }
                }
        }
    })
    return {current, previous}
}