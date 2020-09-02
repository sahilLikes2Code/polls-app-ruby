class SessionsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by(email: session_params[:email].downcase)
    if @user&.authenticate(session_params[:password])
      login!
      render status: :ok, json: {
          notice: 'Successfully logged in!'
      }
    else
      render status: :unprocessable_entity, json: {errors: ["Incorrect credentials, try again."]}
    end
  end

  def new
    if logged_in?
      redirect_to root_path
    else
      render
    end
  end

  def is_logged_in?
    if current_user && logged_in?
      render json: {
          logged_in: true,
          user: current_user
      }
    else
      render json: {
          logged_in: false,
          errors: ['no such user']
      }
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {status: 200, logged_out: true}
    else
      render json: {errors: ["already logged out"]}
    end
  end

  private

  def session_params
    params.require(:login).permit(:username, :email, :password)
  end
end
