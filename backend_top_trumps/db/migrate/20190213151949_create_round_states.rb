class CreateRoundStates < ActiveRecord::Migration[5.2]
  def change
    create_table :round_states do |t|
      t.integer :p1_id
      t.integer :p2_id
      t.integer :p1_card_id
      t.integer :p2_card_id
      t.string :p1_cards_amount
      t.string :p2_cards_amount
      t.string :attr_name
      t.boolean :turn
      t.integer :winner_card_id
      t.integer :game_id

      t.timestamps
    end
  end
end
