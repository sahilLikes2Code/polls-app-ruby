class PollsController < ApplicationController

  def index
    if logged_in?
      current_user
    end
    @polls = Poll.all
  end


  def new
    if logged_in?
      render
    else
      redirect_to login_path
    end
  end

  def create
    if logged_in?
      @poll = Poll.new(poll_params)
      @poll[:user_id] = current_user.id
      if @poll.save
        render status: :ok, json: {notice: 'Poll created successfully'}
      else
        render status: :unprocessable_entity, json: {errors: @poll.errors.full_messages}
      end
    else
      redirect_to login_path
    end
  end

  def show
    @poll = Poll.find_by_id(params[:id])
    if @poll
      render status: :ok, json: {poll: @poll}
    else
      render status: :not_found, json: {errors: ["Poll not found"]}

    end
  end

  def destroy
    @poll = Poll.find_by_id(params[:id])
    if @poll.present? && @poll[:user_id] == current_user.id
      @poll.destroy!
      render json: {
          status: 200,
          message: "poll deleted successfully"
      }
    else
      render status: :not_found, json: {errors: ["Poll not found or unauthorized access"]}
    end
  end

  private

  def poll_params
    params.require(:poll).permit(:question, :session, options_attributes: [:value])
  end

end
