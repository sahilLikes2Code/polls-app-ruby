json.polls @polls do |poll|
  json.question poll.question
  json.options poll.options
  json.poll_id poll.id
  json.voter_ids poll.voter_ids
  json.total_votes poll.votes.count
  json.username current_user.username
  json.user_id current_user.id
  json.logged_in logged_in?
end
