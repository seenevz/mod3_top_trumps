class Card < ApplicationRecord

    def compare (opponent, attribute)
        attr = attribute.to_sym

        if self[attr] > opponent[attr]
            self
        else
            opponent
        end
    end
end
