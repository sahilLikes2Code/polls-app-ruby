class VotesController < ApplicationController

  def create
    @poll = Poll.find_by_id(params[:vote][:poll_id])
    if @poll.present? && (already_voted?(@poll) == false)
      @poll.votes.create(user_id: current_user.id)
      @option = @poll.options.find(params[:vote][:option_id])
      @option.update(vote_count: @option.vote_count + 1)

      puts 'my optionnnn'
      puts @option.value
      puts 'current user'
      puts current_user
      puts 'current user inspect'
      puts current_user.inspect
      puts 'user find'
      user = User.find(current_user.id)
      puts 'found user'
      puts user
      user.update(my_vote: @option.value)
      puts 'update user'
      puts user
      user.save
      puts 'updated user'
      puts user
      render status: :ok, json: {notice: 'Your vote has been registered'}
    else
      render status: :unprocessable_entity, json: {errors: ['You have already voted in this poll or Poll with given id not found']}
    end
    # else
    #   render status: :unprocessable_entity, json: {errors: ['Poll with given id not found']}
  end


  private

  def already_voted?(poll)
    poll.voter_ids.include?(current_user.id)
  end

end
