class CreateOptionSelectors < ActiveRecord::Migration
  def change
    create_table :option_selectors do |t|
      t.string :name
      t.boolean :include_blank
      t.boolean :include_cancel

      t.timestamps
    end
  end
end
