class Game < ApplicationRecord
    belongs_to :player_one, class_name: 'User', foreign_key: 'player_one_id'
    belongs_to :player_two, class_name: 'User', foreign_key: 'player_two_id'

    def turn(card_one = nil, card_two = nil, attr = nil)

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
