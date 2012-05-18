require 'test_helper'

class AccountingTransactionTest < ActiveSupport::TestCase
  should belong_to :practice
  should belong_to :invoice

  should belong_to :accounting_category
  should belong_to :accounting_account

  should validate_presence_of :date_time
  should validate_presence_of :practice_id
  should validate_presence_of :income_expense
  should validate_presence_of :amount
  should validate_presence_of :accounting_category_id
  should validate_presence_of :accounting_account_id

end
