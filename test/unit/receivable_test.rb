require 'test_helper'

class ReceivableTest < ActiveSupport::TestCase
  should belong_to :invoice

  should validate_presence_of :practice_id
  should validate_presence_of :amount
  should validate_presence_of :accounting_category_id
  should validate_presence_of :invoice_id
end
