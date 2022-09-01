class CreateBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :blocks do |t|
      t.string :hash_id, null: false
      t.string :prev_block, null: false
      t.integer :block_index, null: false
      t.integer :time, null: false
      t.integer :bits, null: false

      t.timestamps
    end
  end
end
