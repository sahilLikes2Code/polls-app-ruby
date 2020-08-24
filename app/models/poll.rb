class Poll < ApplicationRecord
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options
  validates_length_of :options, minimum: 4, maximum: 4
  validates :question, presence: true, uniqueness: true

  belongs_to :user
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
end
