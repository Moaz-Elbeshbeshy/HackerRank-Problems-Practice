const multiplier = (factor) => {
    // return number => number * factor
    return function (number) {
        return number * factor
    }
}

const twice = multiplier(2)
console.log(twice(5))