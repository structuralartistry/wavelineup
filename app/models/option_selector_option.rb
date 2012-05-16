class OptionSelectorOption < ActiveRecord::Base
  belongs_to :practice
  belongs_to :option_selector

  attr_accessible :option_selector_id, :value, :default_price
end
