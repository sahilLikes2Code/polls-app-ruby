class AddMyVoteFieldToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :my_vote, :string
  end
end
