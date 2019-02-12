class Game < ApplicationRecord
    belongs_to :player_one, class_name: 'User', foreign_key: 'player_one_id'
    belongs_to :player_two, class_name: 'User', foreign_key: 'player_two_id'

    
end
