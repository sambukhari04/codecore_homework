# Given a ruby Hash that looks like this:
#
# major_cities = {BC: ["Vancouver", "Victoria", "Prince George"], AB: ["Edmonton", "Calgary"]}
# Write a piece of code that loops through the object and prints the following to the console:
#
# BC has 3 main cities: Vancouver, Victoria, Prince George
# AB has 2 main cities: Edmonton, Calgary

major_cities = {BC: ["Vancouver", "Victoria", "Prince George"], AB: ["Edmonton", "Calgary"]}

def cities (city)
  city.each do |key, value|
    value [-1] = "and #{value[-1]}"
    puts "#{key} has #{value.length}: its main cities are #{value.join(", ")}"
  end
end

cities(major_cities)
