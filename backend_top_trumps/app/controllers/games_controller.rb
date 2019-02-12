class GamesController < ApplicationController
    def create
        @game = Game.new()        
    end

    def random(pool = Card.all)
        @random = []
        pool_ids = pool.map{|x| x.id}
        # pool = Card.all.to_ary
        
        # byebug
        5.times do 
            id = pool_ids.slice!(rand(0..pool_ids.length))
            @random << (pool.find_by(id: id))
        end

        render json: @random
    end


end
