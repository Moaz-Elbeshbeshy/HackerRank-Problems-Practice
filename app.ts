const multiplier = (factor: number) => {
    // return (number: number): number => number * factor
    return function (number: number): number {
        return number * factor
    }
}

const twice: (n: number) => number = multiplier(3)
console.log(twice(5))
console.log(twice(6))
console.log(twice(6))