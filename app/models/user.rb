class User < ApplicationRecord
  validates :username, length: {minimum: 3}, presence: true
  validates :email, presence: true, uniqueness: true


  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  has_secure_password
end
