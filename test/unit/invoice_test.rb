require 'test_helper'

class InvoiceTest < ActiveSupport::TestCase
  should belong_to :practice
  should have_many :accounting_transactions

  should validate_presence_of :date_time
  should validate_presence_of :practice_id
end
