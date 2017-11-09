class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_post, only: [:create, :destroy]
  before_action :find_comment, only: [:destroy]
  before_action :authorize_user!, except: [:create, :destroy]

  def create
    @comment = @post.comments.build(comment_params)

    @comment.user = current_user

    if @comment.save
      redirect_to post_path(@post)
    else
      @comments = @post.comments.order(created_at: :desc)
      render 'posts/show'
    end
  end

  def destroy
    authorize! :destroy, @comment
    @comment.destroy
    redirect_to post_path(@post)
  end

  private
  def find_post

    @post = Post.find(params[:post_id])
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end

  def authorize_user!
    # binding.pry
    unless can?(:manage, @comment)
      flash[:alert] = "Access Denied!"
      redirect_to root_path
    end
  end
end
