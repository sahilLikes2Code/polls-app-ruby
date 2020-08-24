class AddUserToPoll < ActiveRecord::Migration[6.0]
  def change
    add_reference :polls, :user, null: false, foreign_key: true
    # Fixme purposely commented, will try to fix later
  end
end
