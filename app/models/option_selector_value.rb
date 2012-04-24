class OptionSelectorValue < ActiveRecord::Base
  belongs_to :option_selector

  attr_accessible :key, :option_selector_id, :value
end
