def check_square
    puts "Please enter a number"
    number = gets.chomp.to_i
    if number < 0
        return false
    elsif number == 0
        return true
    elsif number > 0
        for i in 1..number do
            if number / i == i
                return true
            end
        end
        return false
    end
end
puts check_square