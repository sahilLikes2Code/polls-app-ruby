class AddMyVoteFieldToVote < ActiveRecord::Migration[6.0]
  def change
    add_column :votes, :my_vote, :string
  end
end
