class OptionSelector < ActiveRecord::Base
  has_many :option_selector_values
  attr_accessible :include_blank, :include_cancel, :name
end
