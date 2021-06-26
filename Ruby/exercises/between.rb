def check_number
    puts "Enter a number from 0 to 100"
    number = gets.chomp.to_i
    if number.negative?
        puts "Negative number not allowed"
    elsif number > 100
        puts "Number is above 100"
    else
        puts (number.between?(0, 50)) ? "Number is between 0 and 50" : "Number is between 51 and 100"
    end
end
check_number