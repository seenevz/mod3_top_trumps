class GamesController < ApplicationController
    def create
        @game = Game.new()        
    end

    def random
        @random = []
        pool = Card.all.to_ary

        byebug
        5.times do 
            @random << (pool.fetch(rand(0..pool.length)))
        end

        render json: @random
    end


end
