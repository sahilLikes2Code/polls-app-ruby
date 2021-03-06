class VotesController < ApplicationController

  def create
    @poll = Poll.find_by_id(params[:vote][:poll_id])
    if @poll.present? && (already_voted?(@poll) == false)
      @poll.votes.create(user_id: current_user.id)
      @option = @poll.options.find(params[:vote][:option_id])
      @option.update(vote_count: @option.vote_count + 1)
      @option.save
      render status: :ok, json: {notice: 'Your vote has been registered'}
    else
      render status: :unprocessable_entity, json: {errors: ['You have already voted in this poll or Poll with given id not found']}
    end
  end


  private

  def already_voted?(poll)
    poll.voter_ids.include?(current_user.id)
  end

end
