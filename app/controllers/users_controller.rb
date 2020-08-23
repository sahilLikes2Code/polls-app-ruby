class UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    if @users
      render status: :ok, json: {users: @users}
    else
      render status: :not_found, json: {errors: ["No users found"]}
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    if @user
      render status: :ok, json: {user: @user}
    else
      render status: :not_found, json: {errors: ["User not found"]}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!

      render status: :ok, json: {notice: 'User was created successfully'}
    else
      render status: :unprocessable_entity, json: {errors: @user.errors.full_messages}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
