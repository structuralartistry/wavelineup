class OptionSelectorOption < ActiveRecord::Base
  belongs_to :practice
  belongs_to :option_selector

  attr_accessible :key, :option_selector_id, :value

  store :options, accessors: [ :default_price ]
end
