class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:new, :create]


  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Logged In!"
    else
      render :new
    end
  end
  def show
    @user = User.find params[:id]
  end

  def edit
    @user = current_user #User.find params[:id]
  end

  def update
    @user = current_user
    return head :unauthorized unless can?(:update, @user)
    # @post = Post.find params[:id]
    if @user.update user_params
      redirect_to root_path
    else
      render :edit
    end
  end

  def change_password

    @user = current_user
  end

  def update_password

    @user = current_user
    # u_params = params[:user]
    if @user.authenticate params[:user][:current_password]
      if user_params[:password] == user_params[:password_confirmation]
        @user.update user_params
        redirect_to edit_user_path(current_user), notice: "Password Changed"

      else
        redirect_to change_password_path flash[:alert] = "Password must match"
      end
    else
      redirect_to change_password_path flash[:alert] = "Incorrect password"
    end

  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
    )
  end
end
