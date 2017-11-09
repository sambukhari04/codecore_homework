# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~    RAILS Master Documentation (project Blog)   ~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# To start a new App project
rails new blog

# In Gemfile, add the following gems:
Global:
gem 'faker', github: 'stympy/faker'
gem 'cowsay', '~> 0.3.0'

group :development
gem 'pry' #pry gem itself
gem 'pry-rails' #a gem that integrates pry with rails seemlessly
gem 'hirb'

# After installing a gem, you need to run:
bundle  # manages gems for the project

# Generate controllers
rails g controller home
rails g controller posts  # to reverse action: rails d controller posts
rails g controller comments  

# Define routes in routes.rb
root 'home#index'  # get('/', { to: 'home#index' })
resources :posts do
    resources :comments, shallow: true, only: [:create, :destroy]
end
    # For posts ~~~> this generates:
    # get('posts/new',  to: 'posts#new', as: :new_post )        # to show a new post form
    # get('posts', to: 'posts#index' )                          # to show an index of all the posts     
    # post('posts', to: 'posts#create', as: :posts )            # when form is complete, to create a new post
    # get('posts/:id', to: 'posts#show', as: :post )            # to view details of the post
    # get('posts/:id/edit', to: 'posts#edit', as: :edit_post )  # to edit a post
    # patch('posts/:id', to: 'posts#update' )                   # the update action
    # delete('posts/:id', to: 'posts#destroy' )                 # to delete a post

# To see what routes you have in your project
rails routes

# In home_controller.rb
def index   # This will render ~~~> app/views/home/index.html.erb
end

# In posts_controller.rb, make the following actions:
new         # To make a new post in views/posts/new.html.erb
create      # To pass input values directly into Post.new
show        # To use our instance @post in views/posts/show.html.erb
index       # To use our instance @post in views/posts/index.html.erb
edit        # To edit
update      # To update
destroy     # To delete
# Remember, you will need to add 'before_action' and 'private' methods to refractor

# In the comments_controller, make the following actions:
create
destroy
# Remember, you will need to add 'before_action' and 'private' methods to refractor

# When you make changes in .rb file, you need to go into 'rails c' (rails console) and reload:
reload!  
# to get out of pry ~~~> exit
# to quit pry ~~~~> q

# Generate model
rails g model post title:string body:text # each 'post' has 'title' and 'body'
rails g model comment body:text

# This generates post.rb  ~~~> put any validations that you need
validates :title, presence: true, uniqueness: true
validates :body, presence: true, length: {minimum: 5, maximum: 2000}

# This generates comment.rb  ~~~> put any validations that you need
belongs_to :user
belongs_to :post
validates :body, presence: :true

# Migrate the database. This creates a table in the databse
rails db:migrate  # to rollback the last migrate ~~~> rails db:rollback

# To add/remove/modify a column in your database, see example:
rails g migration change_column_in_post title:text
rails g migration add_column_in_post rating:integer

# Basic Querying
p = Post.all  # to fetch all records
p = Post.create({ title: 'What is your name?', body: 'Do you really need an explanation for this?' }) # new post
p.update(title: 'What name is that?') # to update
p.destory # to delete
Post.last
Post.count
Post.find_by_title('Hello world')

# To seed the database using Faker, go to seeds.rb
Post.destroy_all  # first delete all the current posts
10.times.each do
    Post.create(title: Faker::MostInterestingManInTheWorld.quote,
                body: Faker::Seinfeld.quote)
end
posts = Post.all
puts Cowsay.say("Created #{posts.count} posts", :moose)
# rails db:seed

# In posts_controller.rb ~~~> write your 'new' action
# Make app/views/posts/_form.html.erb  ~~~> make a standard form
# Make app/views/posts/new.html.erb
<h1>New Post</h1>
# <%= render "form" %>

# In posts_controller.rb ~~~> write your 'create' action (to create the post)

# app/views/posts/_form.html.erb  ~~~> put an error message on top (to show input errors)

# In posts_controller.rb ~~~> write your 'show' action (to show the post details)

# make app/views/questions/show.html.erb ~~~> put post details
<h1><%= @post.title %></h1>
<p><%= @post.body %></h2>

# In posts_controller.rb ~~~> write your 'index' action (to list all the posts)
# make app/views/questions/index.html.erb ~~~> write a loop to loop through all posts

# In posts_controller.rb ~~~> write your 'edit' action (to edit a post)
# make app/views/questions/edit.html.erb ~~~> put:
<h1>Edit Post</h1>
# <%= render "form" %>
# add an 'edit link' in show.html.erb to send you to edit.html.erb  
# <%= link_to "Edit", edit_post_path(@post) %>

# In posts_controller.rb ~~~> write your 'update' action (to capture new input and update post)

# In posts_controller.rb ~~~> write your 'destroy' action (to delete a post)
# add an 'delete link' in show.html.erb and redirect to posts page
# <%= link_to "Delete", post_path(@post), method: :delete %>

# Refactor: before_action and in private methods: post_params, find_post
