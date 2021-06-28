class Confection
    def bake
        puts "Baking at 350 degrees for 25 minutes"
    end
end

class Cupcake < Confection
    def frost
        puts "Applying frosting"
    end
end

class Banana_Cake < Confection
end

cupcake = Cupcake.new
cupcake.bake
cupcake.frost

banana_cake = Banana_Cake.new
banana_cake.bake