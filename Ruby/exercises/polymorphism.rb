class Profession
    def initialize(name)
        @name = name
    end

    def introduce
        puts "Hello! My name is #{@name} and I am a professional"
    end

    def tambay
        puts "Hello! My name is #{@name} and I am a tambay"
    end
end

class Engineer < Profession
    def introduce
        puts "Hello! My name is #{@name} and I am an engineer"
    end
end

class Accountant < Profession
    def introduce
        puts "Hello! My name is #{@name} and I am an accountant"
    end
end

class Tambay
    def introduce(tambay)
        tambay.tambay
    end
end

# polymorphism
bon = Engineer.new("Bon")
bon.introduce
axl = Accountant.new("Axl")
axl.introduce
bon_axl = Profession.new("Bon Axl")
bon_axl.introduce

# duck typing
randy = Profession.new("Randy")
randy_tambay = Tambay.new
randy_tambay.introduce(randy)