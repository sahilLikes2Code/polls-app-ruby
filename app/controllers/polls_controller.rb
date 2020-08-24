class PollsController < ApplicationController


  def index
    @polls = Poll.all
    if @polls
      render status: :ok, json: {polls: @polls}
    else
      render status: :not_found, json: {errors: ["No polls found"]}
    end
  end

  def create
    if logged_in?
      @poll = Poll.new(poll_params)
      @poll[:user_id] = current_user.id
      if @poll.save
        render status: :ok, json: {notice: 'Poll was created successfully'}
      else
        render status: :unprocessable_entity, json: {errors: @poll.errors.full_messages}
      end
    else
      render status: :bad_request, json: {errors: "User not logged in"}
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
    # Fixme, try to refactor in a better manner
    # else
    #   render status: :bad_request, json: {errors: ["Unauthorized access"]}
    # end
  end

  private

  def poll_params
    params.require(:poll).permit(:question, :session, options_attributes: [:value])
  end

end
