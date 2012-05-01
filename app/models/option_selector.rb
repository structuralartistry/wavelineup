class OptionSelector < ActiveRecord::Base
  has_many :option_selector_options
  attr_accessible :include_blank, :include_cancel, :name
end
