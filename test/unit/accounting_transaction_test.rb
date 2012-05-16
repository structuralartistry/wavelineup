require 'test_helper'

class AccountingTransactionTest < ActiveSupport::TestCase
  should belong_to :practice
  should belong_to :invoice

  should validate_presence_of :date_time
  should validate_presence_of :practice_id
  should validate_presence_of :income_expense
  should validate_presence_of :amount
  should validate_presence_of :category_id
  should validate_presence_of :account_id
end
