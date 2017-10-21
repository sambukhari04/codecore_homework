class Post < ApplicationRecord

  validates(:title,{
    presence: {message: 'must be provided'},
    uniqueness: true
    })
    validates(:body, {
      presence: true,
      length: {minimum: 5, maximum:2000}
    })

  
end
