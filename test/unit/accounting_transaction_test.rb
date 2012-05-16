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

  should 'access the related OptionSelectorOption model assigned to category_id' do
    option_selector_option = Factory(:option_selector_option, :value => 'something special')

    accounting_transaction = Factory(:accounting_transaction)

    accounting_transaction.category_id = option_selector_option.id

    accounting_transaction.save

    assert accounting_transaction.reload.category.value == option_selector_option.value
  end

  should 'access the related OptionSelectorOption model assigned to account_id' do
    option_selector_option = Factory(:option_selector_option, :value => 'something special')

    accounting_transaction = Factory(:accounting_transaction)

    accounting_transaction.account_id = option_selector_option.id

    accounting_transaction.save

    assert accounting_transaction.reload.account.value == option_selector_option.value
  end
end
