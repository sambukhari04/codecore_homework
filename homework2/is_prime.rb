require "prime"
def is_prime?(num)
  if Prime.prime?(num) == true
    return true
  else
    return false
  end
end

p is_prime(5)
p is_prime(2)
p is_prime(144)

)
