class CreatePolls < ActiveRecord::Migration[6.0]
  def change
    create_table :polls do |t|
      t.string :question
      #Fixme t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
