class GamesController < ApplicationController
    include ActionController::Live
    
    before_action :find_game, :find_player_one, :find_player_two, only: :round_result
    before_action :find_game, only: :show

    def index
        @games = Game.all
        render json: @games
    end

    def show
        render json: @game
    end
    
    def create
        player_one = nil
        player_two = nil
        
        if player_one && player_two
            @game = Game.new(player_one_id: player_one, player_two_id: player_two)
            if @game.save
                render json: @game
            else
                render json: {error: "Can't create game"}
            end
        else
            render json: {message: 'wait'}
        end
    end



    def random(pool = Card.all)
        @random = []
        pool_ids = pool.map{|x| x.id}
        
        5.times do 
            id = pool_ids.slice!(rand(0..pool_ids.length))
            @random << (pool.find_by(id: id))
        end

        render json: @random
    end

    def round_result
        # @game = Game.find_by(id: params[:game_id])
        winner_pl = @game.winner(params[:pl_one_cards], params[:pl_two_cards])
        byebug

        if winner_pl.is_a?(true.class)

            case winner_pl
            when true
                @game.update(winner_id: @player_one.id)
                render json: @player_one
            when false
                @game.update(winner_id: @player_two.id)
                render json: @player_two
            end
        else
            render json: @game.turn(card_one, card_two, attr)            
        end
        
    
    end

    private

    def find_player_one
        @player_one = User.find_by(id: params[:player_one_id])
    end

    def find_player_two
        @player_two = User.find_by(id: params[:player_two_id])
    end

    def find_game
        @game = Game.find_by(id: params[:game_id])
    end


end
