json.polls @polls do |poll|
  json.question poll.question
  json.options poll.options
  json.poll_id poll.id
  json.voter_ids poll.voter_ids
  json.total_votes poll.votes.count
end

if current_user
  json.current_user do
    json.username current_user.username
    json.user_id current_user.id
    json.my_vote current_user.my_vote
  end
end



