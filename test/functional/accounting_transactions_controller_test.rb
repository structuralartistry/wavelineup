require 'test_helper'

class AccountingTransactionsControllerTest < ActionController::TestCase

  should 'return the first page of records if no page submitted' do
    50.times do
      Factory(:accounting_transaction)
    end
    get :index, :format => :json

debugger
a = 1
  end

  should 'return the requested page of records and expected number of records if pagination info submitted' do

  end

# Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})

  # test "the truth" do
  #   assert true
  # end
end
