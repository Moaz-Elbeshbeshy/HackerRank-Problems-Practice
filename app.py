def multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply
twice = multiplier(3)
print(twice(5))
print(twice(5))
print(twice(5))
