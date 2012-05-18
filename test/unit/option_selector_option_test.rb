require 'test_helper'

class OptionSelectorOptionTest < ActiveSupport::TestCase
  should belong_to :practice
  should belong_to :option_selector
  should have_many :accounting_categories
  should have_many :accounting_accounts
end
