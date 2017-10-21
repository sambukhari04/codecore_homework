class HomeController < ApplicationController
  def hello

  end

  def index
    @posts = Post.limit(7)
  end
end
