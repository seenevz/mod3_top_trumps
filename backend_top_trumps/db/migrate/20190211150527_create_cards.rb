class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :description
      t.string :url
      t.integer :attribute_1
      t.integer :attribute_2
      t.integer :attribute_3
      t.integer :attribute_4
      t.integer :attribute_5

      t.timestamps
    end
  end
end
