require 'test_helper'

class OptionSelectorOptionTest < ActiveSupport::TestCase
  should belong_to :practice
  should belong_to :option_selector
end
