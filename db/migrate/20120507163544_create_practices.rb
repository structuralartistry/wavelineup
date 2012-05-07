class CreatePractices < ActiveRecord::Migration
  def change
    create_table :practices do |t|
      t.string :name
      t.string :time_zone
      t.integer :referring_practice_id

      t.timestamps
    end
  end
end
