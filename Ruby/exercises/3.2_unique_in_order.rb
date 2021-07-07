def unique_in_order(input)
    input.class == String ? input.squeeze.split('') : input.class == Array ? input.join.squeeze.split('') : 'Invalid input'
end

p unique_in_order('AAAABBBCCDAAABBB')
p unique_in_order('ABBCcAD')
p unique_in_order([1, 2, 2, 3, 3])