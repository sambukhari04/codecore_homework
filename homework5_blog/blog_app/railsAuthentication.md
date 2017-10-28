# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~     authentication      ~~~~~~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Add model user
rails g model user first_name last_name email password_digest    

# Add an index on the email field in the migration ~~~> after the loop ends (after 1st 'end')
add_index :users, :email, unique: true
# rails db:migrate

# In the User model, add:
has_secure_password

# Go to Gemfile and un-comment 'bcrypt'
# bundle

# Make a users controller
rails g controller users

# Go to routes.rb and add:
resources :users, only: [:new, :create]

# Go to users_controller.rb  ~~~> add 'new' and 'create' actions template

# Make app/views/users/new.html.erb  ~~~> add a 'Sign Up' form template

# Make a sessions controller
rails g controller sessions    

# Go to sessions_controller.rb ~~~> add 'new' and 'create' actions template

# Make app/views/sessions/new.html.erb  ~~~> add a 'Sign In' form template

# Go to routes.rb and add:
resources :sessions, only: [:new, :create] do
  delete :destroy, on: :collection
end

# Go to sessions_controller.rb ~~~> add the 'destroy' action template

# Go to application.html.erb ~~~> Add 'Sign Up' and 'Sign In' to the navbar
<%= link_to "Sign In", new_session_path %>
<%= link_to "Sign Up", new_user_path %>

# Go and check your routes. Make sure the routes in your 'routes file'
# are the same as the ones on your 'application.html.erb', and are the
# same as in the 'forms pages'. Also make sure syntax in html form is correct.
# Now you should be able to see the 'sign up' and 'sign in' form.
# If you are getting a 'bcrypt' error, restart the server.

# Go to applications_controller.rb ~~~> add: authenticate_user!, user_signed_in?,
      # and current_user actions template.

# Go to posts_controller.rb ~~~> add first thing at the top:
before_action :authenticate_user!, except: [:index, :show]

# Go to application.html.erb and put an if/else logic that says if the user
      # is signed in, show their name+logout, else show login+signout
<nav>
  <%= link_to "Home", root_path %></a>
  <%= link_to "New", new_post_path %></a>
  <%= link_to "Posts", posts_path %></a>

  <% if user_signed_in? %>
    Hello <%= current_user.first_name %>,   
    <%= link_to 'Sign Out', sessions_path, method: :delete %>
  <% else %>
    <%= link_to "Sign In", new_session_path %>
    <%= link_to "Sign Up", new_user_path %>
  <% end %>
</nav>     

# Check that all above is working correctly.

# Go to posts_controller.rb and edit the 'create' action
@post.user = current_user

# Go to user.rb and add:
has_many :posts, dependent: :destroy

# Go to the post.rb and add first thing at the top:
belongs_to :user

# Add user to post.rb
rails g migration add_user_to_post user:references  
# rails db:migrate

# Make some user names to go in the posts. ~~~> Go into seeds.rb
User.destroy_all
5.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(
      first_name: first_name,
      last_name: last_name,
      email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
      password: '3333'
  )
end
users = User.all
puts Cowsay.say("Created #{users.count} users", :tux)
# rails db:seed





<!--  -->
