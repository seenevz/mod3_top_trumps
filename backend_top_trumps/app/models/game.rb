class Game < ApplicationRecord
    belongs_to :player_one, class_name: 'User', foreign_key: 'player_one_id'
    belongs_to :player_two, class_name: 'User', foreign_key: 'player_two_id'
    has_many :rounds

    def turn(card_one_id = nil, card_two_id = nil, attr = nil)
        card_one = Card.find_by(id: card_one_id)
        card_two = Card.find_by(id: card_two_id)
        
        if attr
            loser = card_one.compare(card_two, attr)
            return loser
        else
            return 'wait'
        end
    end

    def winner (pl_one_cards, pl_two_cards)

        if pl_two_cards == '0'
            return true
        elsif pl_one_cards == '0'
            return false
        else
            'wait'
        end
    end
end
