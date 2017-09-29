module HelperMethods
  def titleize(string)
new_string = string.split(" ")
array = []
# new_string = string.exclude("in", "the", "of", "and", "or", "from")



new_string.each do |x|
  if ( x == 'in') || ( x == 'the') || ( x == 'of') || ( x == 'and') || ( x == 'or') || ( x == 'from')
     array << x
  else
    array << x.capitalize
  end

 end
 return array.join(" ")

end

end

class Class1
  include HelperMethods
end
class Class2
  extend HelperMethods
end



p Class2.titleize("How are you and your or fucking in the club of the from  tonite")



# module HelperMethods
#   def self.titleize(string)
#     string.squeeze(" ").capitalize
#   end
# end
#
# class User
#   attr_accessor :name
#   include HelperMethods
# end
#
# class Car
#   attr_accessor :name
#   include HelperMethods
# end
#
# u      = User.new
# u.name = "sam"
# puts u.name_display
# c      = Car.new
# c.name = "honda"
# puts c.name_display
