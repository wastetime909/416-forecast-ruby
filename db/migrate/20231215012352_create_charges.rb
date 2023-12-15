class CreateCharges < ActiveRecord::Migration[7.1]
  def change
    create_table :charges do |t|
      t.date :charged_on
      t.decimal :amount, precision: 8, scale: 2

      t.timestamps
    end
  end
end
