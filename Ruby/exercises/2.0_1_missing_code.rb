class Speaker
    def initialize(speaker, quote)
        @speaker = speaker
        @quote = quote
    end

    def speak
        puts "#{@speaker} says #{@quote}"
    end
end

rendon = Speaker.new('Rendon Labador', 'iwan mo pati pamilya mo')
bon = Speaker.new('Bon Axl Feeser', 'tara na sa adonis')
rendon.speak
bon.speak

class Profile
    attr_accessor :full_name, :age, :address, :work
    def initialize(full_name, age, address, work)
        @full_name = full_name
        @age = age
        @address = address
        @work = work
    end
end
  
my_profile = Profile.new('Juan', 18, 'Bulacan', 'Instructor')
  
puts my_profile.full_name
my_profile.full_name = 'Juan Cruz'
  
my_profile.age = 25
my_profile.work = 'Software Engineer'
  
puts my_profile.full_name
puts my_profile.age
puts my_profile.work
puts my_profile.address