# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~     authorization       ~~~~~~~~~~~~~~~~~~~~
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# In Gemfile, general area, need to install
gem 'cancancan'
# bundle

# Generate Ability Model
rails g cancan:ability

# Go to ability.rb file and add the following:
class Ability
  include CanCan::Ability

  def initialize(user)

    user ||= User.new # guest user (not logged in)
    if user.is_admin?
      can :manage, :all
    else
      can :read, :all
    end

    can :manage, Post do |post|
      post.user == user
    end
  end
end   

# in posts/show.html.erb and put this above around 'edit' and 'delete'
<% if user_signed_in? && can?(:manage, @post) %>
<%= link_to "Edit", edit_post_path(@post) %>
<%= link_to "Delete", post_path(@post), method: :delete %>
<% end %>

# Go to posts_controller.rb" and make these 3 additions:
# ~~~~> go to 'update' and at the top put:
return head :unauthorized unless can?(:update, @post)
# ~~~~> in the private section add:
def authorize_user!
    unless can?(:manage, @post)
      flash[:alert] = "Access Denied!"
      redirect_to root_path
    end
end
# ~~~~> at the end of the before_action section, add:
before_action :authorize_user!, except: [:index, :show, :new, :create]
    # `before_action` are executed in the order in which they appear.
    # Make sure that any action that depends on another appears after that action.
    before_action :authenticate_user!, except: [:index, :show]    
    before_action :find_post, only: [:show, :edit, :update, :destroy]    
    before_action :authorize_user!, except: [:index, :show, :new, :create]    

# Gentrate migration 'admin' to users
rails g migration add_is_admin_to_users is_admin:boolean
rails g migration add_user_references_to_posts user:references

rails db:migrate
rails db:seed

# In the migration file, add the default at the end.
class AddIsAdminToUsers < ActiveRecord::Migration
  def change
    add_column :users, :is_admin, :boolean, default: false
  end
end

# rails db:migrate

# Now make an admin, go in seeds.rb
super_user = User.create(
  first_name: 'Super',
  last_name: 'User',
  email: 'su@su.com',
  password: '2222',
  is_admin: true
)
puts "Login as admin user with #{super_user.email} and password of '#{super_user.password}'!"
# rails db:seed

# Now we are going to create 2 controllers only for the admin
rails g controller Admin::Application --no-assets --no-helper --no-routes
rails g controller Admin::Dashboard --no-assets --no-helper --no-routes
# In controllers/admin ~~~> this generates 'application' and 'dashboard'

# Go to dashboard_controller and replace/add:
class Admin::DashboardController < Admin::ApplicationController
    def index
      @stats = {
        post_count: Post.count,
        user_count: User.count
      }

      @users = User.all
    end
end
# the admin application_contorller add:
class Admin::ApplicationController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!
  private
  def authorize_admin!
    redirect_to root_path, alert: 'Access Denied! ❌' unless current_user.is_admin?
  end
end

# Go to routes.rb, at the top write
namespace :admin do
  resources :dashboard, only: [:index]
end

# Go to views/admin/dashboard ~~~> make a new folder called index.html.erb
<h1>Admin Dashboard</h1>

<h2>Post Count: <%= @stats[:post_count] %></h2>
<h2>User Count: <%= @stats[:user_count] %></h2>

<table class="table">
  <tbody>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Created At</th>
      <th>Is Admin?</th>
    </tr>

    <% @users.each do |user| %>
      <tr>
        <td><%= user.id %></td>
        <td><%= user.first_name %></td>
        <td><%= user.last_name %></td>
        <td><%= user.email %></td>
        <td><%= user.created_at %></td>
        <td><%= user.is_admin? %></td>
      </tr>
    <% end %>
  </tbody>
</table>
<!--  -->
# Go to application.html.erb ~~~> add an admin link under Hello
<% if current_user.is_admin? %>
<%= link_to 'Dashboard', admin_dashboard_index_path %>
# <% end %>


************************************************************
Comments

rails g model comment post:references user:references body:text

rails db:migrate




#
