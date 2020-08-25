class VotesController < ApplicationController

  def create
    @poll = Poll.find_by_id(params[:vote][:poll_id])
    puts 'in create'
    puts params
    # puts current_user.id
    puts 'in create'
    # print @poll.inspect
    if @poll.present? && (already_voted?(@poll) == false)
      print "here"
      @poll.votes.create(user_id: current_user.id)
      @option = @poll.options.find(params[:vote][:option_id])
      @option.update(vote_count: @option.vote_count + 1)
      render status: :ok, json: {notice: 'Your vote has been registered'}
    else
      render status: :unprocessable_entity, json: {errors: ['You have already voted in this poll or Poll with given id not found']}
    end
    # else
    #   render status: :unprocessable_entity, json: {errors: ['Poll with given id not found']}
  end


  private

  def already_voted?(poll)
    puts 'consolezz'
    puts session[:user_id]
    puts current_user.id
    puts poll.inspect
    puts poll.voter_ids
    puts poll.voter_ids.include?(12)
    puts 'consolezz'
    poll.voter_ids.include?(current_user.id)
  end

end
