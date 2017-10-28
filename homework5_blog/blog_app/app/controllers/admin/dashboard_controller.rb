class Admin::DashboardController < ApplicationController
  def index
      @stats = {
        post_count: Post.count,
        user_count: User.count
      }

      @users = User.all
    end
end
