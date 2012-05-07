require 'test_helper'

class InvoiceTest < ActiveSupport::TestCase
  should belong_to :practice

  should belong_to :identity

  should have_many :accounting_transactions
  should have_many :receivables

  should validate_presence_of :date_time
  should validate_presence_of :practice_id
end
