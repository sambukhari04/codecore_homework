class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update,  :destroy]
  def new
    @post = Post.new
  end

  def create
    post_params = params.require(:post).permit(:title, :body)
    @post = Post.new post_params

    if @post.save
      redirect_to post_path(@post)

    else
      render :new

    end
  end

  def show
    # @post = Post.find params[:id]
  end

  def edit
    # @post = Post.find params[:id]
  end

def update
  post_params = params.require(:post).permit(:title, :body)
  # @post = Post.find params[:id]
  if @post.update post_params
    redirect_to @post
  else
    render :edit
  end
end

def index
  @posts = Post.order(created_at: :desc)
end

  def destroy
    # @post = Post.find params[:id]
    @post.delete
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def find_post
    @post = Post.find params[:id]
  end

end
