class GamesController < ApplicationController
  include ActionController::Live

  before_action :find_round, only: [:update_state, :round, :winner]
  before_action :find_player_one, :find_player_two, only: :winner
  before_action :find_game, only: [:show, :winner, :round]

  def index
    @games = Game.all
    render json: @games
  end

  def show
    render json: @game
  end

  def create
    current_round = RoundState.last
    # byebug
    if current_round && current_round.p1_id && !current_round.game_id && !current_round.p2_id
      user_two = User.find_or_create_by(name: params[:player_two_name])
      current_round.p2_id = user_two.id

      current_round.save
    else
      round = RoundState.new

      user_one = User.find_or_create_by(name: params[:player_one_name])
      round.p1_id = user_one.id
      round.save
    end

    if current_round && current_round.p1_id && current_round.p2_id && !current_round.game_id
      player_one = User.find_by(id: current_round.p1_id)
      player_two = User.find_by(id: current_round.p2_id)
      game = Game.create(player_one: player_one, player_two: player_two)
      current_round.game_id = game.id
      (rand < 0.5) ? current_round.turn = true : current_round.turn = false
      # byebug
      current_round.save

      render json: current_round
    else

      # byebug
      render json: round
    end
  end

  def random(pool = Card.all)
    @random = []
    pool_ids = pool.map { |x| x.id }

    5.times do
      id = pool_ids.slice!(rand(0...pool_ids.length))
      @random << (pool.find_by(id: id))
    end

    render json: @random
  end

  def state
    round = RoundState.last
    render json: round
  end

  def update_state
    # byebug
    if @round.update(update_round_params)
      redirect_to round and return
      # render json: @round
    else
      render json: { error: "Can't update state" }
    end
  end

  def round
    find_game
    # byebug
    if @round.attr_name
      #find out whos the card winner
      # byebug
      loser_card = @game.turn(@round.p1_card_id, @round.p2_card_id, @round.attr_name)
      new_round = RoundState.new(game: @game, p1_id: @game.player_one_id, p2_id: @game.player_two_id)

      loser_card.id == @round.p1_card_id ? new_round.next_turn_player_id = @game.player_one_id : new_round.next_turn_player_id = @game.player_two_id

      if new_round.save
        # byebug
        render json: { loserCard: loser_card, newRound: new_round }
      else
        render json: { error: "Can't create turn" }
      end
    else
      render json: @round
    end
  end

  def winner
    winner_pl = @game.winner(@round.p1_cards_amount, @round.p2_cards_amount)
    # byebug

    if winner_pl.in? [true, false]
      case winner_pl
      when true
        @game.update(winner_id: @player_one.id)
        render json: @player_one
      when false
        @game.update(winner_id: @player_two.id)
        render json: @player_two
      end
    else
      render json: @round
    end
  end

  private

  def find_player_one
    @player_one = User.find_by(id: @round.p1_id)
  end

  def find_player_two
    @player_two = User.find_by(id: @round.p2_id)
  end

  def find_game
    # byebug
    @game = Game.find_by(id: @round.game_id)
  end

  def find_round
    # byebug
    @round = RoundState.find_by(id: params[:round_id])
  end

  def update_round_params
    params.permit(:p1_id, :p2_id, :p1_card_id, :p2_card_id, :p1_cards_amount, :p2_cards_amount, :next_turn_player_id, :attr_name)
  end
end
