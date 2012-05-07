require 'test_helper'

class AccountingTransactionTest < ActiveSupport::TestCase
  should validate_presence_of :date_time
  should validate_presence_of :credit_debit_key
  should validate_presence_of :amount
  should validate_presence_of :category_key
  should validate_presence_of :account_key
end
