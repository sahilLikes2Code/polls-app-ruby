class Option < ApplicationRecord
  belongs_to :poll
  validates :value, length: {minimum: 1}
end
