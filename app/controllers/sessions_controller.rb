class SessionsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    user = User.find_by(email: session_params[:email].downcase)
    if user&.authenticate(session_params[:password])
      session[:user_id] = user.id.to_s
      print params
      render status: :ok, json: {notice: 'Successfully logged in!'}
    else
      render status: :not_found, json: {errors: ['Incorrect credentials, try again.']}
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
          message: 'no such user'
      }
    end
  end

  def destroy
    logout!
    render json: {
        status: 200,
        logged_out: true
    }
  end

  private

  def session_params
    params.require(:user).permit(:username, :email, :password)
  end
end
