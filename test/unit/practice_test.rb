require 'test_helper'

class PracticeTest < ActiveSupport::TestCase
  should have_many :invoices
  should have_many :accounting_transactions
  should have_many :option_selector_options
end
