count = 0
sum = 0
num = []
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
for i in 0..arr.length - 1 do
    if arr[i] > 0
        count += 1
    elsif arr[i] < 0
        sum = sum + arr[i]
    end
end
puts num.push(count).push(sum)