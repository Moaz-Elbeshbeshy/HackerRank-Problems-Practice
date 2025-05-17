def count_char_overlap(word, ch):
    count = 0
    for i in range(len(word) - len(ch) + 1):
        if word[i:i+len(ch)] == ch:
            count += 1
    return count

print(count_char_overlap('Bussss', 'ss'))  # Output: 3
