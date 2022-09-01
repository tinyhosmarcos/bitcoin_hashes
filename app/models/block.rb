class Block < ApplicationRecord
  # Validations
  validates :hash_id, presence: true, uniqueness: true
  validates :prev_block, presence: true
  validates :block_index, presence: true
  validates :time, presence: true
  validates :bits, presence: true
end
