const multiplier = (factor: number) => {
    // return (number: number): number => number * factor
    return function (number: number): number {
        return number * factor
    }
}

const twice: (n: number) => number = multiplier(2)
console.log(twice(5))