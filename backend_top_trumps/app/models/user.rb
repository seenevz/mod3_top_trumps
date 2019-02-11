class User < ApplicationRecord
    has_many :games, as: :player_one
    has_many :games, as: :player_two

    validates :name, presence: true
end
